/* Auto-gerado: ETAPA 2 (Core gameplay com timers, agravamento e consequências) */
window.CALLS = [
  {
    "id": "pol_som_alto_01",
    "agency": "police",
    "region": "BR/US",
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
  }
];
