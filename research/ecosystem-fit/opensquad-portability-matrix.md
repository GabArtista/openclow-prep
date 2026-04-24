# Opensquad Portability Matrix

> **Status:** Accepted for bootstrap planning
> **Updated:** 2026-04-23
> **Source base:** `research/ecosystem-fit/opensquad-fit-assessment.md`

## Objective

Transformar o benchmark funcional do `opensquad` em uma matriz operacional que deixe explícito o que deve ser:

- portado quase direto
- reimplementado com enforcement próprio
- descartado ou adiado

Essa matriz é a referência de bootstrap do OpenClow em `product/`.
Ela também assume que a raiz do `openclow-prep` precisa continuar estável porque já sustenta a operação atual da Doze com as empresas da 12.

## Classificação Consolidada

| Área / padrão do `opensquad` | Classificação | Decisão para o OpenClow | Observações |
|---|---|---|---|
| `squad.yaml` como contrato declarativo | portar quase direto | manter contrato declarativo de squad | adaptar nomenclatura só se o registry exigir |
| `pipeline.yaml` como contrato de fluxo | portar quase direto | manter pipeline declarativo com steps e checkpoints | serve como base do interpretador do orchestrator |
| distinção `inline` vs `subagent` | portar quase direto | preservar semântica operacional | vira parte do contrato de `Step` |
| checkpoints explícitos com `on_reject` | portar quase direto | manter como padrão de UX e controle | precisa de enforcement próprio no control plane |
| memória por squad | portar quase direto | manter no day-1 | implementar com storage e IDs estáveis |
| comportamento do dashboard de run/step | portar quase direto | reproduzir a visão operacional central | UX já provou utilidade real na Doze |
| squads equivalentes a `marketing-dozecrew` e `inteligencia-dozecrew` | portar quase direto | tornar alvos obrigatórios do day-1 | são a prova funcional mínima do MVP |
| skills pequenas e focadas | portar quase direto | manter granularidade por integração/uso | reduz blast radius e facilita promotion |
| modelo de estado por arquivos simples | reimplementar com enforcement próprio | migrar para runtime state em `Postgres` + artefatos em `MinIO` | arquivos locais não bastam para operação concorrente |
| bindings de integrações reais | reimplementar com enforcement próprio | preservar os casos de uso, refazer a camada de execução | segredos ficam fora do repo e fora de outputs |
| execução de tools/skills dependente da IDE host | reimplementar com enforcement próprio | mover enforcement para API/orchestrator/worker | dependência da IDE é incompatível com server-first |
| promotion flow leve ou implícito | reimplementar com enforcement próprio | adotar `draft/staging/active/retired` | promoção exige validação e aprovação humana |
| governança de capabilities | reimplementar com enforcement próprio | centralizar no registry | meta-squad nunca autopublica |
| políticas de segredo e acesso | reimplementar com enforcement próprio | bindings externos, sem segredo no repo | `draft` e `staging` não herdam produção por default |
| ações externas sem checkpoint forte | reimplementar com enforcement próprio | bloquear por padrão e exigir checkpoint humano | especialmente para WooCommerce, Meta e publicação |
| permissões implícitas de filesystem local | descartar/adiar | não portar como padrão do produto | incompatível com operação auditável |
| acoplamentos específicos de IDE/editor | descartar/adiar | usar só como referência histórica | não devem entrar no core do OpenClow |
| workflows criativos pesados ou multimodais instáveis | descartar/adiar | deixar para fase posterior | não entram no day-1 sem estabilidade comprovada |
| padrões inseguros de documentação de credenciais | descartar/adiar | não portar | proibidos pela política atual |

## Integrações Day-1

### Obrigatórias

- `GA4`
- `WooCommerce`
- `Meta Insights`
- `Hotjar`
- `Apify`
- `Canva`
- `Instagram Publisher`

### Opcionais na primeira onda

- `Blotato`

## Implicações de Implementação

1. O bootstrap em `product/` deve nascer com contratos explícitos de `Squad`, `Pipeline`, `Step`, `Checkpoint`, `Capability`, `Run` e `Approval`.
2. O core do produto deve copiar a utilidade operacional do `opensquad`, não seus pontos de fragilidade.
3. A ordem correta de build é: contracts e control plane primeiro, integração real depois, sem quebrar o fluxo atual da Doze na raiz do repositório.
4. Qualquer capacidade importada do `opensquad` deve entrar como `draft` ou `staging`, nunca como `active` direto.

## Recorte Obrigatório do MVP

O MVP só pode ser considerado pronto para homologação quando conseguir:

- executar um squad equivalente ao `marketing-dozecrew`
- executar um squad equivalente ao `inteligencia-dozecrew`
- pausar e retomar checkpoints com aprovação/rejeição humana
- persistir memória, outputs e histórico
- operar as integrações day-1 sob guardrails staging-first
