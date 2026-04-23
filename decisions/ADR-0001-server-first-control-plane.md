<!-- TEMPLATE: ADR | version: 1.0 | do not remove this line -->

# ADR-0001: Adotar arquitetura server-first com control plane próprio

## Metadados

| Campo | Valor |
|---|---|
| **Número** | ADR-0001 |
| **Status** | accepted |
| **Data** | 2026-04-23 |
| **Decisores** | codex |
| **Issue GitHub** | N/A |
| **Supersede** |  |
| **Supersedido por** |  |

---

## Contexto

O programa precisa construir um MVP multiagente utilizável pela Doze no servidor `root@78.109.16.236`, suportando squads reais, checkpoints humanos, integrações existentes e evolução controlada de capacidades. O benchmark funcional mais forte disponível hoje é o `opensquad`, mas a própria análise mostrou que o enforcement real de permissões ainda depende da IDE host. Se não decidirmos agora a fronteira do control plane, corremos o risco de herdar um modelo operacional útil porém inseguro para um ambiente com integrações reais e possíveis efeitos em produção.

---

## Decisão

**O OpenClow adotará uma arquitetura server-first com control plane próprio, responsável por autenticação, autorização, runs, steps, checkpoints, promotion e auditoria, sem depender da IDE host para enforcement.**

---

## Justificativa

O `opensquad` já provou valor em UX, squads, checkpoints e memória, mas não deve ser a camada final de enforcement. Para operar no servidor com respeito à produção da Doze, o sistema precisa ter suas próprias garantias de permissão, rastreabilidade e isolamento operacional.

---

## Alternativas Consideradas

| Opção | Prós | Contras | Razão da Rejeição |
|---|---|---|---|
| Server-first com control plane próprio | Enforcement interno, auditabilidade, segurança operacional, independência da IDE | Mais trabalho inicial de arquitetura | N/A — escolhida |
| Reaproveitar diretamente o modelo do opensquad dependente da IDE | Mais rápido, benchmark já validado | Enforcement fraco, risco operacional, dependência do host | Não atende o nível de segurança e governança exigido |
| Fazer apenas automação por scripts sem control plane claro | Implementação mais simples | Sem orquestração forte, sem checkpoints formais, sem evolução controlada | Insuficiente para o escopo do MVP |

---

## Consequências

**Positivas:**
- Checkpoints, permissões e promotion passam a ser controlados pelo próprio produto.
- O sistema pode ser operado no servidor de forma consistente, independente da IDE.

**Negativas / Trade-offs:**
- A implementação inicial do core fica mais custosa.
- Parte do que o `opensquad` já oferece terá de ser reimplementada com rigor maior.

**Riscos:**
- Risco de overengineering precoce.
  Mitigação: manter o MVP restrito ao recorte day-1 da Doze e deferir o que não for essencial.

---

## Referências

- `research/architecture/mvp-server-architecture.md`
- `research/ecosystem-fit/opensquad-fit-assessment.md`
- `research/program-scope/mission-scope.md`
