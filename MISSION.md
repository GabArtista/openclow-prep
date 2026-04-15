# MISSION.md — OpenClow Program

> **Version:** 2.0
> **Updated:** 2026-04-15
> **Phase:** Etapa 1 — Squad 0 ativo

---

## Missão do Programa

O OpenClow será construído pelo Squad 1.
Antes disso, a **Etapa 1 / Squad 0** existe para reduzir surpresa, retrabalho e risco por meio de pesquisa profunda, validação técnica e evidência operacional.

**Missão do Squad 0:**
> Produzir um pacote técnico-operacional validado, rastreável e altamente previsível para que o Squad 1 construa o OpenClow sem redescobrir ecossistema, reavaliar restrições críticas ou improvisar decisões arquiteturais e operacionais.

O Squad 0 não é um time de product discovery clássico.
Seu foco é:
- esclarecer o escopo exato do programa e seus limites
- avaliar a viabilidade real das tecnologias candidatas
- documentar arquitetura, runtime, interoperabilidade, observabilidade, segurança, custo e governança
- preparar um Squad 1 construtor com missão, backlog inicial e critérios claros

---

## Definição de "Done" para o Squad 0

O Squad 0 está concluído quando **todos** os itens abaixo estiverem assinados:

1. O escopo do programa, seus não-objetivos e as restrições reais do ambiente estão documentados
2. OpenClaw, Paperclip e o ecossistema MCP foram avaliados com profundidade suficiente para decisão defensável
3. A saúde upstream, sinais reais de adoção, durabilidade de manutenção e adaptabilidade ao contexto OpenClow estão documentados
4. Runtime durável e retomável, control plane multiagente, observabilidade, evals, segurança, agency boundaries, custo e throughput estão mapeados com trade-offs
5. A arquitetura alvo e os critérios de qualidade foram consolidados com ADRs para decisões major
6. O radar de horizon scan e, quando relevante, de cientistas, pesquisadores e laboratórios foi incorporado ao pacote de evidências
7. Os riscos técnicos, operacionais, de supply chain, de governança e de custo estão registrados com mitigação
8. A definição formal do Squad 1 construtor está pronta, incluindo missão, responsabilidades e backlog inicial
9. O pacote de intake do Squad 1 (`squads/squad-1/INTAKE_PACKAGE.md`) está completo
10. O checklist de saída do Squad 0 (`squads/squad-0/EXIT_CHECKLIST.md`) está 100% assinado
11. Nenhuma issue aberta com label `blocking-exit` existe no repositório

---

## Fora de Escopo para o Squad 0

O Squad 0 **não deve**:

- Escrever código de produto (UI, backend, runtime, banco de dados, migrations, Dockerfile de produto)
- Fazer protótipos do OpenClow ou iniciar implementação do sistema final
- Assumir que adoção de comunidade equivale a viabilidade operacional sem evidência adicional
- Tomar decisões arquiteturais sem criar um ADR correspondente em `decisions/`
- Fazer deploy de qualquer serviço
- Criar contas em serviços externos sem aprovação do Program Lead
- Comprometer credenciais ou segredos em qualquer branch
- Iniciar trabalho do Squad 1 antecipadamente

---

## Critérios de Sucesso (perspectiva do Squad 1)

Após receber o handoff do Squad 0, o Squad 1 deve ser capaz de dizer:

- "Sei qual sistema preciso construir, em qual ambiente e com quais limites"
- "Entendo por que OpenClaw, Paperclip, MCP e alternativas foram avaliados desse jeito"
- "Conheço os riscos upstream, operacionais, de segurança e de custo antes de começar"
- "Tenho uma arquitetura alvo, critérios de qualidade e ADRs suficientes para iniciar sem redescoberta"
- "Recebi um pacote de intake com backlog inicial, papéis sugeridos e perguntas abertas priorizadas"

---

## Referências

- Checklist de saída do Squad 0: `squads/squad-0/EXIT_CHECKLIST.md`
- Papéis do Squad 0: `squads/squad-0/ROLES.md`
- Pacote de intake do Squad 1: `squads/squad-1/INTAKE_PACKAGE.md`
- Backlog do programa: `workboard/BACKLOG.md`
