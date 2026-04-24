<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Squad 1 Definition

> **Status:** Draft for TASK-028 prep
> **Purpose:** definir o time que vai construir o produto OpenClow a partir do pacote do Squad 0

## Mission

Construir e operar o produto OpenClow em `product/` com segurança, observabilidade e governança suficientes para reproduzir o valor operacional da Doze sem quebrar a raiz do repositório.

## Responsibilities

- implementar e manter `api`, `orchestrator`, `worker`, `registry`, `runtime` e `dashboard`
- portar capacidades aprovadas do benchmark `opensquad`
- preservar o fluxo operacional atual da Doze na raiz
- operar staging-first antes de qualquer validação controlada em produção

## Expected roles

- Program Architect
- Durable Runtime Analyst
- Observability and Evals Analyst
- Security and Agency Boundaries Analyst
- Documentation Agent

## Initial execution sequence

1. validar contratos
2. validar runtime e durabilidade
3. validar observabilidade e evals
4. validar security boundaries
5. executar E2E staging-first

## Readiness criteria

- artefatos de pesquisa fechados
- ADRs principais aceitos
- intake package completo
- exit checklist verificável
- suíte E2E executável

## Operating constraint

Squad 1 só entra em desenvolvimento pesado depois que o pacote de preparação ficar verde.
