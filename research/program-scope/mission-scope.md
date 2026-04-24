# Mission Scope — OpenClow

> **Status:** Post-TASK-033 / MVP baseline established
> **Updated:** 2026-04-24
> **Sources:** `MISSION.md`, `workboard/BACKLOG.md`, `opensquad` local repo, server inventory on `root@78.109.16.236`

## Objective

OpenClow deve ser um sistema multiagente operacional, hospedado no servidor da Doze, capaz de executar workflows reais de negócio com checkpoints humanos, memória persistente, integração com APIs já usadas pela empresa e capacidade interna de criar e evoluir `skills`, `squads`, `pipelines` e `tools`.

O MVP não deve nascer como plataforma genérica abstrata. Ele deve nascer útil para a operação real da Doze e cobrir, no mínimo:

- estratégia e pesquisa
- BI e relatórios acionáveis
- criativos e design operacional
- publicação e automação com APIs já adotadas
- preparação de fluxos para vídeo e ativos visuais
- um meta-squad interno que evolui o próprio sistema com segurança

## Primary Outcome

Ao final do MVP, a Doze deve conseguir operar o sistema no servidor com experiência previsível:

1. escolher ou criar um squad
2. executar pipelines com checkpoints humanos
3. usar integrações reais já adotadas pela empresa
4. armazenar estado, memória, artefatos e histórico
5. criar ou ajustar novas capacidades sem depender de refatoração manual do core

## Product Positioning

OpenClow não deve copiar o `opensquad` literalmente.

O `opensquad` entra no programa como:

- benchmark funcional da Doze
- fonte primária de requisitos reais
- doador de padrões de UX, squads, checkpoints, memória e skills

OpenClow deve acrescentar o que o `opensquad` ainda não garante de forma forte:

- enforcement próprio de permissões e checkpoints
- operação server-first
- controle de runtime e observabilidade fora da IDE
- governança de credenciais e ferramentas
- camada interna de versionamento e promoção de capacidades

## Non-Goals for the MVP

O MVP não precisa, nesta fase:

- ser marketplace público
- suportar qualquer domínio arbitrário desde o baseline
- substituir toda IDE host como ambiente de autoria
- resolver inferência multimodal pesada localmente sem GPU confirmada
- automatizar publicação irrestrita sem checkpoints humanos
- permitir autoexpansão sem guardrails

## Proven Inputs Already Available

Hoje já existem evidências concretas que delimitam o MVP:

- `opensquad` da Doze com squads reais de marketing e BI
- skills reais para `GA4`, `WooCommerce`, `Meta Insights`, `Apify`, `Canva`, `Blotato`, `Hotjar`, publicação Instagram e workflows visuais
- servidor com `k3s`, `Docker`, `Postgres`, `Ollama`, observabilidade e workloads ativos
- modelos locais já carregados no `Ollama`

Isso é suficiente para orientar o desenho do MVP como sistema utilizável, não só como protótipo conceitual.

## Scope Boundaries

### In Scope

- control plane multiagente no servidor
- workers para execução de agents e pipelines
- dashboard de execução e checkpoints
- memória global e por squad
- registry de `skills`, `squads`, `pipelines` e `tools`
- integrações da Doze necessárias para marketing e BI
- meta-squad de auto-construção com validação humana
- observabilidade, auditoria e rollback básicos

### Out of Scope for Plan 0

- implementação do produto final
- benchmark exaustivo de todos os runtimes do mercado
- suporte amplo a terceiros fora do contexto da Doze
- autonomia plena sem checkpoints

## Questions This Phase Must Answer

1. Qual é o corte exato entre o que será herdado do `opensquad` e o que será reconstruído no `OpenClow`?
2. Quais integrações entram no baseline e quais ficam para fase seguinte?
3. Qual runtime local é aceitável sem GPU confirmada?
4. Onde ficará o enforcement de permissões, checkpoints e publicação?
5. Como o meta-squad interno poderá evoluir o sistema sem ampliar risco operacional?

## Success Conditions

O escopo estará suficientemente fechado quando estas afirmações forem verdadeiras:

- o MVP estiver definido como sistema server-first para workflows reais da Doze
- o `opensquad` estiver classificado como benchmark e fonte de portabilidade
- o conjunto de integrações do baseline estiver definido
- o meta-squad de auto-construção estiver dentro do escopo explícito do produto
- as principais dúvidas restantes tiverem sido empurradas para ADRs e backlog, e não permanecerem implícitas
