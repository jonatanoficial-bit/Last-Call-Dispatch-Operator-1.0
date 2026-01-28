/* =========================================================
   Last Call Dispatch Operator - Fase 2C (PATCH v2)
   - FIX: typewriter não reinicia a cada tick
   - IMPROVE: typewriter mais humano (lento + pausas)
   - IMPROVE: toque no texto pula para o final
   ========================================================= */

(function () {
  "use strict";

  // ----------------------------
  // Helpers
  // ----------------------------
  const $ = (id) => document.getElementById(id);
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const pad2 = (n) => String(n).padStart(2, "0");
  const fmtTime = (sec) => `${pad2(Math.floor(sec / 60))}:${pad2(sec % 60)}`;
  const escapeHtml = (str) =>
    String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  function nowStamp() {
    const d = new Date();
    return `[${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}]`;
  }

  function safeRandom(arr) {
    if (!arr || !arr.length) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ----------------------------
  // Typewriter (mais humano + token + skip)
  // ----------------------------
  const TYPEWRITER = {
    baseMs: 32,        // velocidade base (menor = mais rápido)
    commaMs: 120,      // pausa extra em vírgula/;:
    punctMs: 220,      // pausa extra em .!? 
    newlineMs: 260,    // pausa extra em quebra de linha
    fastFactor: 0.45,  // quando "fast" (ex: depois de skip) fica mais rápido
  };

  function typewriter(el, fullText, opts = {}) {
    if (!el) return;

    const token = Symbol("tw");
    el.__twToken = token;

    const baseMs = clamp(opts.baseMs ?? TYPEWRITER.baseMs, 12, 80);
    const commaMs = clamp(opts.commaMs ?? TYPEWRITER.commaMs, 0, 600);
    const punctMs = clamp(opts.punctMs ?? TYPEWRITER.punctMs, 0, 800);
    const newlineMs = clamp(opts.newlineMs ?? TYPEWRITER.newlineMs, 0, 900);
    const jitterMs = clamp(opts.jitterMs ?? 0, 0, 35);

    // Guarda o texto alvo para permitir "skip"
    el.__twFullText = fullText;

    el.textContent = "";
    let i = 0;

    function delayForChar(ch) {
      // Add a small random jitter to mimic real typing / stress.
      const jitter = jitterMs ? (Math.random() * jitterMs * 2 - jitterMs) : 0;
      const j = Math.max(0, Math.round(jitter));
      if (ch === "\n") return baseMs + newlineMs + j;
      if (ch === "," || ch === ";" || ch === ":") return baseMs + commaMs + j;
      if (ch === "." || ch === "!" || ch === "?") return baseMs + punctMs + j;
      return baseMs + j;
    }

    function tick() {
      if (el.__twToken !== token) return;
      if (i >= fullText.length) return;

      const ch = fullText[i++];
      el.textContent += ch;

      const baseDelay = delayForChar(ch);
      // Jitter makes the text feel more "human" and adds subtle tension when
      // the operator is under stress.
      const j = jitterMs ? Math.floor((Math.random() * jitterMs * 2) - jitterMs) : 0;
      const d = Math.max(0, baseDelay + j);
      setTimeout(tick, d);
    }

    tick();
  }

  // Incremental typewriter: appends only the new part of fullText.
  // Used to avoid re-typing the opener every time the player clicks a question.
  function typewriterAppend(el, fullText, opts = {}) {
    if (!el) return;

    // If current content is not a prefix of fullText, fall back to full render.
    const current = el.textContent || "";
    if (!fullText.startsWith(current)) {
      typewriter(el, fullText, opts);
      return;
    }

    const token = Symbol("tw_append");
    el.__twToken = token;

    const baseMs = clamp(opts.baseMs ?? TYPEWRITER.baseMs, 12, 80);
    const commaMs = clamp(opts.commaMs ?? TYPEWRITER.commaMs, 0, 600);
    const punctMs = clamp(opts.punctMs ?? TYPEWRITER.punctMs, 0, 800);
    const newlineMs = clamp(opts.newlineMs ?? TYPEWRITER.newlineMs, 0, 900);
    const jitterMs = clamp(opts.jitterMs ?? 0, 0, 35);

    el.__twFullText = fullText;

    let i = current.length;

    function delayForChar(ch) {
      const jitter = jitterMs ? (Math.random() * jitterMs * 2 - jitterMs) : 0;
      const j = Math.max(0, Math.round(jitter));
      if (ch === "\n") return baseMs + newlineMs + j;
      if (ch === "," || ch === ";" || ch === ":") return baseMs + commaMs + j;
      if (ch === "." || ch === "!" || ch === "?") return baseMs + punctMs + j;
      return baseMs + j;
    }

    function tick() {
      if (el.__twToken !== token) return;
      if (i >= fullText.length) return;
      const ch = fullText[i++];
      el.textContent += ch;
      const baseDelay = delayForChar(ch);
      const j = jitterMs ? Math.floor((Math.random() * jitterMs * 2) - jitterMs) : 0;
      setTimeout(tick, Math.max(0, baseDelay + j));
    }

    tick();
  }

  function skipTypewriter(el) {
    if (!el) return;
    if (!el.__twToken) return;
    // Mata animação atual e escreve tudo
    el.__twToken = null;
    el.textContent = el.__twFullText || el.textContent;
  }

  // ----------------------------
  // DOM
  // ----------------------------
  const el = {
    hudShift: $("hudShift"),
    hudTime: $("hudTime"),
    hudScore: $("hudScore"),
    hudQueue: $("hudQueue"),
    hudStress: $("hudStress"),

    citySelect: $("citySelect"),
    agencySelect: $("agencySelect"),
    difficultySelect: $("difficultySelect"),

    // Screens / navigation
    screenSetup: $("screenSetup"),
    screenLobby: $("screenLobby"),
    screenShift: $("screenShift"),
    btnToLobby: $("btnToLobby"),
    btnBackSetup: $("btnBackSetup"),
    btnToShift: $("btnToShift"),
    btnBackLobby: $("btnBackLobby"),
    lobbySummary: $("lobbySummary"),
    shiftSummaryTop: $("shiftSummaryTop"),

    btnStartShift: $("btnStartShift"),
    btnEndShift: $("btnEndShift"),

    unitsList: $("unitsList"),
    log: $("log"),

    pillStatus: $("pillStatus"),
    pillCallTimer: $("pillCallTimer"),

    callMeta: $("callMeta"),
    callText: $("callText"),

    btnAnswer: $("btnAnswer"),
    btnHold: $("btnHold"),

    dispatchInfo: $("dispatchInfo"),
    dispatchUnitSelect: $("dispatchUnitSelect"),
    btnDispatch: $("btnDispatch"),
    btnDismiss: $("btnDismiss"),

    queueList: $("queueList"),
    shiftSummary: $("shiftSummary"),
  };

  // ----------------------------
  // UI Dinâmico
  // ----------------------------
  function ensureDynamicQuestionsUI() {
    let panel = document.getElementById("dynamicQuestionsPanel");
    if (panel) return panel;

    const operationCard = el.callText ? el.callText.closest(".card") : null;
    if (!operationCard) return null;

    panel = document.createElement("div");
    panel.id = "dynamicQuestionsPanel";
    panel.className = "subCard";
    panel.innerHTML = `
      <div class="subTitle">Perguntas (Protocolo Realista)</div>
      <div class="meta" id="dqMeta">Nenhuma chamada ativa</div>
      <div id="dqButtons" class="btnRow" style="margin-top:8px;"></div>
      <div class="hint" id="dqHint" style="margin-top:10px;">
        Faça as perguntas obrigatórias para liberar o despacho.
      </div>
    `;

    const subCards = operationCard.querySelectorAll(".subCard");
    if (subCards && subCards.length) {
      subCards[0].insertAdjacentElement("afterend", panel);
    } else {
      operationCard.appendChild(panel);
    }
    return panel;
  }

  function ensureReportUI() {
    let panel = document.getElementById("reportPanel");
    if (panel) return panel;

    const operationCard = el.callText ? el.callText.closest(".card") : null;
    if (!operationCard) return null;

    panel = document.createElement("div");
    panel.id = "reportPanel";
    panel.className = "subCard";
    panel.style.marginTop = "12px";
    panel.innerHTML = `
      <div class="subTitle">Relatório da Ocorrência</div>
      <div class="meta" id="rpMeta">Nenhum relatório ainda</div>
      <div id="rpBody" style="margin-top:8px; font-size:13px; color:rgba(233,240,255,0.85); line-height:1.4;">
        Atenda uma chamada e finalize para gerar relatório.
      </div>
      <div id="rpCareer" style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;"></div>
    `;

    const dqPanel = document.getElementById("dynamicQuestionsPanel");
    if (dqPanel) dqPanel.insertAdjacentElement("afterend", panel);
    else operationCard.appendChild(panel);

    return panel;
  }

  const dq = { panel: null, meta: null, buttons: null, hint: null };
  const rp = { panel: null, meta: null, body: null, career: null };

  // Stage 4: Lobby career/objectives UI
  const lobby = { careerPills: null, unlocksHint: null, objectives: null, btnReset: null };

  function bindDynamicUI() {
    dq.panel = ensureDynamicQuestionsUI();
    if (dq.panel) {
      dq.meta = document.getElementById("dqMeta");
      dq.buttons = document.getElementById("dqButtons");
      dq.hint = document.getElementById("dqHint");
    }

    rp.panel = ensureReportUI();
    if (rp.panel) {
      rp.meta = document.getElementById("rpMeta");
      rp.body = document.getElementById("rpBody");
      rp.career = document.getElementById("rpCareer");
    }

    // Lobby panels (static in index.html)
    lobby.careerPills = document.getElementById("lobbyCareerPills");
    lobby.unlocksHint = document.getElementById("lobbyUnlocksHint");
    lobby.objectives = document.getElementById("lobbyObjectives");
    lobby.btnReset = document.getElementById("btnResetCareer");
  }

  // ----------------------------
  // Stage 4: Persistência / Progressão (LocalStorage)
  // ----------------------------
  const STORAGE_KEY = "lcdo_profile_v1";

  const UNLOCKS_BY_RANK = {
    // These IDs must match data/cities.js
    Recruta: ["br_sp"],
    Operador: ["br_df"],
    "Sênior": ["eu_ldn"],
    Supervisor: ["us_nyc"],
  };

  function allUnlocksUpToRank(rank) {
    const order = ["Recruta", "Operador", "Sênior", "Supervisor"];
    const idx = Math.max(0, order.indexOf(rank));
    const unlocked = new Set();
    for (let i = 0; i <= idx; i += 1) {
      const r = order[i];
      (UNLOCKS_BY_RANK[r] || []).forEach((id) => unlocked.add(id));
    }
    return Array.from(unlocked);
  }

  function defaultProfile() {
    return {
      career: {
        xp: 0,
        rank: "Recruta",
        warnings: 0,
        totalSuccess: 0,
        totalFail: 0,
        totalLivesSaved: 0,
      },
      progress: {
        unlockedCities: allUnlocksUpToRank("Recruta"),
      },
      settings: {
        agency: "police",
        difficulty: "normal",
        cityId: "br_sp",
      },
    };
  }

  function loadProfile() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultProfile();
      const p = JSON.parse(raw);
      // Shallow validation / forward compatibility
      if (!p || typeof p !== "object") return defaultProfile();
      if (!p.career) p.career = defaultProfile().career;
      if (!p.progress) p.progress = defaultProfile().progress;
      if (!Array.isArray(p.progress.unlockedCities)) p.progress.unlockedCities = defaultProfile().progress.unlockedCities;
      if (!p.settings) p.settings = defaultProfile().settings;
      return p;
    } catch {
      return defaultProfile();
    }
  }

  function saveProfile() {
    try {
      const profile = {
        career: state.career,
        progress: state.progress,
        settings: {
          agency: state.agency,
          difficulty: state.difficulty,
          cityId: state.cityId,
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }

  // ----------------------------
  // Stage 4: Objetivos do turno (metas) + bônus de XP
  // ----------------------------
  function generateShiftObjectives() {
    // Keep objectives stable until next time user visits the lobby
    const diff = state.difficulty || "normal";
    const rank = state.career.rank || "Recruta";

    const baseHandled = diff === "easy" ? 5 : diff === "hard" ? 8 : 6;
    const baseCorrect = diff === "easy" ? 4 : diff === "hard" ? 7 : 5;
    const baseRate = diff === "easy" ? 0.60 : diff === "hard" ? 0.80 : 0.70;
    const bonusScale = rank === "Supervisor" ? 1.3 : rank === "Sênior" ? 1.15 : rank === "Operador" ? 1.05 : 1.0;

    const pool = [
      {
        id: "handled",
        label: `Atender ${baseHandled} chamadas no turno`,
        check: () => (state.stats.handled || 0) >= baseHandled,
        bonusXp: Math.round(10 * bonusScale),
      },
      {
        id: "correct",
        label: `Realizar ${baseCorrect} despachos corretos`,
        check: () => (state.stats.correct || 0) >= baseCorrect,
        bonusXp: Math.round(12 * bonusScale),
      },
      {
        id: "rate",
        label: `Manter taxa de acerto ≥ ${Math.round(baseRate * 100)}%`,
        check: () => {
          const d = Math.max(1, state.stats.dispatched || 0);
          return (state.stats.correct || 0) / d >= baseRate;
        },
        bonusXp: Math.round(14 * bonusScale),
      },
      {
        id: "no_warnings",
        label: "Finalizar sem advertências", 
        check: () => (state.career.warnings || 0) === 0,
        bonusXp: Math.round(16 * bonusScale),
      },
      {
        id: "score",
        label: `Fechar turno com ≥ ${diff === "easy" ? 35 : diff === "hard" ? 60 : 45} pontos`,
        check: () => (state.score || 0) >= (diff === "easy" ? 35 : diff === "hard" ? 60 : 45),
        bonusXp: Math.round(12 * bonusScale),
      },
    ];

    // pick 3 objectives with variety
    const picked = [];
    const used = new Set();
    while (picked.length < 3 && used.size < pool.length) {
      const i = Math.floor(Math.random() * pool.length);
      if (used.has(i)) continue;
      used.add(i);
      picked.push({ ...pool[i] });
    }

    state.objectives.list = picked;
    state.objectives.completed = [];
    state.objectives.bonusAwarded = false;
  }

  function renderLobbyCareer() {
    if (!lobby.careerPills) return;
    lobby.careerPills.innerHTML = `
      <div class="pill">Rank: ${escapeHtml(state.career.rank)}</div>
      <div class="pill">XP: ${state.career.xp}</div>
      <div class="pill">Sucessos: ${state.career.totalSuccess}</div>
      <div class="pill">Falhas: ${state.career.totalFail}</div>
      <div class="pill">Vidas salvas: ${state.career.totalLivesSaved}</div>
    `;

    if (lobby.unlocksHint) {
      const unlocked = Array.isArray(state.progress.unlockedCities) ? state.progress.unlockedCities.length : 0;
      const nextRank = state.career.rank === "Recruta" ? "Operador" : state.career.rank === "Operador" ? "Sênior" : state.career.rank === "Sênior" ? "Supervisor" : null;
      const nextCities = nextRank ? (UNLOCKS_BY_RANK[nextRank] || []) : [];
      const hint = nextRank
        ? `Cidades desbloqueadas: <b>${unlocked}</b>. Próximo desbloqueio em <b>${nextRank}</b>: ${nextCities.map(cityNameById).join(", ") || "—"}`
        : `Cidades desbloqueadas: <b>${unlocked}</b>. Você já está no rank máximo.`;
      lobby.unlocksHint.innerHTML = hint;
    }
  }

  function renderLobbyObjectives() {
    if (!lobby.objectives) return;
    const list = Array.isArray(state.objectives.list) ? state.objectives.list : [];
    if (!list.length) {
      lobby.objectives.textContent = "—";
      return;
    }
    const html = list
      .map((o) => {
        const done = state.objectives.completed.includes(o.id);
        const mark = done ? "✅" : "⬜";
        return `${mark} ${escapeHtml(o.label)} <span style="opacity:.8;">(+${o.bonusXp} XP)</span>`;
      })
      .join("<br>");
    lobby.objectives.innerHTML = html;
  }

  function evaluateObjectivesAndAward() {
    if (state.objectives.bonusAwarded) return;
    const list = Array.isArray(state.objectives.list) ? state.objectives.list : [];
    if (!list.length) return;

    const completed = [];
    let bonus = 0;
    list.forEach((o) => {
      try {
        if (o.check && o.check()) {
          completed.push(o.id);
          bonus += o.bonusXp || 0;
        }
      } catch {
        // ignore
      }
    });

    state.objectives.completed = completed;
    state.objectives.bonusAwarded = true;

    if (completed.length) {
      addXp(bonus);
      log(`🎯 Objetivos concluídos: ${completed.length}/${list.length} • Bônus XP +${bonus}`);
    } else {
      log("🎯 Objetivos não concluídos neste turno.");
    }
  }

  // ----------------------------
  // Dados fallback
  // ----------------------------
  const FALLBACK_CITIES = [
    { id: "sp_sim", name: "São Paulo (Simulação)", country: "BR" },
    { id: "ny_sim", name: "New York (Simulação)", country: "US" },
    { id: "ldn_sim", name: "London (Simulação)", country: "EU" },
  ];

  function getCities() {
    const C = window.CITIES;
    if (Array.isArray(C) && C.length) return C;
    return FALLBACK_CITIES;
  }

  function getCalls() {
    const C = window.CALLS;
    if (Array.isArray(C) && C.length) return C;
    return [];
  }

  // ----------------------------
  // Estado
  // ----------------------------
  const state = {
    shiftActive: false,
    pauseQueueWhileActiveCall: true,
    difficulty: "normal",
    agency: "police",
    cityId: null,

    score: 0,
    timeSec: 0,

    // Stage 3: operador sob pressão (0..100)
    stress: 0,

    // Stage 3: condições do turno (atmosfera e pressão). Definido no início do turno.
    conditions: {
      timeOfDay: "day", // day | night
      weather: "clear", // clear | rain | storm
    },

    queue: [],
    activeCall: null,
    units: [],

    lastReport: null,

    // cache do texto para não reiniciar typewriter no tick
    ui: {
      lastCallUid: null,
      lastTranscript: "",
      view: "setup", // setup | lobby | shift
    },

    career: {
      xp: 0,
      rank: "Recruta",
      warnings: 0,
      totalSuccess: 0,
      totalFail: 0,
      totalLivesSaved: 0,
    },

    // Stage 4: desbloqueios (carreira)
    progress: {
      unlockedCities: ["br_sp"],
    },

    // Stage 4: objetivos do turno (gerados no lobby)
    objectives: {
      list: [],
      completed: [],
      bonusAwarded: false,
    },

    stats: {
      handled: 0,
      dispatched: 0,
      correct: 0,
      wrong: 0,
      expired: 0,
      dismissedTrote: 0,
      overtime: 0,
      livesSaved: 0,
    },

    tickInterval: null,
    spawnAccumulator: 0,
    maxQueue: 5,
  };

  let uidCounter = 0;

  function log(msg) {
    if (!el.log) return;
    el.log.textContent = `${nowStamp()} ${msg}\n` + el.log.textContent;
  }

  function setScreen(view) {
    state.ui.view = view;
    const screens = [el.screenSetup, el.screenLobby, el.screenShift].filter(Boolean);
    screens.forEach((s) => s.classList.remove("active"));
    if (view === "setup" && el.screenSetup) el.screenSetup.classList.add("active");
    if (view === "lobby" && el.screenLobby) el.screenLobby.classList.add("active");
    if (view === "shift" && el.screenShift) el.screenShift.classList.add("active");
    // Keep it feeling like a proper app screen
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function refreshLobbySummary() {
    if (!el.lobbySummary) return;
    const city = cityNameById(state.cityId);
    const agency = state.agency === "fire" ? "Bombeiros" : "Polícia";
    const diff = state.difficulty === "easy" ? "Fácil" : state.difficulty === "hard" ? "Difícil" : "Normal";
    el.lobbySummary.innerHTML = `<b>${agency}</b> • ${city} • Dificuldade: ${diff}`;
    if (el.shiftSummaryTop) el.shiftSummaryTop.innerHTML = el.lobbySummary.innerHTML;
  }

  // ----------------------------
  // Stage 3: Stress / Pressão do operador
  // ----------------------------
  function setStress(value) {
    const v = clamp(Math.round(value), 0, 100);
    state.stress = v;

    // Band used by CSS for subtle cinematic tension cues
    const band = v >= 70 ? "high" : v >= 35 ? "mid" : "low";
    if (document && document.body) {
      document.body.dataset.stress = band;
    }

    if (el.hudStress) {
      el.hudStress.textContent = `${v}%`;
      el.hudStress.style.setProperty("--meter", `${v}%`);
    }
  }

  function addStress(delta) {
    if (!delta) return;
    setStress(state.stress + delta);
  }

  function severityToPressure(sev) {
    const s = String(sev || "leve").toLowerCase();
    if (s === "critico") return 1.25;
    if (s === "grave") return 1.0;
    if (s === "medio") return 0.75;
    if (s === "trote") return 0.25;
    return 0.5;
  }

  function typingProfileForCall(def, sev) {
    // Heuristic: use callerState if provided by content; otherwise derive from severity
    const raw = String(def && def.callerState ? def.callerState : "").toLowerCase();
    const s = String(sev || def.baseSeverity || "leve").toLowerCase();
    const callerState = raw || (s === "critico" ? "panic" : s === "grave" ? "panic" : s === "medio" ? "tense" : s === "trote" ? "annoyed" : "normal");

    // Base typing speed by caller state (lower = faster)
    let base = 32;
    if (callerState === "panic") base = 30;
    if (callerState === "crying") base = 36;
    if (callerState === "whispering") base = 40;
    if (callerState === "annoyed") base = 26;
    if (callerState === "calm") base = 34;

    return { callerState, baseMs: base };
  }

  // ----------------------------
  // Severidade / Score / Rank
  // ----------------------------
  function humanSeverity(sev) {
    const s = String(sev || "leve").toLowerCase();
    if (s === "critico") return "CRÍTICO";
    if (s === "grave") return "GRAVE";
    if (s === "medio") return "MÉDIO";
    if (s === "trote") return "TROTE";
    return "LEVE";
  }

  function severityScore(sev) {
    const s = String(sev || "leve").toLowerCase();
    if (s === "critico") return 28;
    if (s === "grave") return 20;
    if (s === "medio") return 14;
    if (s === "trote") return 0;
    return 10;
  }

  function severityBadge(sev) {
    const s = String(sev || "leve").toLowerCase();
    if (s === "critico") return `<span class="pill" style="border-color:rgba(255,70,110,0.45); box-shadow:0 0 0 1px rgba(255,70,110,0.18)">CRÍTICO</span>`;
    if (s === "grave") return `<span class="pill" style="border-color:rgba(255,70,110,0.35); box-shadow:0 0 0 1px rgba(255,70,110,0.12)">GRAVE</span>`;
    if (s === "medio") return `<span class="pill" style="border-color:rgba(255,190,70,0.35); box-shadow:0 0 0 1px rgba(255,190,70,0.12)">MÉDIO</span>`;
    if (s === "trote") return `<span class="pill" style="border-color:rgba(160,160,160,0.25); box-shadow:0 0 0 1px rgba(160,160,160,0.10)">TROTE</span>`;
    return `<span class="pill" style="border-color:rgba(60,220,160,0.25); box-shadow:0 0 0 1px rgba(60,220,160,0.10)">LEVE</span>`;
  }

  function rankByXp(xp) {
    if (xp >= 220) return "Supervisor";
    if (xp >= 120) return "Sênior";
    if (xp >= 50) return "Operador";
    return "Recruta";
  }

  function addXp(amount) {
    state.career.xp = clamp(state.career.xp + amount, 0, 999999);
    const newRank = rankByXp(state.career.xp);
    if (newRank !== state.career.rank) {
      state.career.rank = newRank;
      log(`🏅 Promoção: agora você é ${newRank}!`);

      // Stage 4: unlock new cities on promotion
      const before = new Set(state.progress.unlockedCities || []);
      const unlockedNow = allUnlocksUpToRank(state.career.rank);
      state.progress.unlockedCities = Array.from(new Set([...before, ...unlockedNow]));
      const gained = state.progress.unlockedCities.filter((id) => !before.has(id));
      if (gained.length) {
        const names = gained.map((id) => cityNameById(id)).join(", ");
        log(`🗺️ Novas cidades desbloqueadas: ${names}`);
      }
    }

    saveProfile();
  }

  function addWarning(reason) {
    state.career.warnings += 1;
    log(`⚠️ ADVERTÊNCIA (${state.career.warnings}/3): ${reason}`);
    saveProfile();
    if (state.career.warnings >= 3) {
      log("🛑 DEMISSÃO VIRTUAL: 3 advertências no turno. Turno encerrado.");
      endShift();
    }
  }

  // ----------------------------
  // Timers
  // ----------------------------
  function spawnIntervalByDifficulty(diff) {
    let base = 7;
    if (diff === "easy") base = 10;
    if (diff === "hard") base = 5;

    // Stage 3: conditions influence call volume (night/storm = more pressure)
    const nightBoost = state.conditions.timeOfDay === "night" ? 0.90 : 1.0;
    const weatherBoost = state.conditions.weather === "storm" ? 0.85 : state.conditions.weather === "rain" ? 0.92 : 1.0;
    base = Math.round(base * nightBoost * weatherBoost);
    return clamp(base, 3, 15);
  }

  function queueTTLBySeverity(sev, diff) {
    const s = String(sev || "leve").toLowerCase();
    let base = 30;
    if (s === "leve") base = 35;
    if (s === "medio") base = 30;
    if (s === "grave") base = 25;
    if (s === "trote") base = 20;
    if (diff === "easy") base += 10;
    if (diff === "hard") base -= 5;
    return clamp(base, 10, 90);
  }

  function callTTLBySeverity(sev, diff) {
    const s = String(sev || "leve").toLowerCase();
    let base = 60;
    if (s === "leve") base = 55;
    if (s === "medio") base = 60;
    if (s === "grave") base = 75;
    if (s === "trote") base = 40;
    if (diff === "easy") base += 15;
    if (diff === "hard") base -= 10;
    return clamp(base, 25, 180);
  }

  // ----------------------------
  // Abertura por região
  // ----------------------------
  function lineByRegion(region, agency) {
    const r = (region || "BR").toUpperCase();
    if (r === "BR") return agency === "fire" ? "193" : "190";
    if (r === "US") return "911";
    if (r === "EU") return "112";
    if (r === "OC") return "000";
    if (r === "AS") return agency === "fire" ? "119" : "110";
    if (r === "AF") return agency === "fire" ? "10177/112" : "10111/112";
    return "Emergência";
  }

  function defaultOpener(region, agency) {
    const r = (region || "BR").toUpperCase();
    if (r === "BR") return agency === "fire" ? "193, Bombeiros. Qual sua emergência?" : "190, Polícia Militar. Qual sua emergência?";
    if (r === "US") return "911, what's your emergency?";
    if (r === "EU") return "112, emergência. Qual a sua localização e situação?";
    if (r === "OC") return "000, do you need Police, Fire or Ambulance?";
    if (r === "AS") return agency === "fire" ? "119, Fire/Rescue. What's the emergency?" : "110, Police. What's your emergency?";
    return "Central de emergência. Qual a sua ocorrência?";
  }

  // ----------------------------
  // Unidades
  // ----------------------------
  function getUnitsFor(cityId, agency) {
    if (agency === "police") {
      if (String(cityId).includes("sp")) {
        return [
          { id: "u_area_1", name: "PM Área (VTR)", role: "area_patrol", status: "available" },
          { id: "u_rota_1", name: "ROTA", role: "tactical_rota", status: "available" },
          { id: "u_choque_1", name: "Choque", role: "shock_riot", status: "available" },
          { id: "u_gate_1", name: "GATE (Antibomba)", role: "bomb_gate", status: "available" },
          { id: "u_aaguia_1", name: "Águia (Helicóptero)", role: "air_eagle", status: "available" },
          { id: "u_pc_1", name: "Polícia Civil (Investigação)", role: "civil_investigation", status: "available" },
        ];
      }
      if (String(cityId).includes("ny")) {
        return [
          { id: "u_patrol_1", name: "Area Patrol", role: "area_patrol", status: "available" },
          { id: "u_swat_1", name: "SWAT", role: "tactical_rota", status: "available" },
          { id: "u_federal_1", name: "Federal Unit", role: "civil_investigation", status: "available" },
          { id: "u_bomb_1", name: "Bomb Squad", role: "bomb_gate", status: "available" },
          { id: "u_air_1", name: "Air Support", role: "air_eagle", status: "available" },
        ];
      }
      return [
        { id: "u_patrol_1", name: "Polícia de Área", role: "area_patrol", status: "available" },
        { id: "u_tac_1", name: "Unidade Tática", role: "tactical_rota", status: "available" },
        { id: "u_invest_1", name: "Investigação", role: "civil_investigation", status: "available" },
      ];
    } else {
      if (String(cityId).includes("sp")) {
        return [
          { id: "f_engine_1", name: "Auto Bomba (AB)", role: "fire_engine", status: "available" },
          { id: "f_rescue_1", name: "Resgate (UR)", role: "fire_rescue", status: "available" },
          { id: "f_medic_1", name: "Ambulância (USA)", role: "medic_ambulance", status: "available" },
          { id: "f_haz_1", name: "HazMat", role: "hazmat", status: "available" },
          { id: "f_ladder_1", name: "Auto Escada", role: "ladder_truck", status: "available" },
        ];
      }
      return [
        { id: "f_engine_1", name: "Fire Engine", role: "fire_engine", status: "available" },
        { id: "f_rescue_1", name: "Rescue", role: "fire_rescue", status: "available" },
        { id: "f_medic_1", name: "Ambulance", role: "medic_ambulance", status: "available" },
      ];
    }
  }

  function renderUnits() {
    state.units = getUnitsFor(state.cityId, state.agency);

    if (el.unitsList) {
      el.unitsList.innerHTML = state.units
        .map(
          (u) => `
        <div class="subCard" style="padding:10px; margin-top:0;">
          <div style="font-weight:900;">${escapeHtml(u.name)}</div>
          <div style="font-size:12px; color:rgba(233,240,255,0.65)">role: ${escapeHtml(u.role)}</div>
          <div style="font-size:12px; color:rgba(233,240,255,0.65)">Status: ${u.status === "available" ? "Disponível" : escapeHtml(u.status)}</div>
        </div>`
        )
        .join("");
    }

    if (el.dispatchUnitSelect) {
      // Preserve current selection. Stage 3 updates the UI frequently (stress, HUD),
      // so we must not wipe the user's selection before they click "Despachar".
      const prev = el.dispatchUnitSelect.value;

      el.dispatchUnitSelect.innerHTML =
        `<option value="">Selecione a unidade</option>` +
        state.units
          .filter((u) => u.status === "available")
          .map((u) => `<option value="${escapeHtml(u.id)}">${escapeHtml(u.name)} (${escapeHtml(u.role)})</option>`)
          .join("");

      // Restore selection if still available
      if (prev && [...el.dispatchUnitSelect.options].some((o) => o.value === prev)) {
        el.dispatchUnitSelect.value = prev;
      }
    }
  }

  // ----------------------------
  // Cidades
  // ----------------------------
  function cityNameById(id) {
    const cities = getCities();
    const c = cities.find((x) => x.id === id);
    return c ? c.name : String(id || "—");
  }

  function flagByCityId(id) {
    const cities = getCities();
    const c = cities.find((x) => x.id === id);
    if (!c) return "🏙️";
    const cc = (c.country || "").toUpperCase();
    if (cc === "BR") return "🇧🇷";
    if (cc === "US") return "🇺🇸";
    if (cc === "EU") return "🇪🇺";
    if (cc === "JP") return "🇯🇵";
    if (cc === "IN") return "🇮🇳";
    if (cc === "AU") return "🇦🇺";
    if (cc === "ZA") return "🇿🇦";
    return "🏙️";
  }

  function populateCities() {
    const unlocked = new Set(Array.isArray(state.progress?.unlockedCities) ? state.progress.unlockedCities : []);
    const citiesAll = getCities();
    // If current selection is not unlocked (e.g., after data update), keep it available
    if (state.cityId) unlocked.add(state.cityId);
    let cities = citiesAll.filter((c) => unlocked.has(c.id));
    // Safety: if unlock IDs don't match current dataset, don't soft-lock the player
    if (!cities.length) cities = citiesAll;
    if (!el.citySelect) return;
    el.citySelect.innerHTML = cities
      .map((c) => `<option value="${escapeHtml(c.id)}">${flagByCityId(c.id)} ${escapeHtml(c.name)}</option>`)
      .join("");
    state.cityId = state.cityId || cities[0]?.id || "br_sp";
    el.citySelect.value = state.cityId;
  }

  // ----------------------------
  // Protocolo / Instância de chamada
  // ----------------------------
  function getProtocolDef(callDef) {
    return callDef && callDef.protocol ? callDef.protocol : { required: [], questions: [] };
  }

  function makeCallInstance(def) {
    uidCounter += 1;
    const baseSev = (def.baseSeverity || "leve").toLowerCase();
    return {
      uid: `call_${uidCounter}_${Date.now()}`,
      def,
      severity: baseSev,
      confidenceTrote: baseSev === "trote" ? 2 : 0,

      queueTTL: queueTTLBySeverity(baseSev, state.difficulty),
      // Call TTL (time-to-fail) can be provided by the call definition (timers.fail)
      callTTL: (def && def.timers && typeof def.timers.fail === "number")
        ? Math.max(10, Math.floor(def.timers.fail))
        : callTTLBySeverity(baseSev, state.difficulty),

      // Worsen timer triggers a severity escalation (timers.worsen)
      worsenTTL: (def && def.timers && typeof def.timers.worsen === "number")
        ? Math.max(5, Math.floor(def.timers.worsen))
        : null,
      worsened: false,

      overdue: false,
      overduePenalized: false,

      asked: {},
      dispatchUnlocked: false,
      startedAt: state.timeSec,
    };
  }

  function updateDispatchUnlock() {
    if (!state.activeCall) return;
    const protocol = getProtocolDef(state.activeCall.def);
    const required = Array.isArray(protocol.required) ? protocol.required : [];
    const ok = required.every((qid) => !!state.activeCall.asked[qid]);
    state.activeCall.dispatchUnlocked = ok;
  }

  function applyQuestionEffect(effect) {
    if (!state.activeCall || !effect) return;

    if (typeof effect.confidenceTrote === "number") {
      state.activeCall.confidenceTrote += effect.confidenceTrote;
      state.activeCall.confidenceTrote = clamp(state.activeCall.confidenceTrote, 0, 10);
    }

    if (effect.severity) {
      const rank = { trote: 0, leve: 1, medio: 2, grave: 3, critico: 4 };
      const cur = state.activeCall.severity || "leve";
      const next = String(effect.severity).toLowerCase();
      if (rank[next] >= rank[cur]) state.activeCall.severity = next;
    }

    // Virtual time penalty (represents delay/confusion) applied directly to the
    // remaining call TTL. This increases pressure without requiring a map/ETA.
    if (typeof effect.timePenaltySec === "number") {
      const p = Math.max(0, Math.floor(effect.timePenaltySec));
      if (p > 0) {
        state.activeCall.callTTL = Math.max(0, state.activeCall.callTTL - p);
        // Stage 3: mistakes raise operator stress
        addStress(Math.min(12, p * 0.6));
      }
    }

    // Force an escalation on critical mistakes
    if (effect.forceWorsen) {
      addStress(10);
      worsenActiveCall("Erro crítico no protocolo");
    }
  }

  // ----------------------------
  // Agravamento / Falha por tempo
  // ----------------------------
  function escalateSeverity(cur) {
    const s = String(cur || "leve").toLowerCase();
    if (s === "trote") return "trote";
    if (s === "leve") return "medio";
    if (s === "medio") return "grave";
    if (s === "grave") return "critico";
    return "critico";
  }

  function worsenActiveCall(reason) {
    const c = state.activeCall;
    if (!c || c.worsened || c.severity === "trote") return;
    c.worsened = true;
    c.severity = escalateSeverity(c.severity);
    // Stage 3: escalation spikes operator stress
    addStress(12);
    // Increase pressure a bit more when it worsens
    c.callTTL = Math.max(0, c.callTTL - 6);
    log(`⚠️ OCORRÊNCIA AGRAVOU (${reason || "tempo"}). Gravidade agora: ${humanSeverity(c.severity)}.`);
    renderActiveCall(true);
  }

  function failActiveCall(reason) {
    const c = state.activeCall;
    if (!c) return;

    // Stage 3: failures are mentally crushing
    addStress(18);

    const def = c.def;
    state.stats.wrong += 1;
    state.career.totalFail += 1;

    const scoreDelta = -Math.max(12, severityScore(c.severity));
    const xpDelta = -3;
    state.score += scoreDelta;
    addXp(xpDelta);

    // Stage 3: outcome affects operator stress
    if (outcome.outcome === "success") addStress(-12);
    if (outcome.outcome === "partial") addStress(-6);
    if (outcome.outcome === "fail") addStress(10);
    if (outcome.outcome === "trote") addStress(8);

    addWarning("Falha por tempo/pressão na chamada.");
    log(`☠️ FALHA NA CHAMADA: "${def.title}" (${reason || "tempo esgotado"}) (${scoreDelta})`);

    setReport({
      title: def.title,
      severity: c.severity,
      outcomeLabel: "FALHA (TEMPO)",
      description: def && def.outcomes && def.outcomes.fail
        ? def.outcomes.fail
        : "Tempo esgotado. A ocorrência não recebeu resposta adequada a tempo.",
      unitName: "—",
      unitRole: "—",
      scoreDelta,
      xpDelta,
      handleTime: Math.max(0, (state.timeSec - c.startedAt)),
    });

    state.activeCall = null;
    renderAll();
  }

  // ----------------------------
  // Perguntas dinâmicas (UI)
  // ----------------------------
  function askQuestion(questionId) {
    if (!state.shiftActive || !state.activeCall) return;
    const protocol = getProtocolDef(state.activeCall.def);
    const q = (protocol.questions || []).find((x) => x.id === questionId);
    if (!q) return;

    if (state.activeCall.asked[questionId]) {
      log(`ℹ️ Pergunta já feita: ${q.label}`);
      return;
    }

    // Se o jogador clicar enquanto ainda está digitando, pula para o final antes
    skipTypewriter(el.callText);

    state.activeCall.asked[questionId] = true;
    state.score += 1;
    applyQuestionEffect(q.effect);

    log(`🧾 Perguntou: ${q.label} (+1)`);
    updateDispatchUnlock();

    renderDynamicQuestions();
    renderActiveCall(true); // texto mudou -> atualiza (com typewriter humano)
    renderAll();
  }

  function renderDynamicQuestions() {
    if (!dq.panel || !dq.meta || !dq.buttons || !dq.hint) return;

    if (!state.activeCall) {
      dq.meta.textContent = "Nenhuma chamada ativa";
      dq.buttons.innerHTML = "";
      dq.hint.textContent = "Faça as perguntas obrigatórias para liberar o despacho.";
      return;
    }

    const protocol = getProtocolDef(state.activeCall.def);
    const required = Array.isArray(protocol.required) ? protocol.required : [];
    const questions = Array.isArray(protocol.questions) ? protocol.questions : [];

    const checklist = required.map((qid) => (state.activeCall.asked[qid] ? `✅ ${qid}` : `⬜ ${qid}`)).join(" | ");
    dq.meta.textContent = `Obrigatórias: ${checklist || "nenhuma"} • Gravidade atual: ${humanSeverity(state.activeCall.severity)}`;

    dq.buttons.innerHTML = questions
      .map((q) => {
        const asked = !!state.activeCall.asked[q.id];
        const cls = asked ? "btnGhost" : "btnPrimary";
        const disabled = asked ? "disabled" : "";
        return `<button class="${cls}" data-qid="${escapeHtml(q.id)}" ${disabled}>${escapeHtml(q.label)}</button>`;
      })
      .join("");

    dq.hint.textContent = state.activeCall.def.hint || "Colete dados, libere despacho e envie a unidade correta.";

    const btns = dq.buttons.querySelectorAll("button[data-qid]");
    btns.forEach((b) => {
      b.addEventListener("click", () => {
        const qid = b.getAttribute("data-qid");
        askQuestion(qid);
      });
    });
  }

  // ----------------------------
  // Relatório pós-chamada
  // ----------------------------
  function setReport(report) {
    state.lastReport = report;

    if (!rp.panel || !rp.meta || !rp.body || !rp.career) return;

    rp.meta.textContent = report
      ? `${report.title} • ${report.outcomeLabel} • Gravidade: ${humanSeverity(report.severity)}`
      : "Nenhum relatório ainda";

    rp.body.innerHTML = report
      ? `
        <div><b>Tempo total em atendimento:</b> ${fmtTime(report.handleTime)}</div>
        <div><b>Unidade enviada:</b> ${escapeHtml(report.unitName || "—")} (${escapeHtml(report.unitRole || "—")})</div>
        <div><b>Resultado:</b> ${escapeHtml(report.description)}</div>
        <div style="margin-top:8px;"><b>Pontos:</b> ${report.scoreDelta >= 0 ? "+" : ""}${report.scoreDelta}</div>
        <div><b>XP:</b> ${report.xpDelta >= 0 ? "+" : ""}${report.xpDelta}</div>
      `
      : "Atenda uma chamada e finalize para gerar relatório.";

    rp.career.innerHTML = `
      <div class="pill">Rank: ${escapeHtml(state.career.rank)}</div>
      <div class="pill">XP: ${state.career.xp}</div>
      <div class="pill">Advertências: ${state.career.warnings}/3</div>
      <div class="pill">Sucessos: ${state.career.totalSuccess}</div>
      <div class="pill">Falhas: ${state.career.totalFail}</div>
      <div class="pill">Vidas salvas: ${state.career.totalLivesSaved}</div>
    `;
  }

  // ----------------------------
  // HUD / Queue / Summary
  // ----------------------------
  function updateHud() {
    if (el.hudShift) el.hudShift.textContent = state.shiftActive ? "ATIVO" : "—";
    if (el.hudTime) el.hudTime.textContent = fmtTime(state.timeSec);
    if (el.hudScore) el.hudScore.textContent = String(state.score);
    if (el.hudQueue) el.hudQueue.textContent = String(state.queue.length);
    if (el.hudStress) {
      el.hudStress.textContent = `${state.stress}%`;
      el.hudStress.style.setProperty("--meter", `${state.stress}%`);
    }
  }

  function updatePills() {
    if (el.pillStatus) el.pillStatus.textContent = state.shiftActive ? "Turno em andamento" : "Turno parado";
    if (!el.pillCallTimer) return;

    if (!state.activeCall) {
      el.pillCallTimer.textContent = "Sem chamada";
      el.pillCallTimer.style.borderColor = "";
      return;
    }
    const overdue = state.activeCall.overdue;
    const callT = Math.max(0, state.activeCall.callTTL || 0);
    const worsT = state.activeCall.worsenTTL;

    if (overdue) {
      el.pillCallTimer.textContent = `Tempo excedido`;
      el.pillCallTimer.style.borderColor = "rgba(255,70,110,0.45)";
      return;
    }

    // Show both timers when available
    if (typeof worsT === "number" && !state.activeCall.worsened) {
      el.pillCallTimer.textContent = `FALHA em ${fmtTime(callT)} • AGRAVA em ${fmtTime(Math.max(0, worsT))}`;
    } else {
      el.pillCallTimer.textContent = `FALHA em ${fmtTime(callT)}`;
    }

    // Colour cue based on urgency
    if (callT <= 15) {
      el.pillCallTimer.style.borderColor = "rgba(255,70,110,0.45)";
    } else if (typeof worsT === "number" && worsT <= 12 && !state.activeCall.worsened) {
      el.pillCallTimer.style.borderColor = "rgba(255,190,70,0.45)";
    } else {
      el.pillCallTimer.style.borderColor = "rgba(255,255,255,0.12)";
    }
  }

  function setButtons() {
    const hasShift = state.shiftActive;
    const hasQueue = state.queue.length > 0;
    const hasActive = !!state.activeCall;

    if (el.btnAnswer) el.btnAnswer.disabled = !(hasShift && !hasActive && hasQueue);
    if (el.btnHold) el.btnHold.disabled = !(hasShift && hasActive);

    const canDispatch = hasShift && hasActive && state.activeCall.dispatchUnlocked;
    if (el.dispatchUnitSelect) el.dispatchUnitSelect.disabled = !canDispatch;
    if (el.btnDispatch) el.btnDispatch.disabled = !canDispatch;
    if (el.btnDismiss) el.btnDismiss.disabled = !(hasShift && hasActive);
  }

  function renderQueue() {
    if (!el.queueList) return;
    if (!state.queue.length) {
      el.queueList.innerHTML = "—";
      return;
    }

    el.queueList.innerHTML = state.queue
      .map((c, idx) => {
        const ttl = fmtTime(c.queueTTL);
        return `
        <div class="subCard" style="padding:10px; margin-top:0; display:flex; align-items:center; justify-content:space-between; gap:10px;">
          <div style="min-width:0;">
            <div style="font-weight:900; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              ${idx + 1}. ${escapeHtml(c.def.title)}
            </div>
            <div style="font-size:12px; color:rgba(233,240,255,0.65)">
              Restante: ${ttl} • Gravidade: ${escapeHtml(humanSeverity(c.severity))}
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            ${severityBadge(c.severity)}
          </div>
        </div>`;
      })
      .join("");
  }

  function renderSummary() {
    if (!el.shiftSummary) return;

    if (!state.shiftActive) {
      el.shiftSummary.textContent = "Nenhum turno ativo.";
      return;
    }

    const s = state.stats;
    const obj = Array.isArray(state.objectives.list) ? state.objectives.list : [];
    const objHtml = obj.length
      ? `<div style="margin-top:10px; font-size:12px; color:rgba(233,240,255,0.75); line-height:1.35">
          <b>Objetivos do turno</b><br>
          ${obj.map((o) => {
            let done = false;
            try { done = !!(o.check && o.check()); } catch { done = false; }
            return `${done ? "✅" : "⬜"} ${escapeHtml(o.label)}`;
          }).join("<br>")}
        </div>`
      : "";
    el.shiftSummary.innerHTML = `
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <div class="pill">Atendidas: ${s.handled}</div>
        <div class="pill">Despachadas: ${s.dispatched}</div>
        <div class="pill">Acertos: ${s.correct}</div>
        <div class="pill">Erros: ${s.wrong}</div>
        <div class="pill">Expiradas (fila): ${s.expired}</div>
        <div class="pill">Trote encerrado: ${s.dismissedTrote}</div>
        <div class="pill">Atrasos: ${s.overtime}</div>
      </div>
      <div style="margin-top:10px; font-size:12px; color:rgba(233,240,255,0.70)">
        Carreira: ${escapeHtml(state.career.rank)} • XP ${state.career.xp} • Advertências ${state.career.warnings}/3
      </div>
      ${objHtml}
    `;
  }

  // ----------------------------
  // Render chamada ativa (com cache + typewriter humano)
  // ----------------------------
  function renderActiveCall(force = false) {
    if (!el.callText || !el.callMeta) return;

    if (!state.activeCall) {
      el.callMeta.textContent = "—";
      el.callText.textContent = state.shiftActive ? "Aguardando chamadas..." : "Inicie um turno para receber chamadas.";
      if (el.dispatchInfo) el.dispatchInfo.textContent = "—";

      state.ui.lastCallUid = null;
      state.ui.lastTranscript = "";

      renderDynamicQuestions();
      return;
    }

    const c = state.activeCall;
    const def = c.def;

    const line = lineByRegion(def.region, state.agency);
    const tp = typingProfileForCall(def, c.severity);
    el.callMeta.textContent = `Linha: ${line} • Caso: ${def.title} • Gravidade: ${humanSeverity(c.severity)} • Estado: ${tp.callerState}`;

    const opener = defaultOpener(def.region, state.agency);
    const protocol = getProtocolDef(def);

    let convo = `${opener}\n\nChamador: ${def.title}\n\n`;

    const askedIds = Object.keys(c.asked).filter((k) => c.asked[k]);
    if (askedIds.length) {
      askedIds.forEach((qid) => {
        const q = (protocol.questions || []).find((x) => x.id === qid);
        if (!q) return;
        convo += `Operador: ${q.prompt}\n`;
        convo += `Chamador: ${q.answer || "(sem resposta)"}\n\n`;
      });
    } else {
      convo += `*(Você ainda não fez perguntas. Use o painel de protocolo.)*\n\n`;
    }

    if (def.hint) convo += `[Dica] ${def.hint}\n`;

    const sameCall = state.ui.lastCallUid === c.uid;
    const sameText = state.ui.lastTranscript === convo;

    // Stage 3: typing feel adapts to caller state and operator stress
    const stressJitter = Math.min(28, Math.round(state.stress / 3));
    const twOpts = {
      baseMs: tp.baseMs,
      commaMs: TYPEWRITER.commaMs,
      punctMs: TYPEWRITER.punctMs,
      newlineMs: TYPEWRITER.newlineMs,
      jitterMs: stressJitter,
    };

    if (!force && sameCall && sameText) {
      // não reinicia typewriter
    } else if (!force && sameCall && state.ui.lastTranscript && convo.startsWith(state.ui.lastTranscript)) {
      // ✅ Não reescreve o "190/193..." toda hora.
      // Em vez disso, finaliza o que estiver animando e digita apenas o trecho novo.
      skipTypewriter(el.callText);
      state.ui.lastTranscript = convo;
      typewriterAppend(el.callText, convo, twOpts);
    } else {
      state.ui.lastCallUid = c.uid;
      state.ui.lastTranscript = convo;
      typewriter(el.callText, convo, twOpts);
    }

    if (el.dispatchInfo) {
      el.dispatchInfo.textContent = c.dispatchUnlocked
        ? `Despacho liberado. Selecione a unidade e despache.`
        : `Despacho bloqueado. Faça as perguntas obrigatórias primeiro.`;
    }
  }

  // ----------------------------
  // Seleção de caso
  // ----------------------------
  function pickCallDef() {
    const calls = getCalls();
    const poolByAgency = calls.filter((c) => (c.agency || "police") === state.agency);
    const pool = poolByAgency.length ? poolByAgency : calls;

    const troteChance = state.difficulty === "easy" ? 0.10 : state.difficulty === "hard" ? 0.18 : 0.15;
    let candidates = pool;

    if (Math.random() < troteChance) {
      const trotes = pool.filter((c) => String(c.baseSeverity).toLowerCase() === "trote");
      if (trotes.length) candidates = trotes;
    }

    return safeRandom(candidates);
  }

  function spawnCall() {
    if (!state.shiftActive) return;
    if (state.queue.length >= state.maxQueue) return;

    const def = pickCallDef();
    if (!def) return;

    const inst = makeCallInstance(def);
    state.queue.push(inst);

    log(`🚨 Nova chamada: "${def.title}" (${humanSeverity(inst.severity)})`);
  }

  // ----------------------------
  // Resultado real (modelo)
  // ----------------------------
  function computeOutcome({ isTrote, correctRole, overdue, severity }) {
    const s = String(severity || "leve").toLowerCase();

    if (isTrote) {
      return {
        outcome: "trote",
        outcomeLabel: "TROTE",
        description: "Chamado falso/indevido. Recursos não devem ser mobilizados.",
        livesSaved: 0,
        penalty: true,
      };
    }

    if (!correctRole) {
      let desc = "Despacho incorreto. Resposta inadequada gerou falha operacional.";
      let lives = 0;
      if (s === "grave") desc = "Despacho incorreto em ocorrência GRAVE. Possível vítima/risco não atendido a tempo.";
      if (s === "medio") desc = "Despacho incorreto. Ocorrência não controlada corretamente.";
      return {
        outcome: "fail",
        outcomeLabel: "FALHA",
        description: desc,
        livesSaved: lives,
        penalty: true,
      };
    }

    if (overdue) {
      if (s === "grave") {
        return {
          outcome: "partial",
          outcomeLabel: "ATRASO CRÍTICO",
          description: "Unidade correta foi enviada, mas o atraso agravou o cenário. Alto risco de consequências.",
          livesSaved: 0,
          penalty: true,
        };
      }
      return {
        outcome: "partial",
        outcomeLabel: "ATRASO",
        description: "Unidade correta foi enviada, porém com atraso. O caso foi controlado com dificuldade.",
        livesSaved: 0,
        penalty: true,
      };
    }

    let livesSaved = 0;
    if (s === "grave") livesSaved = 1;
    return {
      outcome: "success",
      outcomeLabel: "SUCESSO",
      description: "Ocorrência atendida com sucesso. Procedimentos seguidos e resposta adequada.",
      livesSaved,
      penalty: false,
    };
  }

  // ----------------------------
  // Ações do jogador
  // ----------------------------
  function startShift() {
    if (state.shiftActive) return;

    state.cityId = el.citySelect ? (el.citySelect.value || getCities()[0]?.id || "br_sp") : "br_sp";
    state.agency = el.agencySelect ? (el.agencySelect.value || "police") : "police";
    state.difficulty = el.difficultySelect ? (el.difficultySelect.value || "normal") : "normal";

    state.shiftActive = true;
    state.timeSec = 0;
    state.score = 0;
    state.queue = [];
    state.activeCall = null;
    state.spawnAccumulator = 0;

    state.ui.lastCallUid = null;
    state.ui.lastTranscript = "";

    state.stats = { handled: 0, dispatched: 0, correct: 0, wrong: 0, expired: 0, dismissedTrote: 0, overtime: 0, livesSaved: 0 };

    // Stage 3: reset stress and roll turn conditions
    setStress(0);
    state.conditions.timeOfDay = Math.random() < 0.45 ? "night" : "day";
    // Weather affects atmosphere and slightly increases pressure
    const wR = Math.random();
    state.conditions.weather = wR < 0.65 ? "clear" : wR < 0.90 ? "rain" : "storm";

    if (el.btnStartShift) el.btnStartShift.disabled = true;
    if (el.btnEndShift) el.btnEndShift.disabled = false;

    renderUnits();

    log(`✅ Turno iniciado em ${flagByCityId(state.cityId)} ${cityNameById(state.cityId)} • Agência: ${state.agency} • Dificuldade: ${state.difficulty}`);
    log(`🌒 Condições: ${state.conditions.timeOfDay === "night" ? "Noite" : "Dia"} • ${state.conditions.weather === "storm" ? "Tempestade" : state.conditions.weather === "rain" ? "Chuva" : "Céu limpo"}`);
    log(`🎓 Carreira: ${state.career.rank} (XP ${state.career.xp}) • Advertências ${state.career.warnings}/3`);
    log(`🧠 Patch: typewriter humano + toque para pular.`);

    spawnCall();
    spawnCall();

    if (state.tickInterval) clearInterval(state.tickInterval);
    state.tickInterval = setInterval(tick, 1000);

    renderAll();
  }

  function endShift() {
    if (!state.shiftActive) return;

    state.shiftActive = false;

    if (state.tickInterval) {
      clearInterval(state.tickInterval);
      state.tickInterval = null;
    }

    if (el.btnStartShift) el.btnStartShift.disabled = false;
    if (el.btnEndShift) el.btnEndShift.disabled = true;

    log("🛑 Turno encerrado.");

    // Stage 4: evaluate objectives and award bonus XP at end of shift
    evaluateObjectivesAndAward();
    renderLobbyCareer();
    renderLobbyObjectives();
    saveProfile();

    renderAll();
  }

  function answerNext() {
    if (!state.shiftActive) return;
    if (state.activeCall) return;
    if (!state.queue.length) return;

    state.activeCall = state.queue.shift();
    state.stats.handled += 1;

    state.ui.lastCallUid = null;
    state.ui.lastTranscript = "";

    updateDispatchUnlock();
    log(`📞 Atendeu: "${state.activeCall.def.title}" (${humanSeverity(state.activeCall.severity)})`);

    renderUnits();
    renderDynamicQuestions();
    renderActiveCall(true);
    renderAll();
  }

  function holdCall() {
    if (!state.shiftActive || !state.activeCall) return;

    // se estiver digitando, pula
    skipTypewriter(el.callText);

    const call = state.activeCall;
    state.activeCall = null;

    call.queueTTL = clamp(call.queueTTL, 10, 25);
    state.queue.unshift(call);

    state.ui.lastCallUid = null;
    state.ui.lastTranscript = "";

    log(`⏸️ Chamada em espera e devolvida à fila.`);
    renderAll();
  }

  function dismissCall() {
    if (!state.shiftActive || !state.activeCall) return;

    // se estiver digitando, pula
    skipTypewriter(el.callText);

    const c = state.activeCall;
    const isTrote = (c.severity === "trote") || (c.confidenceTrote >= 6);

    let scoreDelta = 0;
    let xpDelta = 0;

    if (isTrote) {
      scoreDelta = 8;
      xpDelta = 4;
      state.score += scoreDelta;
      state.stats.dismissedTrote += 1;
      addXp(xpDelta);
      log(`✅ Encerrado como trote corretamente. (+${scoreDelta}) XP +${xpDelta}`);
      setReport({
        title: c.def.title,
        severity: c.severity,
        outcomeLabel: "TROTE IDENTIFICADO",
        description: "Você identificou corretamente uma chamada falsa/indevida e evitou gasto de recursos.",
        unitName: "—",
        unitRole: "—",
        scoreDelta,
        xpDelta,
        handleTime: state.timeSec - c.startedAt,
      });
    } else {
      scoreDelta = -10;
      xpDelta = -2;
      state.score += scoreDelta;
      state.stats.wrong += 1;
      addXp(xpDelta);
      addWarning("Encerramento indevido de chamada real.");
      log(`❌ Encerramento indevido. (${scoreDelta}) XP ${xpDelta}`);
      setReport({
        title: c.def.title,
        severity: c.severity,
        outcomeLabel: "ENCERRAMENTO INDEVIDO",
        description: "Você encerrou uma chamada real. Isso é considerado falha grave.",
        unitName: "—",
        unitRole: "—",
        scoreDelta,
        xpDelta,
        handleTime: state.timeSec - c.startedAt,
      });
    }

    state.activeCall = null;
    state.ui.lastCallUid = null;
    state.ui.lastTranscript = "";

    renderAll();
  }

  function dispatchSelectedUnit() {
    if (!state.shiftActive || !state.activeCall) return;

    // se estiver digitando, pula
    skipTypewriter(el.callText);

    const c = state.activeCall;

    if (!c.dispatchUnlocked) {
      log("⛔ Despacho bloqueado: faça as perguntas obrigatórias.");
      return;
    }

    const unitId = el.dispatchUnitSelect ? el.dispatchUnitSelect.value : "";
    if (!unitId) {
      log("⚠️ Selecione uma unidade primeiro.");
      return;
    }

    const unit = state.units.find((u) => u.id === unitId);
    if (!unit || unit.status !== "available") {
      log("⚠️ Unidade inválida/indisponível.");
      return;
    }

    const def = c.def;
    const severityNow = c.severity;

    const correctRoles = (def.dispatch && Array.isArray(def.dispatch.correctRoles)) ? def.dispatch.correctRoles : ["any"];
    const isTrote = (severityNow === "trote") || (c.confidenceTrote >= 6);

    unit.status = "busy";
    setTimeout(() => {
      unit.status = "available";
      renderUnits();
      renderAll();
    }, 5000);

    state.stats.dispatched += 1;

    if (c.overdue && !c.overduePenalized) {
      c.overduePenalized = true;
      state.stats.overtime += 1;
    }

    const correctRole = !isTrote && (correctRoles.includes(unit.role) || correctRoles.includes("any"));

    const outcome = computeOutcome({
      isTrote,
      correctRole,
      overdue: c.overdue,
      severity: severityNow,
    });

    let scoreDelta = 0;
    let xpDelta = 0;

    if (outcome.outcome === "trote") {
      scoreDelta = -12;
      xpDelta = -2;
      state.stats.wrong += 1;
      addWarning("Despacho indevido em trote.");
    } else if (outcome.outcome === "fail") {
      scoreDelta = -12;
      xpDelta = -3;
      state.stats.wrong += 1;
      addWarning("Despacho incorreto (falha operacional).");
      state.career.totalFail += 1;
    } else if (outcome.outcome === "partial") {
      scoreDelta = Math.max(4, severityScore(severityNow) - 10);
      scoreDelta -= 5;
      xpDelta = 3;
      state.stats.correct += 1;
      state.career.totalSuccess += 1;
    } else {
      scoreDelta = severityScore(severityNow);
      xpDelta = severityNow === "grave" ? 8 : 5;
      state.stats.correct += 1;
      state.career.totalSuccess += 1;
    }

    if (outcome.livesSaved > 0) {
      state.career.totalLivesSaved += outcome.livesSaved;
      state.stats.livesSaved += outcome.livesSaved;
      scoreDelta += 6;
      xpDelta += 4;
    }

    if (!isTrote && c.overdue && String(severityNow).toLowerCase() === "grave") {
      addWarning("Atraso crítico em ocorrência GRAVE.");
    }

    state.score += scoreDelta;
    addXp(xpDelta);

    if (outcome.outcome === "success") log(`✅ SUCESSO: despacho correto (+${scoreDelta}) XP +${xpDelta}`);
    if (outcome.outcome === "partial") log(`⚠️ ${outcome.outcomeLabel}: (+${scoreDelta}) XP +${xpDelta}`);
    if (outcome.outcome === "fail") log(`❌ FALHA: (${scoreDelta}) XP ${xpDelta}`);
    if (outcome.outcome === "trote") log(`❌ TROTE: despacho indevido (${scoreDelta}) XP ${xpDelta}`);

    setReport({
      title: def.title,
      severity: severityNow,
      outcomeLabel: outcome.outcomeLabel,
      description: outcome.description + (outcome.livesSaved ? ` (Vidas salvas: ${outcome.livesSaved})` : ""),
      unitName: unit.name,
      unitRole: unit.role,
      scoreDelta,
      xpDelta,
      handleTime: state.timeSec - c.startedAt,
    });

    state.activeCall = null;
    state.ui.lastCallUid = null;
    state.ui.lastTranscript = "";

    renderAll();
  }

  // ----------------------------
  // Tick
  // ----------------------------
  function tick() {
    if (!state.shiftActive) return;

    state.timeSec += 1;

    const hasActive = !!state.activeCall;
    const pauseQueue = state.pauseQueueWhileActiveCall && hasActive;

    if (!pauseQueue) {
      for (let i = state.queue.length - 1; i >= 0; i--) {
        const c = state.queue[i];
        c.queueTTL -= 1;
        if (c.queueTTL <= 0) {
          state.queue.splice(i, 1);
          state.stats.expired += 1;
          state.score -= 10;
          addXp(-1);
          addWarning("Falha em atender chamada na fila (expirada).");
          log(`⏳ Expirou na fila: "${c.def.title}" (-10)`);
          setReport({
            title: c.def.title,
            severity: c.severity,
            outcomeLabel: "EXPIRADA NA FILA",
            description: "A ocorrência ficou sem atendimento e expirou. Isso é falha grave.",
            unitName: "—",
            unitRole: "—",
            scoreDelta: -10,
            xpDelta: -1,
            handleTime: 0,
          });
        }
      }
    }

    if (hasActive) {
      // Stage 3: stress builds while handling an active call (pressure is higher on grave/critico)
      const pressure = severityToPressure(state.activeCall.severity);
      const weatherBoost = state.conditions.weather === "storm" ? 0.10 : state.conditions.weather === "rain" ? 0.05 : 0.0;
      addStress((0.14 * pressure) + weatherBoost);

      // Worsen timer: escalates severity once
      if (state.activeCall.worsenTTL !== null && !state.activeCall.worsened) {
        state.activeCall.worsenTTL -= 1;
        if (state.activeCall.worsenTTL <= 0) {
          state.activeCall.worsenTTL = 0;
          worsenActiveCall("tempo");
        }
      }

      // Fail timer
      state.activeCall.callTTL -= 1;
      if (state.activeCall.callTTL <= 0) {
        state.activeCall.callTTL = 0;
        state.activeCall.overdue = true;
        // Auto-fail when time runs out (realistic pressure)
        failActiveCall("tempo esgotado");
        return; // renderAll already called inside failActiveCall
      }
      updateDispatchUnlock();
    }

    const interval = spawnIntervalByDifficulty(state.difficulty);
    state.spawnAccumulator += 1;
    if (state.spawnAccumulator >= interval) {
      state.spawnAccumulator = 0;
      if (state.queue.length < state.maxQueue) spawnCall();
    }

    renderAll();
  }

  // ----------------------------
  // Render geral
  // ----------------------------
  function renderAll() {
    updateHud();
    updatePills();
    setButtons();
    renderQueue();
    renderUnits();
    renderActiveCall(false);
    renderDynamicQuestions();
    renderSummary();

    if (rp.career && !state.lastReport) {
      rp.career.innerHTML = `
        <div class="pill">Rank: ${escapeHtml(state.career.rank)}</div>
        <div class="pill">XP: ${state.career.xp}</div>
        <div class="pill">Advertências: ${state.career.warnings}/3</div>
        <div class="pill">Sucessos: ${state.career.totalSuccess}</div>
        <div class="pill">Falhas: ${state.career.totalFail}</div>
        <div class="pill">Vidas salvas: ${state.career.totalLivesSaved}</div>
      `;
    }
  }

  // ----------------------------
  // Bind UI
  // ----------------------------
  function bind() {
    // Screen navigation
    if (el.btnToLobby) {
      el.btnToLobby.addEventListener("click", () => {
        // Persist current selections before moving on
        if (el.citySelect) state.cityId = el.citySelect.value;
        if (el.agencySelect) state.agency = el.agencySelect.value || "police";
        if (el.difficultySelect) state.difficulty = el.difficultySelect.value || "normal";

        if (document && document.body) {
          document.body.dataset.agency = state.agency || "police";
        }

        // Stage 4: generate objectives for the next shift and persist settings
        generateShiftObjectives();
        saveProfile();

        renderUnits();
        refreshLobbySummary();
        setScreen("lobby");
        renderLobbyCareer();
        renderLobbyObjectives();
        renderAll();
      });
    }

    // Stage 4: reset career
    if (lobby.btnReset) {
      lobby.btnReset.addEventListener("click", () => {
        if (state.shiftActive) {
          log("⚠️ Encerre o turno antes de resetar a carreira.");
          return;
        }
        try { localStorage.removeItem(STORAGE_KEY); } catch {}
        const p = defaultProfile();
        state.career = p.career;
        state.progress = p.progress;
        state.agency = p.settings.agency;
        state.difficulty = p.settings.difficulty;
        state.cityId = p.settings.cityId;
        if (el.agencySelect) el.agencySelect.value = state.agency;
        if (el.difficultySelect) el.difficultySelect.value = state.difficulty;
        populateCities();
        if (document && document.body) document.body.dataset.agency = state.agency || "police";
        generateShiftObjectives();
        saveProfile();
        refreshLobbySummary();
        renderLobbyCareer();
        renderLobbyObjectives();
        renderUnits();
        renderAll();
        log("🧹 Carreira resetada.");
      });
    }

    if (el.btnBackSetup) {
      el.btnBackSetup.addEventListener("click", () => {
        if (state.shiftActive) {
          log("⚠️ Encerre o turno antes de voltar para a configuração.");
          return;
        }
        setScreen("setup");
      });
    }

    if (el.btnToShift) {
      el.btnToShift.addEventListener("click", () => {
        refreshLobbySummary();
        setScreen("shift");
        // Keep objectives visible in lobby, but also reflect them in the shift summary area
        renderAll();
      });
    }

    if (el.btnBackLobby) {
      el.btnBackLobby.addEventListener("click", () => {
        if (state.shiftActive) {
          log("⚠️ Turno em andamento. Encerre o turno para retornar ao lobby.");
          return;
        }
        refreshLobbySummary();
        setScreen("lobby");
      });
    }

    if (el.citySelect) {
      el.citySelect.addEventListener("change", () => {
        state.cityId = el.citySelect.value;
        log(`🏙️ Cidade: ${flagByCityId(state.cityId)} ${cityNameById(state.cityId)}`);
        saveProfile();
        renderUnits();
        refreshLobbySummary();
        renderAll();
      });
    }

    if (el.agencySelect) {
      el.agencySelect.addEventListener("change", () => {
        // Update current agency in state and propagate to UI theme via data attribute
        state.agency = el.agencySelect.value;
        // Set a data-agency attribute on <body> for CSS theming; defaults to police if missing
        if (document && document.body) {
          document.body.dataset.agency = state.agency || "police";
        }
        log(`🏛️ Agência: ${state.agency}`);
        saveProfile();
        renderUnits();
        refreshLobbySummary();
        renderAll();
      });
    }

    if (el.difficultySelect) {
      el.difficultySelect.addEventListener("change", () => {
        state.difficulty = el.difficultySelect.value;
        log(`⚙️ Dificuldade: ${state.difficulty}`);
        saveProfile();
      });
    }

    if (el.btnStartShift) el.btnStartShift.addEventListener("click", startShift);
    if (el.btnEndShift) el.btnEndShift.addEventListener("click", endShift);

    if (el.btnAnswer) el.btnAnswer.addEventListener("click", answerNext);
    if (el.btnHold) el.btnHold.addEventListener("click", holdCall);

    if (el.btnDispatch) el.btnDispatch.addEventListener("click", dispatchSelectedUnit);
    if (el.btnDismiss) el.btnDismiss.addEventListener("click", dismissCall);

    // ✅ NOVO: tocar no texto da chamada "pula" o typewriter e mostra tudo
    if (el.callText) {
      el.callText.style.cursor = "pointer";
      el.callText.addEventListener("click", () => skipTypewriter(el.callText));
      el.callText.addEventListener("touchstart", () => skipTypewriter(el.callText), { passive: true });
    }
  }

  // ----------------------------
  // Init
  // ----------------------------
  function init() {
    bindDynamicUI();

    // Stage 4: load saved profile (career + unlocks + last settings)
    const p = loadProfile();
    state.career = p.career;
    state.progress = p.progress;
    state.agency = p.settings.agency;
    state.difficulty = p.settings.difficulty;
    state.cityId = p.settings.cityId;

    populateCities();
    if (el.agencySelect) el.agencySelect.value = state.agency || "police";
    if (el.difficultySelect) el.difficultySelect.value = state.difficulty || "normal";
    if (el.citySelect) el.citySelect.value = state.cityId;

    if (el.btnEndShift) el.btnEndShift.disabled = true;

    // Ensure body has the correct agency data attribute at startup for theming
    if (document && document.body) {
      document.body.dataset.agency = state.agency || "police";
    }

    // Stage 3: init stress visuals
    setStress(state.stress);

    // Start in Setup screen (mobile-first flow)
    refreshLobbySummary();
    setScreen("setup");

    // Stage 4: prepare objectives for the next shift and show career panel in lobby
    generateShiftObjectives();
    renderLobbyCareer();
    renderLobbyObjectives();
    saveProfile();

    renderUnits();
    renderAll();

    log("✅ Sistema pronto. Configure e avance para o lobby.");
    log("✅ Typewriter: mais humano + toque para pular.");
  }

  window.__LCDO = { state };

  document.addEventListener("DOMContentLoaded", () => {
    try {
      init();
      bind();
    } catch (e) {
      console.error(e);
      log("❌ Erro ao iniciar (veja console).");
    }
  });
})();
