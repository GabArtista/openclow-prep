# User Experience and Meta-Squad Flow — OpenClow MVP

> **Status:** Post-TASK-033 / MVP baseline established
> **Updated:** 2026-04-24

## Product Experience Goal

O usuário deve sentir que está operando um sistema de trabalho, não apenas prompts empilhados.

O fluxo principal precisa ser simples:

1. escolher ou criar um squad
2. rodar um pipeline
3. aprovar checkpoints
4. revisar outputs
5. ajustar capacidades quando necessário

## Main User Flows

### Flow 1 — Run an Existing Squad

1. Usuário abre o dashboard
2. Seleciona um squad existente
3. Informa parâmetros do run
4. Sistema inicia execução
5. Dashboard mostra status por agent/step
6. Sistema pausa em checkpoints
7. Usuário aprova ou rejeita
8. Outputs e aprendizados ficam persistidos

### Flow 2 — Edit a Squad

1. Usuário escolhe um squad
2. Pede mudança de estrutura, prompt, step ou tool
3. Sistema abre o meta-squad interno
4. O meta-squad produz proposta em `draft`
5. Usuário revisa diff, riscos e impacto
6. Capability vai para `staging`
7. Só depois de aprovado vira `active`

### Flow 3 — Create a New Skill or Tool

1. Usuário descreve a nova capacidade
2. `Capability Designer` transforma o pedido em spec
3. `Skill Builder` gera artefato inicial
4. `Contract Validator` valida estrutura
5. `Eval Analyst` roda benchmark mínimo
6. Usuário aprova ou rejeita
7. Se aprovado, entra no registry como `active`

## The Meta-Squad

O meta-squad é uma capability interna do sistema.

### Core Roles

- `Capability Designer`
- `Meta Architect`
- `Skill Builder`
- `Pipeline/Tool Contract Engineer`
- `Eval and Benchmark Analyst`
- `Security Gatekeeper`
- `Registry Maintainer`

### What It Can Create

- `skills`
- `squads`
- `pipelines`
- `tool contracts`
- documentação operacional
- suites mínimas de eval

### What It Cannot Do Automatically

- promover para produção sem checkpoint humano
- ampliar permissões sem aprovação
- tocar segredos diretamente
- publicar conteúdo externo por padrão

## Registry Lifecycle

Toda capability deve ter ciclo formal:

1. `draft`
2. `staging`
3. `active`
4. `retired`

Promotion exige:
- validação estática
- eval comportamental
- revisão humana

## UX Principles

- o dashboard sempre mostra onde o run está
- cada step tem estado e output visível
- rejeição de checkpoint deve ser compreensível
- histórico deve ser navegável por squad e run
- criação de capability deve parecer workflow assistido, não edição bruta de arquivos

## MVP baseline UX deliverables

- tela/lista de squads
- tela de run com progresso por step
- painel de checkpoint
- visualização de outputs
- histórico básico de runs
- fluxo assistido do meta-squad para criação/edição de capability

## Acceptance

A experiência do MVP é aceitável se:

- um usuário não técnico da Doze conseguir rodar um squad sem editar arquivos manualmente
- o estado do sistema for visível em tempo real
- mudanças em capabilities passarem por fluxo guiado e seguro
