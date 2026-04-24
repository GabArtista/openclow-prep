<!-- TEMPLATE: ADR | version: 1.0 | do not remove this line -->

# ADR-0007: Modelar promotion flow do registry como request + approval explícitos

## Metadados

| Campo | Valor |
|---|---|
| **Número** | ADR-0007 |
| **Status** | accepted |
| **Data** | 2026-04-24 |
| **Decisores** | codex |
| **Issue GitHub** | #10 |
| **Supersede** |  |
| **Supersedido por** |  |

---

## Contexto

O MVP já precisa expor lifecycle formal para capabilities, mas a regra operacional do repo exige que nada seja autopublicado. Além disso, o registry precisa suportar promoção, rollback e trilha auditável sem depender de um sistema externo para enforcement.

Sem uma modelagem explícita, a API poderia aceitar `PATCH` de status diretamente e quebrar a separação entre edição de metadata e promoção governada.

---

## Decisão

**O registry vai tratar promoção e rollback como requests explícitos, persistidos em uma coleção própria, e só vai alterar `capability.status` após aprovação humana registrada em `approvals`.**

---

## Justificativa

Essa opção mantém a edição de capability separada da autorização de lifecycle, preserva trilha auditável e evita autopublicação acidental. Também deixa o meta-squad livre para propor mudanças em `draft` sem ganhar permissão implícita de promover.

---

## Alternativas Consideradas

| Opção | Prós | Contras | Razão da Rejeição |
|---|---|---|---|
| Request + approval explícitos | Governança clara, audit trail, sem autopublicação | Mais modelagem inicial | N/A — escolhida |
| PATCH direto de `status` | Simples de implementar | Mistura edição com promoção, frágil para auditoria | Permite autopublicação e enfraquece enforcement |
| Aprovação fora do registry | Menor acoplamento do registry | Quebra o fluxo local e espalha regras | O MVP precisa do control plane próprio |

---

## Consequências

**Positivas:**
- promoções e rollbacks ficam auditáveis
- o meta-squad pode operar em `draft` sem risco de publicar sozinho
- a API preserva o contrato de governança do MVP

**Negativas / Trade-offs:**
- exige uma coleção extra para promotions
- o fluxo de lifecycle fica mais verboso que um `PATCH`

**Riscos:**
- implementação incompleta de transições pode confundir usuários; mitigar com validação de estado e mensagens explícitas

---

## Referências

- `research/architecture/mvp-server-architecture.md`
- `research/architecture/user-experience-and-meta-squad.md`
- `decisions/ADR-0004-capability-registry-and-meta-squad.md`
