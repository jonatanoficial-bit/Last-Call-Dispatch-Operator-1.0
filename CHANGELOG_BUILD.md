# Histórico de Builds

## 1.4.1 - 2026-04-17 10:18:00 BRT
- Corrigida a repetição da saudação inicial a cada nova pergunta.
- Fluxo de despacho estabilizado após completar perguntas obrigatórias.
- Ajustes mobile-first para portrait com melhor leitura e toque.

# Changelog da Build 1.4.0 / Phase 5A

**Build:** 2026-04-16 19:47:01 BRT  
**Conclusão estimada:** 78%

## Correções e upgrades desta build
- `build-info.json` virou a fonte principal de versão, timestamp e progresso do projeto.
- Adicionado **selo fixo de build** na interface para garantir rastreabilidade visual em qualquer tela.
- Corrigido o motor de despacho para considerar **compatibilidade entre unidade e tipo de ocorrência**, resolvendo erros de avaliação em chamadas de patrulha, tática, investigação, tráfego e resgate.
- Catálogo de cidades reorganizado para o escopo inicial comercial: **São Paulo, Rio, New York City, Tokyo, Rome e Berlin** liberadas no início.
- Unidades por cidade/agência agora são carregadas do catálogo canônico `data/cities.js`, reduzindo divergência entre design e runtime.
- Pass mobile-first aplicado no topo da interface, HUD, botões e mapa.

## Impacto
Esta build destrava a base comercial do projeto em três frentes: governança de build, coerência operacional do despacho e apresentação internacional inicial com melhor leitura em mobile.

## Próximo bloco recomendado
- adicionar casos exclusivos por cidade/país;
- criar briefing/debriefing premium com KPIs e replay textual;
- estruturar analytics, save migration e pacote de DLCs por região.
