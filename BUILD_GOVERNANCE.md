# Regras-mãe de build — Last Call Dispatch Operator

## Regra inviolável
Toda atualização do projeto deve gerar **ZIP completo do jogo**, nunca patch solto.

## O que toda build obrigatoriamente precisa ter
- **Versão do jogo visível na interface**.
- **Data e hora da build visíveis na interface**.
- **Percentual estimado de conclusão do projeto** registrado nos arquivos de controle.
- **Pacote completo** com todos os arquivos necessários para deploy.

## Fonte oficial da build atual
- `build-info.json`
- `BUILD_INFO.json`
- `BUILD_CURRENT.txt`

## Build vigente
- Versão: **1.4.0**
- Stage: **Phase 5A**
- Build: **2026-04-16 19:47:01 BRT**
- Conclusão: **78%**

## Fluxo recomendado para a equipe
1. Atualizar `build-info.json`.
2. Refletir a mesma versão/timestamp na interface do jogo.
3. Atualizar changelog e roadmap.
4. Gerar ZIP completo da build.
5. Informar percentual de conclusão no nome da entrega ou no relatório associado.
