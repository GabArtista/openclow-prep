<!-- TEMPLATE: ADR | version: 1.0 | do not remove this line -->

# ADR-0003: Separar definições versionadas, runtime state e artefatos

## Metadados

| Campo | Valor |
|---|---|
| **Número** | ADR-0003 |
| **Status** | accepted |
| **Data** | 2026-04-23 |
| **Decisores** | codex |
| **Issue GitHub** | N/A |
| **Supersede** |  |
| **Supersedido por** |  |

---

## Contexto

O MVP precisa preservar auditabilidade, versionamento de capacidades, persistência de execução e outputs grandes. Misturar tudo no mesmo storage complica rollback, dificulta inspeção e aumenta o risco de corrupção de estado operacional. O `opensquad` mostra valor em estado simples por arquivos, mas o `OpenClow` precisa operar em servidor com maior rigor.

---

## Decisão

**O sistema terá três planos de persistência distintos: Git para definições versionadas, Postgres para runtime state e MinIO para artefatos/output grandes.**

---

## Justificativa

Essa separação preserva o que cada camada faz melhor:

- Git: versionar `skills`, `squads`, `pipelines`, prompts e templates
- Postgres: runs, steps, checkpoints, approvals e audit trail
- MinIO: imagens, relatórios, assets e outputs pesados

---

## Alternativas Consideradas

| Opção | Prós | Contras | Razão da Rejeição |
|---|---|---|---|
| Git + Postgres + MinIO separados | Clareza, rollback melhor, isolamento de responsabilidade | Mais componentes para operar | N/A — escolhida |
| Só filesystem/Git para tudo | Simples conceitualmente | Fraco para runtime concorrente e auditoria rica | Insuficiente para operação server-first |
| Só banco de dados para tudo | Centraliza persistência | Piora versionamento humano de capacidades e assets | Rejeitada por reduzir governança e legibilidade |

---

## Consequências

**Positivas:**
- Definições do sistema permanecem auditáveis e versionáveis.
- Runtime state e artefatos podem crescer sem acoplar tudo numa camada só.

**Negativas / Trade-offs:**
- Exige desenho claro de IDs e referências cruzadas.
- Operação inicial fica um pouco mais complexa.

**Riscos:**
- Referências quebradas entre banco, Git e objetos.
  Mitigação: usar IDs estáveis de capability/run e contratos claros de armazenamento.

---

## Referências

- `research/architecture/mvp-server-architecture.md`
- `research/architecture/user-experience-and-meta-squad.md`
