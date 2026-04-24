# Local Runtime Strategy — OpenClow MVP

> **Status:** Draft for Plan 2
> **Updated:** 2026-04-23

## Runtime Goal

Definir uma estratégia de inferência local-first utilizável no servidor atual, sem GPU confirmada, mantendo previsibilidade operacional.

## Starting Point

O servidor já tem `Ollama` ativo com modelos instalados:

- `qwen2.5:14b`
- `qwen2.5-coder:14b`
- `qwen2.5-coder:32b`
- `gemma4:31b-it-q4_K_M`

## Recommended Day-1 Strategy

### Model Access Layer

Usar `Ollama` como gateway de inferência do MVP day-1.

Razões:
- já está instalado e operacional
- evita introduzir mais moving parts no começo
- funciona sem exigir GPU dedicada
- suficiente para estratégia, BI, copy, análise e coordenação inicial

### Tiering

Definir dois tiers lógicos no sistema:

- `fast`
  - prioridade para tasks curtas, transforms, classificação, roteamento e apoio analítico
  - candidato inicial: `qwen2.5:14b` ou `qwen2.5-coder:14b`, dependendo do perfil da task

- `powerful`
  - prioridade para estratégia, síntese longa, planejamento, revisão e coding mais pesado
  - candidato inicial: `qwen2.5-coder:32b` e `gemma4:31b-it-q4_K_M`

## Concurrency Policy

Sem benchmark formal ainda, a política inicial deve ser conservadora:

- `powerful`: 1 run concorrente por vez
- `fast`: começar com 1-2 execuções concorrentes e medir
- jobs pesados de design/vídeo devem entrar em fila separada

## Day-1 Workloads That Fit Well

- estratégia
- BI
- relatórios
- pesquisa
- copy
- revisão
- orchestration prompts
- meta-squad de definição e validação

## Workloads That Need Care

- geração visual intensiva local
- edição de vídeo
- multimodal pesado
- alta concorrência de squads grandes

## Routing Recommendation

### Inline steps

- preferir `fast` quando a tarefa for curta e de baixo risco
- escalar para `powerful` quando houver síntese complexa ou decisão estrutural

### Subagent steps

- por padrão usar fila e limites de concorrência
- steps de pesquisa pesada, estratégia ou benchmark podem usar `powerful`

### Tool-backed steps

- quando a capacidade depender mais de API/integração do que de raciocínio, usar modelo menor e deixar o valor principal na tool

## If GPU Appears Later

Se o servidor ganhar GPU NVIDIA, a evolução recomendada é:

1. manter `Ollama` como baseline de compatibilidade
2. avaliar `vLLM` para serving de modelos maiores com melhor throughput
3. só introduzir `LiteLLM` se houver necessidade real de fallback híbrido e roteamento entre múltiplos backends

## What Not To Do on Day-1

- não introduzir `vLLM`, `LiteLLM`, `LM Studio` e outro gateway ao mesmo tempo
- não prometer edição de vídeo local pesada sem benchmark
- não usar concorrência agressiva antes de medir latência real

## Operational Guardrails

- filas explícitas por tier
- timeout por step
- retry controlado para falhas transitórias
- métrica de duração por modelo
- logs por request
- backpressure visível no dashboard

## Recommendation

Para o MVP server-first:

- `Ollama` é o runtime inicial
- `qwen2.5:14b` / `qwen2.5-coder:14b` servem como camada `fast`
- `qwen2.5-coder:32b` / `gemma4:31b-it-q4_K_M` servem como camada `powerful`
- evoluções de runtime só entram após benchmark real do day-1
