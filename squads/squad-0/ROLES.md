# ROLES.md — Papéis do Squad 0

> **Nota:** Estes são papéis funcionais, não pessoas físicas.
> Um único agente IA pode assumir múltiplos papéis em uma sessão.
> Declare papéis ativos e task em `handoffs/ACTIVE.md` ao iniciar.

---

## Program Lead

**Responsabilidades:**
- Aprovar mudanças de escopo, prioridades e handoff final
- Resolver conflitos de bastão e divergências críticas
- Revisar o `EXIT_CHECKLIST.md` e assinar a saída do Squad 0

**Entregáveis principais:**
- Aprovação explícita do handoff para o Squad 1
- Priorização final em caso de conflito

**Escopo:** governança humana do programa.

**Limites:** não delegável a agente IA.

**Quando deve ser acionado:** mudança de escopo, impasse entre caminhos técnicos, bloqueio de saída, aprovação final.

---

## Research Lead / Research Librarian

**Responsabilidades:**
- Orquestrar o plano de pesquisa do Squad 0 e garantir rastreabilidade das evidências
- Definir perguntas de pesquisa, critérios de confiança e lacunas a fechar
- Manter o índice de fontes, evidências e artefatos produzidos

**Entregáveis principais:**
- plano de pesquisa consolidado em `research/README.md`
- índice de evidências e mapa de lacunas críticas

**Escopo:** coordenação da pesquisa profunda e curadoria de fontes.

**Limites:** não decide arquitetura final sozinho; não substitui analistas especializados.

**Quando deve ser acionado:** no início de trilhas amplas, ao reorganizar pesquisa, ou quando há excesso de fontes sem síntese confiável.

---

## Workflow Field Researcher

**Responsabilidades:**
- estudar como operadores, times pequenos e comunidades técnicas estão usando `Codex`, `Claude Code`, `OpenClaw` e ferramentas adjacentes em workflows reais de criação, edição e automação
- mapear combinações de ferramentas, padrões de orquestração, formas de QA, hooks, comandos, MCPs, worktrees e camadas de renderização usadas na prática
- separar sinal real de uso recorrente de hype, showcases promocionais e exemplos não reprodutíveis
- traduzir padrões de campo em restrições, oportunidades e anti-patterns aplicáveis ao OpenClow

**Entregáveis principais:**
- relatórios em `research/horizon/` e `research/ecosystem-fit/`
- sínteses de toolchains reais, failure modes e padrões operacionais
- recomendações de stack mínima por perfil de máquina e por tipo de workflow criativo

**Escopo:** práticas correntes de mercado e de comunidade para workflows agentic de produção criativa, com foco em uso real e reproduzível.

**Limites:** não transforma anedotas em decisão arquitetural sozinho; não substitui análise upstream, de segurança ou de custo; não confunde showcase de marketing com evidência operacional.

**Quando deve ser acionado:** sempre que o programa precisar desenhar ou revisar workflows criativos, de vídeo, de QA ou de automação operacional baseados em agentes e tooling externo.

---

## Upstream Community Analyst

**Responsabilidades:**
- Avaliar saúde das comunidades upstream das tecnologias candidatas
- Mapear mantenedores, ritmo de releases, governança, issues críticas, responsividade e sinais de abandono
- Diferenciar hype de manutenção sustentável

**Entregáveis principais:**
- relatórios em `research/upstream-health/`
- risco upstream incorporado em ADRs e backlog

**Escopo:** comunidades open source, cadência de manutenção, sinais reais de adoção técnica.

**Limites:** não faz benchmark de performance sozinho; não decide arquitetura por popularidade.

**Quando deve ser acionado:** sempre que uma tecnologia candidata entrar em avaliação séria ou quando houver dúvida sobre durabilidade upstream.

---

## Ecosystem and Adaptation Analyst

**Responsabilidades:**
- Avaliar quão bem o ecossistema de cada tecnologia se adapta ao contexto OpenClow
- Mapear extensibilidade, interoperabilidade, plugins, dependências, fricções de integração e custo de adaptação
- Documentar gaps entre capacidade nativa e necessidades do programa

**Entregáveis principais:**
- estudos em `research/ecosystem-fit/`
- matrizes de adaptação para OpenClaw, Paperclip, MCP e adjacentes

**Escopo:** encaixe técnico-operacional no contexto do programa.

**Limites:** não substitui análise de segurança, custo ou runtime.

**Quando deve ser acionado:** após definição preliminar de escopo e sempre que uma tecnologia parecer promissora, mas exigir adaptação.

---

## Horizon Scanner

**Responsabilidades:**
- Monitorar mudanças de categoria, novos runtimes, protocolos, práticas e ferramentas que possam alterar o programa
- Identificar sinais iniciais com potencial de impacto em prazo curto ou médio
- Registrar oportunidades e ameaças emergentes sem diluir o foco do backlog principal

**Entregáveis principais:**
- relatórios em `research/horizon/`
- alertas de impacto para backlog, ADRs e intake

**Escopo:** horizon scan técnico e de ecossistema.

**Limites:** não reabre backlog por curiosidade; só escala sinais com impacto plausível.

**Quando deve ser acionado:** no início da etapa, antes de decisões major e sempre que o mercado técnico mudar de forma relevante.

---

## Category and Market Reality Analyst

**Responsabilidades:**
- Descrever a realidade da categoria de engenharia assistida por IA sem cair em discovery de produto genérico
- Mapear padrões maduros de especificação, testes, observabilidade, avaliação, governança e budget control
- Separar discurso de mercado de requisitos operacionais reais

**Entregáveis principais:**
- sínteses em `research/horizon/`
- base de evidências para critérios de qualidade e arquitetura

**Escopo:** realidade técnica e operacional da categoria, não segmentação comercial clássica.

**Limites:** não conduz pesquisa de mercado tradicional focada em TAM/SAM/SOM.

**Quando deve ser acionado:** ao calibrar critérios de qualidade, priorização e viabilidade do programa.

---

## Program Architect

**Responsabilidades:**
- Consolidar arquitetura alvo, fronteiras do sistema e ADRs major
- Traduzir evidências de ecossistema e operação em decisões arquiteturais defensáveis
- Preparar a definição formal do Squad 1 construtor

**Entregáveis principais:**
- documentos em `research/architecture/`
- ADRs em `decisions/`
- seções arquiteturais do `INTAKE_PACKAGE.md`

**Escopo:** arquitetura de referência, trade-offs e pacote de construção.

**Limites:** não implementa runtime; não ignora riscos de custo, segurança e operação.

**Quando deve ser acionado:** após evidências mínimas sobre escopo, restrições e candidatos, e novamente na consolidação do pacote do Squad 1.

---

## Durable Runtime Analyst

**Responsabilidades:**
- Avaliar execução durável, retomável, recovery, filas, checkpoints e control plane multiagente
- Mapear failure modes, reentrância, replay, isolamento e requisitos de durabilidade
- Conectar runtime às necessidades reais do OpenClow

**Entregáveis principais:**
- análises em `research/runtime/`
- critérios de runtime incorporados à arquitetura alvo

**Escopo:** durabilidade operacional e control plane de execução.

**Limites:** não cobre observabilidade profunda, custo ou segurança sozinho.

**Quando deve ser acionado:** sempre que candidatos incluírem execução de agentes, workflows duráveis ou retomada operacional.

---

## Cost and Throughput Analyst

**Responsabilidades:**
- Estimar custo previsível, throughput, gargalos e limites de escala operacional
- Mapear budgets, envelopes de custo e trade-offs entre desempenho e previsibilidade
- Identificar custos escondidos de integração, manutenção e observabilidade

**Entregáveis principais:**
- análises em `research/cost/`
- recomendações de budget guardrails para o Squad 1

**Escopo:** custo operacional e capacidade sustentável.

**Limites:** não define arquitetura sozinho; não assume benchmarks sem contexto.

**Quando deve ser acionado:** antes de consolidar arquitetura alvo, backlog do Squad 1 e critérios de saída.

---

## Observability and Evals Analyst

**Responsabilidades:**
- Definir requisitos de instrumentação, tracing, métricas, logs, auditoria e avaliação contínua
- Mapear como medir qualidade, regressão, eficácia e comportamento de agentes
- Garantir que observabilidade e evals entrem como parte da arquitetura, não como pós-trabalho

**Entregáveis principais:**
- documentos em `research/observability/`
- critérios de operação e avaliação no intake do Squad 1

**Escopo:** observabilidade, measurement, evals e feedback loops.

**Limites:** não substitui arquitetura, segurança ou custo.

**Quando deve ser acionado:** assim que existir hipótese de arquitetura e sempre antes do pacote final do Squad 1.

---

## Security and Agency Boundaries Analyst

**Responsabilidades:**
- Avaliar prompt injection, excessive agency, supply chain, isolamento, permissões e blast radius
- Mapear controles de segurança e fronteiras de ação para agentes e integrações
- Documentar riscos de credenciais, execução, dependências e governança

**Entregáveis principais:**
- documentos em `research/security/`
- requisitos de controles e mitigação para ADRs e intake

**Escopo:** segurança técnica, agency boundaries e supply chain.

**Limites:** não aprova risco residual sozinho; não substitui análise de compliance externa.

**Quando deve ser acionado:** para qualquer tecnologia com execução de ferramentas, integrações, credenciais, código gerado ou ação autônoma.

---

## Frontier Research and Lab Analyst

**Responsabilidades:**
- Rastrear pesquisadores, cientistas, laboratórios de tecnologia, centros de inovação e grupos de pesquisa aplicada quando isso puder alterar o estado da arte relevante
- Identificar métodos, frameworks ou linhas de trabalho que ainda não se manifestaram plenamente em comunidades open source, mas podem impactar o programa
- Traduzir sinais laboratoriais em implicações práticas para backlog e arquitetura

**Entregáveis principais:**
- relatórios em `research/frontier/`
- alertas de impacto e notas de decisão para o Squad 0

**Escopo:** radar de fronteira científica e laboratorial com relevância operacional.

**Limites:** não amplia escopo por novidade acadêmica sem impacto plausível; não substitui avaliação upstream.

**Quando deve ser acionado:** quando surgirem técnicas emergentes, papers aplicados, labs influentes ou sinais de mudança de estado da arte.

---

## Documentation Agent

**Responsabilidades:**
- Garantir que documentos sejam autocontidos, consistentes e consumíveis por outra IA
- Manter `squads/squad-1/INTAKE_PACKAGE.md`, índices de pesquisa e README das trilhas
- Normalizar nomenclatura, links, critérios e referências cruzadas

**Entregáveis principais:**
- `squads/squad-1/INTAKE_PACKAGE.md`
- `research/README.md`
- revisão editorial de artefatos do Squad 0

**Escopo:** qualidade documental e integridade do pacote final.

**Limites:** não inventa conteúdo técnico ausente; depende dos analistas especialistas.

**Quando deve ser acionado:** ao consolidar entregas parciais, preparar handoffs e fechar a etapa.

---

## Backlog Manager

**Responsabilidades:**
- Manter `workboard/BACKLOG.md` e `workboard/IN_PROGRESS.md` aderentes à missão real da Etapa 1
- Repriorizar tasks quando surgirem novos riscos, dependências ou evidências
- Garantir que backlog reflita preparação do Squad 1, não discovery genérico

**Entregáveis principais:**
- workboard atualizado
- indicação de próxima task crítica e próximos papéis recomendados

**Escopo:** governança operacional do backlog e fluxo de trabalho.

**Limites:** não muda escopo do programa sem sinalizar o Program Lead.

**Quando deve ser acionado:** a cada replanejamento, handoff ou descoberta que altere prioridades.

---

## Como Declarar seus Papéis

Ao iniciar uma sessão, atualize `handoffs/ACTIVE.md` com:

```
Papéis ativos nesta sessão: [Role A | Role B]
Task sendo trabalhada: TASK-XXX — [título]
```

Isso permite que o próximo agente entenda quem estava atuando em qual frente.
