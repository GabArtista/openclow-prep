# CHARTER.md — Charter do Squad 0

> **Version:** 2.0
> **Status:** Ativo
> **Atualizado em:** 2026-04-23
> **Encerramento previsto:** Quando `EXIT_CHECKLIST.md` estiver 100% assinado

---

## Missão do Squad 0

O Squad 0 existe para transformar incerteza ampla em um pacote de execução previsível.

Sua entrega final é um **pacote de intake técnico-operacional** (`squads/squad-1/INTAKE_PACKAGE.md`) que permite ao Squad 1 iniciar a construção do OpenClow sem:
- reestudar o ecossistema das tecnologias candidatas
- redescobrir restrições duras
- improvisar controles de segurança, observabilidade ou custo
- redefinir o desenho do time construtor

---

## Mandato

O Squad 0 está autorizado a:

- Definir o escopo exato do programa OpenClow, seus limites e critérios de sucesso
- Pesquisar profundamente tecnologias candidatas, comunidades upstream, interoperabilidade e durabilidade operacional
- Avaliar OpenClaw, Paperclip e o ecossistema MCP com foco em viabilidade real no nosso contexto
- Estudar sistemas internos já operacionais da Doze, em especial o `opensquad`, para decidir o que portar, adaptar, reescrever ou descartar
- Inventariar o servidor de referência, integrações reais e limites operacionais antes de qualquer build de produto
- Produzir documentos sobre arquitetura, runtime, observabilidade, evals, custo, throughput, segurança e agency boundaries
- Definir governança de capacidades do futuro produto, incluindo `skills`, `squads`, `pipelines`, `tools` e meta-squad de auto-construção
- Abrir e manter a área isolada `product/` como workspace de implementação controlada do OpenClow
- Rastrear sinais de horizonte técnico e, quando necessário, laboratórios, cientistas e grupos de pesquisa aplicada
- Criar e manter documentos em `research/`, ADRs em `decisions/`, prompts em `prompts/squad-0/` e artefatos de preparação do Squad 1
- Reorganizar backlog, handoffs e critérios de saída para refletir a etapa real do programa

---

## Restrições

O Squad 0 **não está autorizado** a:

- Escrever qualquer código de produto fora de `product/` (ver `AGENTS.md` Seção 6 para lista completa)
- Construir ou validar o sistema final sem ADRs, workboard e guardrails explícitos
- Assumir que descoberta de mercado substitui validação técnica e operacional
- Declarar uma decisão arquitetural como final sem ADR correspondente
- Modificar artefatos do Squad 1 depois do handoff final sem aprovação do Program Lead
- Contratar serviços externos, criar contas ou assinar planos
- Tocar produção sem staging/dry-run, checkpoint humano e aprovação explícita

---

## Duração

O Squad 0 está ativo desde o bootstrap (2026-04-14) até o momento em que:

1. Todos os itens de `EXIT_CHECKLIST.md` estiverem assinados
2. O Program Lead aprovar formalmente o handoff para o Squad 1
3. `handoffs/ACTIVE.md` for atualizado para refletir "Etapa 1 concluída / Squad 1 liberado"

---

## Composição

Ver `squads/squad-0/ROLES.md` para a descrição completa dos papéis.

O Squad 0 pode ser composto por:
- Agentes IA operando em papéis especializados de pesquisa, arquitetura, segurança, observabilidade, custo, backlog e documentação
- O Program Lead (humano) como aprovador final

O Squad 0 deve operar como uma célula de pesquisa profunda e validação operacional, não como um time genérico de discovery de produto.

---

## Autoridade de Decisão

| Tipo de Decisão | Quem decide | Registro obrigatório |
|---|---|---|
| Estrutura de documento e organização do repositório | Agente ativo | Commit message |
| Priorização do backlog do Squad 0 | Agente ativo + Backlog Manager | Atualização do workboard |
| Escolha de tecnologia, runtime ou interoperabilidade | Agente ativo + revisão | ADR obrigatório |
| Mudança no escopo do Squad 0 | Program Lead | Issue + ADR |
| Critério formal de saída do Squad 0 | Program Lead | Checklist assinado |
| Liberação do Squad 1 | Program Lead | Handoff + checklist assinado |

---

## Relacionamento com o Squad 1

O Squad 0 prepara o Squad 1.

- O Squad 0 entrega definição de escopo, arquitetura, riscos, limites e backlog inicial
- O Squad 1 recebe um pacote de execução, não uma folha em branco
- O Squad 1 pode revisar decisões do Squad 0 via novos ADRs, nunca editando ADRs já aceitos

---

## Critério de Sucesso do Squad 0

Ver `MISSION.md` para a definição completa.

Em resumo: o Squad 1 deve conseguir iniciar a construção do OpenClow com alto grau de previsibilidade técnica e operacional, e com baixa necessidade de pesquisa exploratória adicional.
