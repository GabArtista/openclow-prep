<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Creative Tooling Profiles

> **Status:** TASK-037 / operational fit baseline
> **Goal:** definir como a toolchain criativa do OpenClow varia por capacidade de máquina e por ambiente sem perder previsibilidade

## Purpose

Este documento transforma o requisito “funcionar em qualquer máquina com qualidade previsível” em perfis operacionais claros.

Ele não escolhe uma stack fechada única.
Ele define envelopes de uso para que o sistema degrade com controle em vez de quebrar ou gerar saída ruim.

## Core Principle

Qualidade previsível vem de:
- composição determinística
- contratos fortes
- QA forte
- geração opcional

Não vem de jogar mais geração visual no problema.

## Tooling Baseline

Ferramentas que devem existir em todos os perfis:
- `FFmpeg`
- `Paperclip`
- runtime do OpenClow
- previews por shot/peça
- QA brand + QA delivery

## Profile A — `cpu-safe`

### Use when
- notebook comum
- VPS fraco
- ambiente local limitado
- necessidade de previsibilidade acima de velocidade

### Tool set
1. `FFmpeg`
2. `Paperclip`
3. análise leve de áudio/imagem

### Workflow shape
- input real
- composição declarativa
- cortes e overlays
- tipografia forte
- export controlado

### Strengths
- confiável
- barato
- reproduzível

### Limits
- pouco assist generativo
- VFX mais simples
- menos recuperação automática de assets fracos

## Profile B — `balanced`

### Use when
- desktop intermediário
- servidor de staging razoável
- necessidade de QA visual melhor

### Tool set
1. `FFmpeg`
2. `Paperclip`
3. assistente visual local ou controlado

### Workflow shape
- tudo do `cpu-safe`
- leitura visual mais rica
- classificação de referência melhor
- assists pontuais de composição

### Strengths
- bom equilíbrio entre custo e qualidade
- melhora QA e planning sem tornar o pipeline dependente de geração

### Limits
- ainda não é perfil para generation-heavy como default

## Profile C — `quality-first`

### Use when
- staging dedicado
- máquina forte
- execução mais lenta é aceitável
- há necessidade real de assists pesados

### Tool set
1. `FFmpeg`
2. `Paperclip`
3. assist stack open-source controlada

### Workflow shape
- composição motion-first
- geração só para lacunas claras
- cleanup e enhancement pontuais
- VFX mais ricos quando aprovados

### Strengths
- maior teto de qualidade
- melhor recuperação de material ruim

### Limits
- maior latência
- maior risco operacional
- exige gates e logs ainda mais fortes

## Environment Profiles

### `local-dev`

Permitido:
- mock inputs
- fake publication
- previews
- render controlado

Proibido:
- credenciais de produção
- publicação real

### `staging`

Permitido:
- integrações em dry-run
- render próximo do real
- teste de QA
- ensaio de publicação controlada

Proibido:
- produção por default
- reuse automático de credenciais de prod

### `production`

Permitido:
- somente workloads aprovados
- publish/schedule após gate humano
- rollout controlado

Obrigatório:
- secrets manager
- logs
- receipts
- rollback
- observabilidade

## Recommended Default

Default do programa para começar:
- `machine_profile = balanced`
- `environment = local-dev` ou `staging`

Não começar por:
- `quality-first` em produção
- generation-heavy como caminho padrão

## Operational Implications

1. O design da skill não pode assumir GPU forte.
2. Todo squad criativo deve declarar `machine_profile`.
3. Toda tool criativa deve declarar `supports_dry_run`.
4. Toda publicação deve declarar `environment_scope`.
5. O servidor de produção só entra depois que o profile de staging estiver comprovado.
