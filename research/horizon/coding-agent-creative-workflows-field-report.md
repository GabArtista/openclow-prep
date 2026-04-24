<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Coding Agent Creative Workflows — Field Report

> **Status:** Post-TASK-036 / initial field report established
> **Task:** TASK-036
> **Collected by:** codex
> **Collection date:** 2026-04-24
> **Scope:** práticas atuais de mercado e de comunidade para usar `Codex`, `Claude Code`, `OpenClaw` e ferramentas adjacentes em workflows criativos, com foco em vídeo curto, ativos visuais e automação operacional
> **Non-goal:** tratar showcases isolados ou marketing de produto como substitutos de evidência operacional

## Purpose

Este relatório formaliza a trilha de pesquisa de campo que faltava no programa.
Ele serve para evitar que o OpenClow replique apenas o que o `opensquad` já tentou fazer e para ancorar a próxima arquitetura criativa em padrões atuais de uso real.

## Research Questions

1. Como as pessoas estão usando `Codex`, `Claude Code` e `OpenClaw` hoje em workflows criativos e de vídeo?
2. Qual parte do fluxo fica com o agente e qual parte fica com tools especializadas?
3. Quais padrões se repetem entre documentação oficial e uso de comunidade?
4. O que isso implica para o desenho do OpenClow + Paperclip?

## Source Set

### Official / primary

- OpenAI Help Center — Codex CLI getting started  
  URL: `https://help.openai.com/en/articles/11096431-openai-codex-ci-getting-started`  
  Accessed: 2026-04-24  
  Confidence: high

- OpenAI — Introducing Codex  
  URL: `https://openai.com/index/introducing-codex/`  
  Accessed: 2026-04-24  
  Confidence: high

- OpenAI — Unrolling the Codex agent loop  
  URL: `https://openai.com/index/unrolling-the-codex-agent-loop`  
  Accessed: 2026-04-24  
  Confidence: high

- Anthropic — Claude Code slash commands  
  URL: `https://docs.anthropic.com/en/docs/claude-code/slash-commands`  
  Accessed: 2026-04-24  
  Confidence: high

- Anthropic — Claude Code common workflows  
  URL: `https://docs.anthropic.com/en/docs/claude-code/common-workflows`  
  Accessed: 2026-04-24  
  Confidence: high

- Anthropic — Claude Code hooks guide  
  URL: `https://docs.anthropic.com/en/docs/claude-code/hooks-guide`  
  Accessed: 2026-04-24  
  Confidence: high

- Anthropic — Claude Code MCP  
  URL: `https://docs.anthropic.com/en/docs/claude-code/mcp`  
  Accessed: 2026-04-24  
  Confidence: high

- Anthropic — Claude Code GitHub Actions  
  URL: `https://docs.anthropic.com/en/docs/claude-code/github-actions`  
  Accessed: 2026-04-24  
  Confidence: high

- OpenClaw documentation — automation  
  URL: `https://open-claw.bot/docs/tools/automation/`  
  Accessed: 2026-04-24  
  Confidence: medium

- OpenClaw skills directory — coding-agent  
  URL: `https://openclawai.net/openclaw-skills/coding-agent`  
  Accessed: 2026-04-24  
  Confidence: medium

- GitHub — openclaw-code-agent  
  URL: `https://github.com/goldmar/openclaw-code-agent`  
  Accessed: 2026-04-24  
  Confidence: medium

### Community / field signal

- Reddit — Claude Code short video automation workflow  
  URL: `https://www.reddit.com/r/ClaudeCode/comments/1sdpeqj/been_automating_short_video_content_with_claude/`  
  Accessed: 2026-04-24  
  Confidence: medium

## Key Findings

### 1. The agent is usually the orchestrator, not the renderer

Nos sinais oficiais e comunitários, `Codex` e `Claude Code` aparecem como camadas de orquestração: estrutura de projeto, scripts, automação, naming, prompts, QA, integração e retries.

As ferramentas de geração e render continuam especializadas:
- `ffmpeg` para montagem e transformação
- APIs ou softwares dedicados para image-to-video, lip sync, talking head, design e publicação
- browsers, hooks, MCPs e automações para ligar tudo isso

Implicação: o OpenClow não deve esperar que um único agente “faça o vídeo”. O agente deve coordenar um workflow forte, previsível e auditável.

### 2. Memory and project conventions are part of the workflow

`Codex` e `Claude Code` hoje são usados com contexto persistente do projeto:
- `CLAUDE.md`
- slash commands
- hooks
- MCP servers
- GitHub Actions
- sandboxes e worktrees

O padrão observado é transformar boas práticas em contrato do workspace, não repetir tudo no prompt a cada execução.

Implicação: o OpenClow precisa tratar `brand context`, `creative playbook`, `operational truth` e `tool registry` como partes formais do sistema.

### 3. Parallelism and scoped tasks are emerging as the dominant operating mode

Na documentação da OpenAI, `Codex` cloud é explicitamente recomendado para tarefas paralelas e bem delimitadas.
Na documentação da Anthropic, `Claude Code` expõe subagentes, hooks e comandos de projeto para dividir responsabilidades.

Implicação: o workflow criativo do OpenClow deve ser multiagente por contrato, mas com ownership claro:
- contexto
- referência
- direção criativa
- plano de frames
- edição
- VFX
- QA de marca
- QA técnico

### 4. Real workflows are hybrid by default

O sinal comunitário mais útil encontrado foi um operador usando `Claude Code` como backbone e, ao mesmo tempo, `Magic Hour`, `Hedra`, `ffmpeg` e `Canva` para as partes criativas pesadas.

Isso confirma um padrão importante:
- ninguém sério está resolvendo tudo com uma única stack
- qualidade vem de composição de peças, não de uma única ferramenta

Implicação: `OpenClow + Paperclip` deve nascer híbrido por desenho.

### 5. Quality control is moving toward deterministic gates

A documentação do `Claude Code` enfatiza hooks e workflow automation.
O `Codex CLI` enfatiza approval modes e controle explícito de ação.
No `opensquad`, o problema já apareceu na prática: processo existe, mas os contratos de execução e QA de vídeo ainda não são cumpridos ponta a ponta.

Implicação: nosso sistema precisa de gates determinísticos:
- `brand QA`
- `delivery QA`
- previews por shot
- logs de edição e efeitos
- reasons for reject
- retry guidance

## Patterns Worth Porting to OpenClow

1. Agente como camada de orquestração local com acesso forte ao projeto.
2. Tarefas pequenas e paralelizáveis por papel.
3. Memória de projeto e comandos reutilizáveis como parte da operação.
4. Uso de toolchain híbrida, com render e geração fora do agente principal.
5. Aprovação explícita antes de passos sensíveis.

## Patterns to Avoid

1. Confiar em um único modelo/agente para direção, edição, VFX e QA.
2. Usar geração visual como default em vez de recurso pontual.
3. Misturar verdade operacional com memória criativa sem regra de precedência.
4. Aceitar exemplos de showcase como prova de viabilidade operacional.
5. Deixar hooks, comandos e permissões informais em vez de torná-los contrato.

## Implications for OpenClow + Paperclip

### Architecture

- `Paperclip` deve ser tratado como camada declarativa de composição e motion.
- `OpenClow` deve ser o control plane: contexto, workflow, approvals, retries, QA, artifacts e publication gates.
- `ffmpeg` continua sendo baseline técnico de edição, export e inspeção.

### Product roles

O papel `Workflow Field Researcher` passa a ser necessário para manter a arquitetura conectada com práticas reais de mercado.

### Runtime

O runtime criativo deve suportar pelo menos:
- pipeline puramente determinístico em máquina fraca
- pipeline híbrido em máquina média
- pipeline com assists generativos em máquina forte

### Research cadence

Esta trilha precisa de refresh recorrente. O campo muda rápido demais para ficar preso em uma única auditoria do `opensquad`.

## Open Questions

1. Quais combinações open-source mais estáveis hoje competem de verdade com stacks pagas para vídeo curto vertical?
2. Até onde vale usar geração visual em vez de composição motion-first?
3. Qual subset de toolchain consegue entregar qualidade forte em máquina comum sem destruir previsibilidade?
4. Como transformar hooks e comandos de projeto em contracts versionados do OpenClow?

## Recommended Next Task

`TASK-037` deve transformar este field report em arquitetura de referência para workflows criativos com:
- contracts de agente
- camadas de contexto
- tool profiles por capacidade de máquina
- papel exato do `Paperclip` na pipeline

## Confidence Note

**Overall confidence: medium-high**

Base oficial sobre `Codex` e `Claude Code` é forte.
Sinal de `OpenClaw` e de comunidade é útil, mas ainda mais heterogêneo e menos normalizado.
O relatório é suficiente para orientar arquitetura e backlog; não é suficiente para fechar sozinho a escolha final de stack criativa.
