# BACKLOG.md — Backlog do Programa

> **Convenções:**
> - **Prioridade:** P0 (crítico/bloqueante) | P1 (alta) | P2 (normal)
> - **Tamanho:** S (< 2h) | M (2-8h) | L (1-3 dias) | XL (> 3 dias)
> - **Status:** `backlog` | `in-progress` | `done` | `blocked`
> - Ao pegar uma task: mover para `workboard/IN_PROGRESS.md` e criar issue no GitHub

---

## P0 — Crítico (Caminho Crítico)

### TASK-001 | P0 | S | Definir visão do produto OpenClow
- **Output:** `research/product-vision.md`
- **Critério de aceite:** A visão do produto pode ser lida pelo Squad 1 sem nenhum contexto adicional. Inclui: qual problema resolve, para quem, o que diferencia, e o que o produto NÃO faz.
- **Dependências:** nenhuma
- **Template a usar:** `templates/EVIDENCE.md` para evidências coletadas

### TASK-002 | P0 | M | Pesquisa de domínio e segmentos de usuário
- **Output:** `research/domain-research.md`, `research/competitive-analysis.md`
- **Critério de aceite:** mínimo 3 competidores analisados (pontos fortes, fracos, posicionamento), segmentos de usuário definidos com características, tamanho de mercado estimado com fonte
- **Dependências:** TASK-001 (visão do produto)
- **Template a usar:** `templates/EVIDENCE.md` para cada evidência

### TASK-003 | P0 | S | Mapear restrições duras do programa
- **Output:** `research/constraints.md`
- **Critério de aceite:** cada restrição tem: origem (legal/compliance/técnica/budget), enunciado claro, implicação para a arquitetura
- **Dependências:** nenhuma (pode ser feita em paralelo com TASK-001)
- **Template a usar:** livre, mas estruturado

### TASK-004 | P0 | M | Definir requisitos não-funcionais (NFRs)
- **Output:** `research/nfr.md`
- **Critério de aceite:** cada NFR é mensurável (tem número ou threshold), categorizado (performance, disponibilidade, segurança, escalabilidade, compliance), e tem fonte/justificativa
- **Dependências:** TASK-001, TASK-003

---

## P1 — Alta Prioridade

### TASK-005 | P1 | L | Avaliação de stack tecnológico
- **Output:** `research/tech-evaluation.md` + ADRs para cada decisão major em `decisions/`
- **Critério de aceite:** frontend, backend, banco de dados, e infra avaliados; cada escolha major tem um ADR com alternativas consideradas
- **Dependências:** TASK-003, TASK-004
- **Template a usar:** `templates/ADR.md` para cada decisão

### TASK-006 | P1 | L | Proposta de arquitetura de alto nível
- **Output:** `research/architecture-overview.md` + ADRs para padrões arquiteturais
- **Critério de aceite:** a arquitetura pode ser desenhada como diagrama de caixas e setas somente lendo o texto; todos os componentes e suas responsabilidades estão descritos; os fluxos de dados principais estão documentados
- **Dependências:** TASK-004, TASK-005
- **Template a usar:** `templates/ADR.md` para padrões arquiteturais

### TASK-007 | P1 | M | Proposta de modelo de dados
- **Output:** `research/data-model.md`
- **Critério de aceite:** todas as entidades do produto têm representação no modelo; relacionamentos documentados; não é código SQL/ORM, é uma proposta conceitual em markdown
- **Dependências:** TASK-001, TASK-006
- **Aviso:** sem código SQL ou de migração

### TASK-008 | P1 | M | Mapeamento de integrações e dependências externas
- **Output:** `research/integrations.md`
- **Critério de aceite:** cada integração tem: nome do serviço, propósito, nível de risco, estratégia de fallback, dependência crítica ou não
- **Dependências:** TASK-006

### TASK-009 | P1 | M | Validar visão do produto com evidências
- **Output:** `research/validation-evidence.md` (usando template EVIDENCE)
- **Critério de aceite:** mínimo 5 evidências documentadas (reviews de competidores, fóruns, relatórios de mercado), cada uma com nível de confiança declarado; a visão do produto é confirmada ou ajustada com base nas evidências
- **Dependências:** TASK-001, TASK-002

### TASK-010 | P1 | M | Validar arquitetura contra os NFRs
- **Output:** `research/architecture-validation.md`
- **Critério de aceite:** cada NFR de TASK-004 é abordado; onde a arquitetura atende, onde potencialmente falha, e qual é o plano de mitigação
- **Dependências:** TASK-004, TASK-006

---

## P2 — Normal

### TASK-011 | P2 | M | Rascunhar backlog inicial do Squad 1
- **Output:** adições a `workboard/BACKLOG.md` com label `squad-1`
- **Critério de aceite:** mínimo 20 tasks para o Squad 1, cada uma com tamanho estimado e mapa de dependências
- **Dependências:** TASK-006, TASK-007, TASK-008

### TASK-012 | P2 | S | Montar pacote de intake do Squad 1
- **Output:** `squads/squad-1/INTAKE_PACKAGE.md` completo (sem `{{PLACEHOLDER}}` remanescentes)
- **Critério de aceite:** todas as seções do intake package preenchidas; revisado pelo Program Lead
- **Dependências:** TASK-005 a TASK-010 completos

### TASK-013 | P2 | S | Revisão de saída do Squad 0
- **Output:** `squads/squad-0/EXIT_CHECKLIST.md` completamente assinado
- **Critério de aceite:** 100% dos itens do checklist verificados e assinados com data e ID do agente
- **Dependências:** TASK-012 completo, nenhuma issue `blocking-exit` aberta

### TASK-014 | P2 | S | Criar glossário do domínio
- **Output:** `research/glossary.md`
- **Critério de aceite:** mínimo 20 termos definidos; glossário incluído no pacote de intake do Squad 1
- **Dependências:** TASK-001, TASK-002

---

## Backlog do Squad 1 (a ser preenchido pelo Squad 0 via TASK-011)

*Esta seção será preenchida quando TASK-011 for concluída.*
