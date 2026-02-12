/* Auto-gerado: ETAPA 2 (Core gameplay com timers, agravamento e consequências) */
window.CALLS = [
  {
    "id": "pol_som_alto_01",
    "agency": "police",
    "region": "BR",
    "title": "Perturbação do sossego (som alto)",
    "baseSeverity": "leve",
    "timers": {
      "worsen": 55,
      "fail": 120
    },
    "outcomes": {
      "success": "Ocorrência controlada.",
      "worsen": "A situação piorou e o risco aumentou.",
      "fail": "Ocorrência evoluiu para consequências graves."
    },
    "protocol": {
      "required": [
        "location",
        "what"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Qual o endereço completo e referência?",
          "answer": "Rua ... número ... (voz irritada)",
          "effect": {
            "severity": "leve"
          }
        },
        {
          "id": "what",
          "label": "O que acontece",
          "prompt": "O que está acontecendo exatamente?",
          "answer": "Som altíssimo há horas.",
          "effect": {
            "severity": "leve"
          }
        },
        {
          "id": "weapons",
          "label": "Há armas?",
          "prompt": "Você viu arma ou ameaça?",
          "answer": "Não, só barulho.",
          "effect": {
            "severity": "leve"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "patrol"
      ]
    },
    "hint": "Coleta endereço e confirma ausência de risco. Despache patrulha de área."
  },
  {
    "id": "pol_domestic_02",
    "agency": "police",
    "region": "BR/US",
    "title": "Violência doméstica (possível agressão)",
    "baseSeverity": "grave",
    "timers": {
      "worsen": 40,
      "fail": 90
    },
    "outcomes": {
      "success": "Ocorrência controlada.",
      "worsen": "A situação piorou e o risco aumentou.",
      "fail": "Ocorrência evoluiu para consequências graves."
    },
    "protocol": {
      "required": [
        "location",
        "injuries"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Endereço e referência?",
          "answer": "Apartamento ... (sussurrando)",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "injuries",
          "label": "Feridos?",
          "prompt": "Tem alguém ferido agora?",
          "answer": "Ele me empurrou... tô com dor.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "children",
          "label": "Crianças no local",
          "prompt": "Há crianças no imóvel?",
          "answer": "Sim, duas.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "weapons",
          "label": "Armas no local",
          "prompt": "Ele tem arma/faca?",
          "answer": "Acho que tem uma faca.",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "patrol"
      ]
    },
    "hint": "Priorize proteção. Pergunte feridos e presença de armas. Despache patrulha imediatamente."
  },
  {
    "id": "pol_armed_robbery_03",
    "agency": "police",
    "region": "BR/US",
    "title": "Roubo armado em andamento",
    "baseSeverity": "critico",
    "timers": {
      "worsen": 30,
      "fail": 70
    },
    "outcomes": {
      "success": "Ocorrência controlada.",
      "worsen": "A situação piorou e o risco aumentou.",
      "fail": "Ocorrência evoluiu para consequências graves."
    },
    "protocol": {
      "required": [
        "location",
        "weapon"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Onde está acontecendo?",
          "answer": "Na porta do mercado...",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "weapon",
          "label": "Tipo de arma",
          "prompt": "Ele está com arma de fogo?",
          "answer": "Sim, revólver!",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "hostages",
          "label": "Reféns",
          "prompt": "Tem reféns?",
          "answer": "Tem gente no caixa...",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "suspects",
          "label": "Quantos suspeitos",
          "prompt": "Quantos são?",
          "answer": "Acho que dois.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "patrol",
        "tactical"
      ]
    },
    "hint": "Tempo é vida. Colete endereço + arma e despache patrulha; se houver reféns, tático."
  },
  {
    "id": "pol_pursuit_04",
    "agency": "police",
    "region": "BR/US",
    "title": "Perseguição / veículo suspeito",
    "baseSeverity": "medio",
    "timers": {
      "worsen": 50,
      "fail": 110
    },
    "outcomes": {
      "success": "Ocorrência controlada.",
      "worsen": "A situação piorou e o risco aumentou.",
      "fail": "Ocorrência evoluiu para consequências graves."
    },
    "protocol": {
      "required": [
        "location",
        "plate"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Via / direção",
          "prompt": "Em que via e sentido?",
          "answer": "Avenida ... sentido centro.",
          "effect": {
            "severity": "medio"
          }
        },
        {
          "id": "plate",
          "label": "Placa",
          "prompt": "Consegue informar a placa?",
          "answer": "ABC-1D23",
          "effect": {
            "severity": "medio"
          }
        },
        {
          "id": "danger",
          "label": "Colisão/risco",
          "prompt": "Ele está colocando alguém em risco?",
          "answer": "Quase bateu em 2 carros!",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "traffic",
        "patrol"
      ]
    },
    "hint": "Trânsito/rodoviária é mais eficiente, mas patrulha também serve."
  },
  {
    "id": "pol_missing_child_05",
    "agency": "police",
    "region": "BR/US",
    "title": "Criança desaparecida (última vez vista agora)",
    "baseSeverity": "grave",
    "timers": {
      "worsen": 60,
      "fail": 140
    },
    "outcomes": {
      "success": "Ocorrência controlada.",
      "worsen": "A situação piorou e o risco aumentou.",
      "fail": "Ocorrência evoluiu para consequências graves."
    },
    "protocol": {
      "required": [
        "location",
        "desc"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Local",
          "prompt": "Onde você está agora?",
          "answer": "Parque ...",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "desc",
          "label": "Descrição",
          "prompt": "Idade/roupa/características?",
          "answer": "7 anos, camiseta azul...",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "time",
          "label": "Há quanto tempo",
          "prompt": "Há quanto tempo sumiu?",
          "answer": "5 minutos!",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "investigation",
        "patrol"
      ]
    },
    "hint": "Tempo crítico. Coleta descrição e local e aciona patrulha + investigação."
  },
  {
    "id": "pol_trote_06",
    "agency": "police",
    "region": "BR/US",
    "title": "Trote / chamada indevida",
    "baseSeverity": "trote",
    "timers": {
      "worsen": 80,
      "fail": 160
    },
    "outcomes": {
      "success": "Ocorrência controlada.",
      "worsen": "A situação piorou e o risco aumentou.",
      "fail": "Ocorrência evoluiu para consequências graves."
    },
    "protocol": {
      "required": [
        "confirm"
      ],
      "questions": [
        {
          "id": "confirm",
          "label": "Confirmar ocorrência",
          "prompt": "Confirme a ocorrência real, por favor.",
          "answer": "(risadas) É brincadeira…",
          "effect": {
            "confidenceTrote": 4
          }
        },
        {
          "id": "callback",
          "label": "Número para retorno",
          "prompt": "Qual seu número para retorno?",
          "answer": "...",
          "effect": {
            "confidenceTrote": 2,
            "timePenaltySec": 6
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "dismiss_only"
      ]
    },
    "hint": "Trote: o correto é encerrar. Despachar aqui é desperdício."
  },
  {
    "id": "pol_burglary_01",
    "agency": "police",
    "region": "GLOBAL",
    "title": "Invasão / arrombamento suspeito",
    "baseSeverity": "medio",
    "timers": {
      "worsen": 55,
      "fail": 120
    },
    "outcomes": {
      "success": "Ocorrência atendida com sucesso.",
      "worsen": "Risco aumentou.",
      "fail": "Falha operacional com consequências."
    },
    "protocol": {
      "required": [
        "location",
        "entry"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Qual o endereço?",
          "answer": "Casa ...",
          "effect": {
            "severity": "medio"
          }
        },
        {
          "id": "entry",
          "label": "Sinais de entrada",
          "prompt": "Viu porta/janela arrombada?",
          "answer": "Sim, porta forçada.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "suspect",
          "label": "Suspeito no local",
          "prompt": "Você vê alguém?",
          "answer": "Não vejo, mas ouvi barulho.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "patrol"
      ]
    },
    "hint": "Colete endereço e sinais de invasão. Despache patrulha."
  },
  {
    "id": "pol_traffic_accident_02",
    "agency": "police",
    "region": "GLOBAL",
    "title": "Acidente de trânsito com vítimas",
    "baseSeverity": "grave",
    "timers": {
      "worsen": 40,
      "fail": 95
    },
    "outcomes": {
      "success": "Ocorrência atendida com sucesso.",
      "worsen": "Risco aumentou.",
      "fail": "Falha operacional com consequências."
    },
    "protocol": {
      "required": [
        "location",
        "victims"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Local",
          "prompt": "Onde ocorreu?",
          "answer": "Rodovia ... km ...",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "victims",
          "label": "Número de vítimas",
          "prompt": "Quantos feridos?",
          "answer": "Dois no chão.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "hazard",
          "label": "Risco de incêndio",
          "prompt": "Há vazamento/fumaça?",
          "answer": "Sim, vazando combustível!",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "traffic",
        "patrol"
      ]
    },
    "hint": "Se houver vazamento, trate como crítico e acione suporte adequado (na Etapa 3 entra EMS/Fire)."
  },
  {
    "id": "fire_apartment_fire_01",
    "agency": "fire",
    "region": "BR/US",
    "title": "Incêndio em apartamento",
    "baseSeverity": "critico",
    "timers": {
      "worsen": 35,
      "fail": 80
    },
    "outcomes": {
      "success": "Situação controlada.",
      "worsen": "A condição se agravou.",
      "fail": "Falha crítica com vítimas/risco elevado."
    },
    "protocol": {
      "required": [
        "location",
        "victims"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Qual o endereço?",
          "answer": "Prédio ... apto ...",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "victims",
          "label": "Vítimas presas",
          "prompt": "Tem alguém preso?",
          "answer": "Meu filho tá no quarto!",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "smoke",
          "label": "Fumaça densa",
          "prompt": "Tem muita fumaça?",
          "answer": "Sim, não dá pra respirar.",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "fire_engine",
        "rescue"
      ]
    },
    "hint": "Incêndio com risco de vidas. Despache viatura de combate + resgate."
  },
  {
    "id": "fire_gas_leak_02",
    "agency": "fire",
    "region": "BR/US",
    "title": "Vazamento de gás (odor forte)",
    "baseSeverity": "grave",
    "timers": {
      "worsen": 45,
      "fail": 105
    },
    "outcomes": {
      "success": "Situação controlada.",
      "worsen": "A condição se agravou.",
      "fail": "Falha crítica com vítimas/risco elevado."
    },
    "protocol": {
      "required": [
        "location",
        "source"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Local",
          "prompt": "Endereço?",
          "answer": "Cozinha da casa ...",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "source",
          "label": "Fonte",
          "prompt": "É botijão/encanamento?",
          "answer": "Botijão.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "ignition",
          "label": "Chamas/centelha",
          "prompt": "Tem fogo ou faísca?",
          "answer": "Não, mas tem gente ligando luz.",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "hazmat",
        "fire_engine"
      ]
    },
    "hint": "Oriente evacuação e não acender luz. Despache unidade adequada."
  },
  {
    "id": "fire_elevator_03",
    "agency": "fire",
    "region": "BR/US",
    "title": "Pessoa presa em elevador",
    "baseSeverity": "medio",
    "timers": {
      "worsen": 70,
      "fail": 160
    },
    "outcomes": {
      "success": "Situação controlada.",
      "worsen": "A condição se agravou.",
      "fail": "Falha crítica com vítimas/risco elevado."
    },
    "protocol": {
      "required": [
        "location",
        "count"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Prédio",
          "prompt": "Qual o prédio/endereço?",
          "answer": "Centro ...",
          "effect": {
            "severity": "medio"
          }
        },
        {
          "id": "count",
          "label": "Quantas pessoas",
          "prompt": "Quantas presas?",
          "answer": "Duas.",
          "effect": {
            "severity": "medio"
          }
        },
        {
          "id": "medical",
          "label": "Mal-estar",
          "prompt": "Alguém passando mal?",
          "answer": "Uma tá com falta de ar.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "rescue"
      ]
    },
    "hint": "Resgate técnico. Se houver mal-estar, trate como mais grave."
  },
  {
    "id": "fire_trote_04",
    "agency": "fire",
    "region": "BR/US",
    "title": "Trote (falso incêndio)",
    "baseSeverity": "trote",
    "timers": {
      "worsen": 80,
      "fail": 180
    },
    "outcomes": {
      "success": "Situação controlada.",
      "worsen": "A condição se agravou.",
      "fail": "Falha crítica com vítimas/risco elevado."
    },
    "protocol": {
      "required": [
        "confirm"
      ],
      "questions": [
        {
          "id": "confirm",
          "label": "Confirmar",
          "prompt": "Você vê fogo/fumaça agora?",
          "answer": "Não… é brincadeira…",
          "effect": {
            "confidenceTrote": 4
          }
        },
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Qual o endereço?",
          "answer": "...",
          "effect": {
            "confidenceTrote": 1,
            "timePenaltySec": 8
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "dismiss_only"
      ]
    },
    "hint": "Trote: encerre. Não desperdice recursos."
  },
  {
    "id": "fire_vehicle_fire_01",
    "agency": "fire",
    "region": "GLOBAL",
    "title": "Incêndio em veículo",
    "baseSeverity": "grave",
    "timers": {
      "worsen": 45,
      "fail": 100
    },
    "outcomes": {
      "success": "Resgate concluído.",
      "worsen": "Risco aumentou.",
      "fail": "Perda de controle / vítimas."
    },
    "protocol": {
      "required": [
        "location",
        "people"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Local",
          "prompt": "Onde está o veículo?",
          "answer": "Posto de gasolina!",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "people",
          "label": "Pessoas próximas",
          "prompt": "Tem gente perto?",
          "answer": "Sim, muita.",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "fuel",
          "label": "Combustível vazando",
          "prompt": "Há vazamento?",
          "answer": "Sim.",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "fire_engine"
      ]
    },
    "hint": "Risco de explosão. Priorize rápido."
  },
  {
    "id": "fire_flood_02",
    "agency": "fire",
    "region": "GLOBAL",
    "title": "Alagamento / resgate em enchente",
    "baseSeverity": "grave",
    "timers": {
      "worsen": 60,
      "fail": 130
    },
    "outcomes": {
      "success": "Resgate concluído.",
      "worsen": "Risco aumentou.",
      "fail": "Perda de controle / vítimas."
    },
    "protocol": {
      "required": [
        "location",
        "trapped"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Onde?",
          "answer": "Rua ...",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "trapped",
          "label": "Pessoas ilhadas",
          "prompt": "Quantas?",
          "answer": "Três no telhado.",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "water",
          "label": "Nível da água",
          "prompt": "Até onde subiu?",
          "answer": "Acima do joelho.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "rescue"
      ]
    },
    "hint": "Resgate técnico. Tempo e água subindo."
  },
  {
    "id": "pol_som_alto_01_v14",
    "agency": "police",
    "region": "BR/US",
    "title": "Perturbação do sossego (som alto) (variação)",
    "baseSeverity": "leve",
    "timers": {
      "worsen": 55,
      "fail": 120
    },
    "outcomes": {
      "success": "Ocorrência controlada.",
      "worsen": "A situação piorou e o risco aumentou.",
      "fail": "Ocorrência evoluiu para consequências graves."
    },
    "protocol": {
      "required": [
        "location",
        "what"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Qual o endereço completo e referência?",
          "answer": "Rua ... número ... (voz irritada)",
          "effect": {
            "severity": "leve"
          }
        },
        {
          "id": "what",
          "label": "O que acontece",
          "prompt": "O que está acontecendo exatamente?",
          "answer": "Som altíssimo há horas.",
          "effect": {
            "severity": "leve"
          }
        },
        {
          "id": "weapons",
          "label": "Há armas?",
          "prompt": "Você viu arma ou ameaça?",
          "answer": "Não, só barulho.",
          "effect": {
            "severity": "leve"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "patrol"
      ]
    },
    "hint": "Coleta endereço e confirma ausência de risco. Despache patrulha de área."
  },
  {
    "id": "pol_domestic_02_v15",
    "agency": "police",
    "region": "BR/US",
    "title": "Violência doméstica (possível agressão) (variação)",
    "baseSeverity": "grave",
    "timers": {
      "worsen": 40,
      "fail": 90
    },
    "outcomes": {
      "success": "Ocorrência controlada.",
      "worsen": "A situação piorou e o risco aumentou.",
      "fail": "Ocorrência evoluiu para consequências graves."
    },
    "protocol": {
      "required": [
        "location",
        "injuries"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Endereço e referência?",
          "answer": "Apartamento ... (sussurrando)",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "injuries",
          "label": "Feridos?",
          "prompt": "Tem alguém ferido agora?",
          "answer": "Ele me empurrou... tô com dor.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "children",
          "label": "Crianças no local",
          "prompt": "Há crianças no imóvel?",
          "answer": "Sim, duas.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "weapons",
          "label": "Armas no local",
          "prompt": "Ele tem arma/faca?",
          "answer": "Acho que tem uma faca.",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "patrol"
      ]
    },
    "hint": "Priorize proteção. Pergunte feridos e presença de armas. Despache patrulha imediatamente."
  },
  {
    "id": "pol_armed_robbery_03_v16",
    "agency": "police",
    "region": "BR/US",
    "title": "Roubo armado em andamento (variação)",
    "baseSeverity": "critico",
    "timers": {
      "worsen": 30,
      "fail": 70
    },
    "outcomes": {
      "success": "Ocorrência controlada.",
      "worsen": "A situação piorou e o risco aumentou.",
      "fail": "Ocorrência evoluiu para consequências graves."
    },
    "protocol": {
      "required": [
        "location",
        "weapon"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Onde está acontecendo?",
          "answer": "Na porta do mercado...",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "weapon",
          "label": "Tipo de arma",
          "prompt": "Ele está com arma de fogo?",
          "answer": "Sim, revólver!",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "hostages",
          "label": "Reféns",
          "prompt": "Tem reféns?",
          "answer": "Tem gente no caixa...",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "suspects",
          "label": "Quantos suspeitos",
          "prompt": "Quantos são?",
          "answer": "Acho que dois.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "patrol",
        "tactical"
      ]
    },
    "hint": "Tempo é vida. Colete endereço + arma e despache patrulha; se houver reféns, tático."
  },
  {
    "id": "pol_pursuit_04_v17",
    "agency": "police",
    "region": "BR/US",
    "title": "Perseguição / veículo suspeito (variação)",
    "baseSeverity": "medio",
    "timers": {
      "worsen": 50,
      "fail": 110
    },
    "outcomes": {
      "success": "Ocorrência controlada.",
      "worsen": "A situação piorou e o risco aumentou.",
      "fail": "Ocorrência evoluiu para consequências graves."
    },
    "protocol": {
      "required": [
        "location",
        "plate"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Via / direção",
          "prompt": "Em que via e sentido?",
          "answer": "Avenida ... sentido centro.",
          "effect": {
            "severity": "medio"
          }
        },
        {
          "id": "plate",
          "label": "Placa",
          "prompt": "Consegue informar a placa?",
          "answer": "ABC-1D23",
          "effect": {
            "severity": "medio"
          }
        },
        {
          "id": "danger",
          "label": "Colisão/risco",
          "prompt": "Ele está colocando alguém em risco?",
          "answer": "Quase bateu em 2 carros!",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "traffic",
        "patrol"
      ]
    },
    "hint": "Trânsito/rodoviária é mais eficiente, mas patrulha também serve."
  },
  {
    "id": "pol_missing_child_05_v18",
    "agency": "police",
    "region": "BR/US",
    "title": "Criança desaparecida (última vez vista agora) (variação)",
    "baseSeverity": "grave",
    "timers": {
      "worsen": 60,
      "fail": 140
    },
    "outcomes": {
      "success": "Ocorrência controlada.",
      "worsen": "A situação piorou e o risco aumentou.",
      "fail": "Ocorrência evoluiu para consequências graves."
    },
    "protocol": {
      "required": [
        "location",
        "desc"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Local",
          "prompt": "Onde você está agora?",
          "answer": "Parque ...",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "desc",
          "label": "Descrição",
          "prompt": "Idade/roupa/características?",
          "answer": "7 anos, camiseta azul...",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "time",
          "label": "Há quanto tempo",
          "prompt": "Há quanto tempo sumiu?",
          "answer": "5 minutos!",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "investigation",
        "patrol"
      ]
    },
    "hint": "Tempo crítico. Coleta descrição e local e aciona patrulha + investigação."
  },
  {
    "id": "pol_trote_06_v19",
    "agency": "police",
    "region": "BR/US",
    "title": "Trote / chamada indevida (variação)",
    "baseSeverity": "trote",
    "timers": {
      "worsen": 80,
      "fail": 160
    },
    "outcomes": {
      "success": "Ocorrência controlada.",
      "worsen": "A situação piorou e o risco aumentou.",
      "fail": "Ocorrência evoluiu para consequências graves."
    },
    "protocol": {
      "required": [
        "confirm"
      ],
      "questions": [
        {
          "id": "confirm",
          "label": "Confirmar ocorrência",
          "prompt": "Confirme a ocorrência real, por favor.",
          "answer": "(risadas) É brincadeira…",
          "effect": {
            "confidenceTrote": 4
          }
        },
        {
          "id": "callback",
          "label": "Número para retorno",
          "prompt": "Qual seu número para retorno?",
          "answer": "...",
          "effect": {
            "confidenceTrote": 2,
            "timePenaltySec": 6
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "dismiss_only"
      ]
    },
    "hint": "Trote: o correto é encerrar. Despachar aqui é desperdício."
  },
  {
    "id": "pol_burglary_01_v20",
    "agency": "police",
    "region": "GLOBAL",
    "title": "Invasão / arrombamento suspeito (variação)",
    "baseSeverity": "medio",
    "timers": {
      "worsen": 55,
      "fail": 120
    },
    "outcomes": {
      "success": "Ocorrência atendida com sucesso.",
      "worsen": "Risco aumentou.",
      "fail": "Falha operacional com consequências."
    },
    "protocol": {
      "required": [
        "location",
        "entry"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Qual o endereço?",
          "answer": "Casa ...",
          "effect": {
            "severity": "medio"
          }
        },
        {
          "id": "entry",
          "label": "Sinais de entrada",
          "prompt": "Viu porta/janela arrombada?",
          "answer": "Sim, porta forçada.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "suspect",
          "label": "Suspeito no local",
          "prompt": "Você vê alguém?",
          "answer": "Não vejo, mas ouvi barulho.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "patrol"
      ]
    },
    "hint": "Colete endereço e sinais de invasão. Despache patrulha."
  },
  {
    "id": "pol_traffic_accident_02_v21",
    "agency": "police",
    "region": "GLOBAL",
    "title": "Acidente de trânsito com vítimas (variação)",
    "baseSeverity": "grave",
    "timers": {
      "worsen": 40,
      "fail": 95
    },
    "outcomes": {
      "success": "Ocorrência atendida com sucesso.",
      "worsen": "Risco aumentou.",
      "fail": "Falha operacional com consequências."
    },
    "protocol": {
      "required": [
        "location",
        "victims"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Local",
          "prompt": "Onde ocorreu?",
          "answer": "Rodovia ... km ...",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "victims",
          "label": "Número de vítimas",
          "prompt": "Quantos feridos?",
          "answer": "Dois no chão.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "hazard",
          "label": "Risco de incêndio",
          "prompt": "Há vazamento/fumaça?",
          "answer": "Sim, vazando combustível!",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "traffic",
        "patrol"
      ]
    },
    "hint": "Se houver vazamento, trate como crítico e acione suporte adequado (na Etapa 3 entra EMS/Fire)."
  },
  {
    "id": "fire_apartment_fire_01_v22",
    "agency": "fire",
    "region": "BR/US",
    "title": "Incêndio em apartamento (variação)",
    "baseSeverity": "critico",
    "timers": {
      "worsen": 35,
      "fail": 80
    },
    "outcomes": {
      "success": "Situação controlada.",
      "worsen": "A condição se agravou.",
      "fail": "Falha crítica com vítimas/risco elevado."
    },
    "protocol": {
      "required": [
        "location",
        "victims"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Qual o endereço?",
          "answer": "Prédio ... apto ...",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "victims",
          "label": "Vítimas presas",
          "prompt": "Tem alguém preso?",
          "answer": "Meu filho tá no quarto!",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "smoke",
          "label": "Fumaça densa",
          "prompt": "Tem muita fumaça?",
          "answer": "Sim, não dá pra respirar.",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "fire_engine",
        "rescue"
      ]
    },
    "hint": "Incêndio com risco de vidas. Despache viatura de combate + resgate."
  },
  {
    "id": "fire_gas_leak_02_v23",
    "agency": "fire",
    "region": "BR/US",
    "title": "Vazamento de gás (odor forte) (variação)",
    "baseSeverity": "grave",
    "timers": {
      "worsen": 45,
      "fail": 105
    },
    "outcomes": {
      "success": "Situação controlada.",
      "worsen": "A condição se agravou.",
      "fail": "Falha crítica com vítimas/risco elevado."
    },
    "protocol": {
      "required": [
        "location",
        "source"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Local",
          "prompt": "Endereço?",
          "answer": "Cozinha da casa ...",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "source",
          "label": "Fonte",
          "prompt": "É botijão/encanamento?",
          "answer": "Botijão.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "ignition",
          "label": "Chamas/centelha",
          "prompt": "Tem fogo ou faísca?",
          "answer": "Não, mas tem gente ligando luz.",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "hazmat",
        "fire_engine"
      ]
    },
    "hint": "Oriente evacuação e não acender luz. Despache unidade adequada."
  },
  {
    "id": "fire_elevator_03_v24",
    "agency": "fire",
    "region": "BR/US",
    "title": "Pessoa presa em elevador (variação)",
    "baseSeverity": "medio",
    "timers": {
      "worsen": 70,
      "fail": 160
    },
    "outcomes": {
      "success": "Situação controlada.",
      "worsen": "A condição se agravou.",
      "fail": "Falha crítica com vítimas/risco elevado."
    },
    "protocol": {
      "required": [
        "location",
        "count"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Prédio",
          "prompt": "Qual o prédio/endereço?",
          "answer": "Centro ...",
          "effect": {
            "severity": "medio"
          }
        },
        {
          "id": "count",
          "label": "Quantas pessoas",
          "prompt": "Quantas presas?",
          "answer": "Duas.",
          "effect": {
            "severity": "medio"
          }
        },
        {
          "id": "medical",
          "label": "Mal-estar",
          "prompt": "Alguém passando mal?",
          "answer": "Uma tá com falta de ar.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "rescue"
      ]
    },
    "hint": "Resgate técnico. Se houver mal-estar, trate como mais grave."
  },
  {
    "id": "fire_trote_04_v25",
    "agency": "fire",
    "region": "BR/US",
    "title": "Trote (falso incêndio) (variação)",
    "baseSeverity": "trote",
    "timers": {
      "worsen": 80,
      "fail": 180
    },
    "outcomes": {
      "success": "Situação controlada.",
      "worsen": "A condição se agravou.",
      "fail": "Falha crítica com vítimas/risco elevado."
    },
    "protocol": {
      "required": [
        "confirm"
      ],
      "questions": [
        {
          "id": "confirm",
          "label": "Confirmar",
          "prompt": "Você vê fogo/fumaça agora?",
          "answer": "Não… é brincadeira…",
          "effect": {
            "confidenceTrote": 4
          }
        },
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Qual o endereço?",
          "answer": "...",
          "effect": {
            "confidenceTrote": 1,
            "timePenaltySec": 8
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "dismiss_only"
      ]
    },
    "hint": "Trote: encerre. Não desperdice recursos."
  },
  {
    "id": "fire_vehicle_fire_01_v26",
    "agency": "fire",
    "region": "GLOBAL",
    "title": "Incêndio em veículo (variação)",
    "baseSeverity": "grave",
    "timers": {
      "worsen": 45,
      "fail": 100
    },
    "outcomes": {
      "success": "Resgate concluído.",
      "worsen": "Risco aumentou.",
      "fail": "Perda de controle / vítimas."
    },
    "protocol": {
      "required": [
        "location",
        "people"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Local",
          "prompt": "Onde está o veículo?",
          "answer": "Posto de gasolina!",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "people",
          "label": "Pessoas próximas",
          "prompt": "Tem gente perto?",
          "answer": "Sim, muita.",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "fuel",
          "label": "Combustível vazando",
          "prompt": "Há vazamento?",
          "answer": "Sim.",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "fire_engine"
      ]
    },
    "hint": "Risco de explosão. Priorize rápido."
  },
  {
    "id": "fire_flood_02_v27",
    "agency": "fire",
    "region": "GLOBAL",
    "title": "Alagamento / resgate em enchente (variação)",
    "baseSeverity": "grave",
    "timers": {
      "worsen": 60,
      "fail": 130
    },
    "outcomes": {
      "success": "Resgate concluído.",
      "worsen": "Risco aumentou.",
      "fail": "Perda de controle / vítimas."
    },
    "protocol": {
      "required": [
        "location",
        "trapped"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Onde?",
          "answer": "Rua ...",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "trapped",
          "label": "Pessoas ilhadas",
          "prompt": "Quantas?",
          "answer": "Três no telhado.",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "water",
          "label": "Nível da água",
          "prompt": "Até onde subiu?",
          "answer": "Acima do joelho.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "rescue"
      ]
    },
    "hint": "Resgate técnico. Tempo e água subindo."
  },
  {
    "id": "pol_som_alto_01_v28",
    "agency": "police",
    "region": "BR/US",
    "title": "Perturbação do sossego (som alto) (variação)",
    "baseSeverity": "leve",
    "timers": {
      "worsen": 55,
      "fail": 120
    },
    "outcomes": {
      "success": "Ocorrência controlada.",
      "worsen": "A situação piorou e o risco aumentou.",
      "fail": "Ocorrência evoluiu para consequências graves."
    },
    "protocol": {
      "required": [
        "location",
        "what"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Qual o endereço completo e referência?",
          "answer": "Rua ... número ... (voz irritada)",
          "effect": {
            "severity": "leve"
          }
        },
        {
          "id": "what",
          "label": "O que acontece",
          "prompt": "O que está acontecendo exatamente?",
          "answer": "Som altíssimo há horas.",
          "effect": {
            "severity": "leve"
          }
        },
        {
          "id": "weapons",
          "label": "Há armas?",
          "prompt": "Você viu arma ou ameaça?",
          "answer": "Não, só barulho.",
          "effect": {
            "severity": "leve"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "patrol"
      ]
    },
    "hint": "Coleta endereço e confirma ausência de risco. Despache patrulha de área."
  },
  {
    "id": "pol_domestic_02_v29",
    "agency": "police",
    "region": "BR/US",
    "title": "Violência doméstica (possível agressão) (variação)",
    "baseSeverity": "grave",
    "timers": {
      "worsen": 40,
      "fail": 90
    },
    "outcomes": {
      "success": "Ocorrência controlada.",
      "worsen": "A situação piorou e o risco aumentou.",
      "fail": "Ocorrência evoluiu para consequências graves."
    },
    "protocol": {
      "required": [
        "location",
        "injuries"
      ],
      "questions": [
        {
          "id": "location",
          "label": "Endereço",
          "prompt": "Endereço e referência?",
          "answer": "Apartamento ... (sussurrando)",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "injuries",
          "label": "Feridos?",
          "prompt": "Tem alguém ferido agora?",
          "answer": "Ele me empurrou... tô com dor.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "children",
          "label": "Crianças no local",
          "prompt": "Há crianças no imóvel?",
          "answer": "Sim, duas.",
          "effect": {
            "severity": "grave"
          }
        },
        {
          "id": "weapons",
          "label": "Armas no local",
          "prompt": "Ele tem arma/faca?",
          "answer": "Acho que tem uma faca.",
          "effect": {
            "severity": "critico"
          }
        },
        {
          "id": "caller_name",
          "label": "Nome do solicitante",
          "prompt": "Qual seu nome completo?",
          "answer": "Agora não dá pra falar! Pelo amor de Deus...",
          "effect": {
            "timePenaltySec": 12,
            "forceWorsen": true
          }
        }
      ]
    },
    "dispatch": {
      "correctRoles": [
        "patrol"
      ]
    },
    "hint": "Priorize proteção. Pergunte feridos e presença de armas. Despache patrulha imediatamente."
  },

  {
    "id": "pol_roubo_armado_01",
    "agency": "police",
    "region": "BR",
    "title": "Roubo armado em comércio",
    "opening": "Tá acontecendo um roubo aqui na padaria… o cara tá armado e mandando todo mundo deitar!",
    "baseSeverity": "grave",
    "timers": { "worsen": 35, "fail": 90 },
    "outcomes": {
      "success": "Suspeito contido. Vítimas preservadas.",
      "worsen": "O suspeito fica mais agressivo e ameaça disparar.",
      "fail": "Feridos no local. Suspeito foge."
    },
    "protocol": {
      "required": ["location", "weapon"],
      "questions": [
        {"id":"location","label":"Endereço","prompt":"Qual o endereço completo e referência?","answer":"Av. Principal, 1200, Padaria Bom Pão","effect":{"severity":"grave"}},
        {"id":"weapon","label":"Arma","prompt":"Ele está com arma de fogo, faca ou outro objeto?","answer":"Arma de fogo, tipo revólver","effect":{"severity":"grave"}},
        {"id":"hostages","label":"Reféns","prompt":"Tem alguém sendo mantido como refém?","answer":"Tem clientes no chão, ele tá segurando uma moça perto do caixa","effect":{"severity":"critico"}},
        {"id":"caller_name","label":"Nome","prompt":"Qual seu nome completo?","answer":"Não posso… ele vai ouvir!","effect":{"timePenaltySec":10,"forceWorsen":true}}
      ]
    },
    "dispatch": { "correctRoles": ["area_patrol", "tactical_rota"] },
    "hint": "Em roubo armado, endereço + arma primeiro. Se houver refém, priorize unidade tática."
  },

  {
    "id": "pol_violencia_domestica_01",
    "agency": "police",
    "region": "BR",
    "title": "Violência doméstica (possível agressão)",
    "opening": "Meu marido tá me ameaçando… ele quebrou a porta e tá gritando!",
    "baseSeverity": "medio",
    "timers": { "worsen": 45, "fail": 120 },
    "outcomes": {
      "success": "A vítima foi protegida e o agressor contido.",
      "worsen": "A agressão aumenta. Objetos arremessados.",
      "fail": "Vítima ferida gravemente."
    },
    "protocol": {
      "required": ["location"],
      "questions": [
        {"id":"location","label":"Endereço","prompt":"Qual o endereço completo?","answer":"Rua das Flores, 88, casa 2","effect":{"severity":"medio"}},
        {"id":"weapons","label":"Armas","prompt":"Há armas na casa (faca/arma de fogo)?","answer":"Tem faca na cozinha…","effect":{"severity":"grave"}},
        {"id":"children","label":"Crianças","prompt":"Há crianças ou idosos no local?","answer":"Duas crianças no quarto","effect":{"severity":"grave"}},
        {"id":"caller_name","label":"Nome","prompt":"Qual seu nome completo?","answer":"Agora não… ele vai ouvir!","effect":{"timePenaltySec":8}}
      ]
    },
    "dispatch": { "correctRoles": ["area_patrol"] },
    "hint": "Se houver armas/crianças, trate como risco elevado. Despache patrulha com prioridade."
  },

  {
    "id": "pol_perseguicao_01",
    "agency": "police",
    "region": "US",
    "title": "Pursuit in progress (vehicle chase)",
    "opening": "There's a car speeding and swerving through traffic! I think they're fleeing the police!",
    "baseSeverity": "grave",
    "timers": { "worsen": 30, "fail": 85 },
    "outcomes": {
      "success": "Suspect vehicle stopped safely.",
      "worsen": "The driver runs red lights and endangers pedestrians.",
      "fail": "Crash with injuries; suspect escapes."
    },
    "protocol": {
      "required": ["location", "vehicle"],
      "questions": [
        {"id":"location","label":"Location","prompt":"What's the current location and direction?","answer":"Eastbound on 5th Ave near 41st","effect":{"severity":"grave"}},
        {"id":"vehicle","label":"Vehicle","prompt":"Describe the vehicle (color/make/plate if possible).","answer":"Black sedan, partial plate 7K…","effect":{"severity":"grave"}},
        {"id":"weapons","label":"Weapons","prompt":"Any weapons seen?","answer":"Not sure—windows are tinted","effect":{"severity":"grave"}},
        {"id":"caller_name","label":"Name","prompt":"What's your name?","answer":"Can't talk—I'm driving!","effect":{"timePenaltySec":10}}
      ]
    },
    "dispatch": { "correctRoles": ["air_eagle", "area_patrol"] },
    "hint": "Chases benefit from air support when available; otherwise patrol coordination."
  },

  {
    "id": "pol_bomba_suspeita_01",
    "agency": "police",
    "region": "BR",
    "title": "Objeto suspeito (ameaça de bomba)",
    "opening": "Tem uma mochila abandonada e alguém deixou um bilhete falando de bomba…",
    "baseSeverity": "grave",
    "timers": { "worsen": 25, "fail": 70 },
    "outcomes": {
      "success": "Área isolada e artefato neutralizado.",
      "worsen": "Pânico e aglomeração dificultam o isolamento.",
      "fail": "Explosão / feridos; isolamento falhou."
    },
    "protocol": {
      "required": ["location", "crowd"],
      "questions": [
        {"id":"location","label":"Local","prompt":"Onde está o objeto suspeito?","answer":"Terminal de ônibus, plataforma 3","effect":{"severity":"grave"}},
        {"id":"crowd","label":"Pessoas","prompt":"Tem muitas pessoas próximas?","answer":"Sim, está cheio","effect":{"severity":"critico"}},
        {"id":"smoke","label":"Sinais","prompt":"Há fios, fumaça, barulho ou cheiro estranho?","answer":"Não vi, só a mochila e o bilhete","effect":{"severity":"grave"}},
        {"id":"caller_name","label":"Nome","prompt":"Qual seu nome?","answer":"Não importa, só manda alguém!","effect":{"timePenaltySec":8,"forceWorsen":true}}
      ]
    },
    "dispatch": { "correctRoles": ["bomb_gate", "shock_riot"] },
    "hint": "Isolamento é prioridade. Em ameaça de bomba, GATE/Esquadrão antibomba."
  },

  {
    "id": "pol_terror_attack_rare_01",
    "agency": "police",
    "region": "EU",
    "title": "Caso raro: Ataque coordenado (suspeita de terrorismo)",
    "opening": "We heard bangs and people are running—someone left a package and there's shouting about an attack!",
    "baseSeverity": "critico",
    "timers": { "worsen": 20, "fail": 60 },
    "outcomes": {
      "success": "Threat contained; casualties minimized.",
      "worsen": "Multiple hazards escalate; crowd panic spreads.",
      "fail": "Mass casualties; scene uncontrolled."
    },
    "protocol": {
      "required": ["location", "shots", "package"],
      "questions": [
        {"id":"location","label":"Location","prompt":"Exact location and nearest landmark?","answer":"Central Station main hall","effect":{"severity":"critico"}},
        {"id":"shots","label":"Shots","prompt":"Did you hear shots or see a weapon?","answer":"Yes—two loud bangs, not sure if gunshots","effect":{"severity":"critico"}},
        {"id":"package","label":"Package","prompt":"Is there a suspicious package/device visible?","answer":"A backpack near the entrance","effect":{"severity":"critico"}},
        {"id":"caller_name","label":"Name","prompt":"What's your name?","answer":"Please just hurry!","effect":{"timePenaltySec":12,"forceWorsen":true}}
      ]
    },
    "dispatch": { "correctRoles": ["tactical_rota", "bomb_gate", "air_eagle"] },
    "hint": "Cenários raros exigem coordenação: tática + antibomba; priorize evacuação e isolamento."
  },

  {
    "id": "fire_gas_leak_01",
    "agency": "fire",
    "region": "BR",
    "title": "Vazamento de gás em condomínio",
    "opening": "Tá com cheiro fortíssimo de gás no corredor e alguém tá passando mal!",
    "baseSeverity": "grave",
    "timers": { "worsen": 30, "fail": 80 },
    "outcomes": {
      "success": "Área ventilada e vazamento controlado.",
      "worsen": "Risco de explosão aumenta; moradores em pânico.",
      "fail": "Explosão e múltiplas vítimas."
    },
    "protocol": {
      "required": ["location", "source"],
      "questions": [
        {"id":"location","label":"Endereço","prompt":"Qual o endereço e bloco/apto?","answer":"Condomínio Aurora, Bloco C, 3º andar","effect":{"severity":"grave"}},
        {"id":"source","label":"Origem","prompt":"O cheiro vem de botijão, tubulação ou não sabe?","answer":"Parece tubulação no corredor","effect":{"severity":"grave"}},
        {"id":"victims","label":"Feridos","prompt":"Há alguém desmaiado ou com falta de ar?","answer":"Uma pessoa tonta e tossindo","effect":{"severity":"grave"}},
        {"id":"caller_name","label":"Nome","prompt":"Qual seu nome completo?","answer":"Depois… tá muito forte aqui!","effect":{"timePenaltySec":10}}
      ]
    },
    "dispatch": { "correctRoles": ["hazmat", "fire_engine", "medic_ambulance"] },
    "hint": "Vazamento de gás: evacuar, não acionar chamas, HazMat se disponível."
  },

  {
    "id": "fire_car_crash_rescue_01",
    "agency": "fire",
    "region": "US",
    "title": "Multi-vehicle crash (entrapment)",
    "opening": "There's a bad crash—someone is trapped in the car and smoke is coming out!",
    "baseSeverity": "grave",
    "timers": { "worsen": 28, "fail": 75 },
    "outcomes": {
      "success": "Victim extricated and stabilized.",
      "worsen": "Fire risk increases; injuries worsen.",
      "fail": "Fire spreads; victim not rescued in time."
    },
    "protocol": {
      "required": ["location", "trapped"],
      "questions": [
        {"id":"location","label":"Location","prompt":"Where exactly is the crash?","answer":"I-95 exit 14 northbound","effect":{"severity":"grave"}},
        {"id":"trapped","label":"Entrapment","prompt":"Is anyone trapped or unconscious?","answer":"One person trapped, not moving much","effect":{"severity":"critico"}},
        {"id":"smoke","label":"Smoke","prompt":"Do you see smoke or fire?","answer":"Smoke from the hood, no flames yet","effect":{"severity":"grave"}},
        {"id":"caller_name","label":"Name","prompt":"Your name?","answer":"I'm trying to help them!","effect":{"timePenaltySec":8}}
      ]
    },
    "dispatch": { "correctRoles": ["fire_rescue", "medic_ambulance", "fire_engine"] },
    "hint": "Acidente com vítima presa: resgate + ambulância; engine se houver risco de fogo."
  }
];
