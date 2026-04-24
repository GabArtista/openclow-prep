# Quality Criteria — OpenClow MVP

> **Status:** Post-TASK-033 / MVP baseline established
> **Updated:** 2026-04-24

## Purpose

Estes critérios existem para evitar avaliação subjetiva do MVP. O sistema só deve ser considerado utilizável quando atender critérios observáveis de execução, segurança, integração e evolução.

## Core Product Criteria

### 1. Usabilidade Operacional

- Um usuário deve conseguir criar, editar, selecionar e executar um squad sem mexer manualmente em múltiplos arquivos do sistema.
- O primeiro output útil de uma execução deve aparecer em tempo operacional aceitável para o fluxo escolhido.
- Cada run deve expor estado atual, próximo passo e artefatos produzidos.

### 2. Checkpoints e Controle Humano

- Todo checkpoint precisa ser representado formalmente no pipeline.
- Rejeição de checkpoint precisa reenfileirar a etapa correta.
- Nenhuma publicação ou promoção de capacidade pode ocorrer sem aprovação explícita.

### 3. Persistência e Reprodutibilidade

- O sistema precisa persistir estado do run, memória e artefatos.
- Um run interrompido precisa ser retomável ou claramente reiniciável.
- O histórico de execuções deve preservar contexto suficiente para auditoria.

### 4. Integrações Reais

- As integrações do baseline precisam funcionar com contratos estáveis.
- Cada integração deve ter input/output explícitos, erro observável e comportamento de falha seguro.
- O sistema deve operar com as integrações reais já provadas na Doze antes de adicionar novas.

### 5. Segurança e Governança

- `skills`, `tools` e `pipelines` precisam operar sob allowlist explícita.
- Segredos devem ficar fora do repositório e fora de outputs persistidos.
- A ampliação de permissões deve ter checkpoint humano.
- O sistema precisa distinguir staging, draft e ativo.

### 6. Observabilidade

- Cada run precisa emitir logs estruturados por step.
- Deve existir visibilidade de status por squad, step e agent.
- Falhas precisam ser localizáveis sem ler o sistema inteiro.

### 7. Evolução do Sistema

- O meta-squad interno precisa conseguir criar capacidades novas em modo rascunho.
- Toda nova capacidade precisa passar por validação estática e eval comportamental.
- Gerar capacidade não implica publicá-la.

## Baseline Acceptance Gates

O baseline do MVP só é aceitável se, no mínimo:

1. executar um squad equivalente ao `marketing-dozecrew`
2. executar um squad equivalente ao `inteligencia-dozecrew`
3. suportar checkpoints humanos formais
4. persistir memória, estado e outputs
5. operar com `GA4`, `WooCommerce`, `Meta Insights`, `Hotjar`, `Apify`, `Canva`, `Instagram Publisher` e `Blotato` conforme o recorte final
6. permitir que o meta-squad proponha e valide novas capacidades sem publicação automática

## Non-Negotiable Failure Conditions

O MVP falha se:

- o dashboard for a única fonte de verdade do estado
- a execução depender exclusivamente da IDE para enforcement
- credenciais precisarem ser colocadas em arquivos versionados
- skills novas puderem se autopromover sem revisão humana
- as integrações reais da Doze não forem suportadas no recorte do baseline

## Measurement Guidance

Cada critério acima deve ser traduzido em testes ou validações futuras:

- testes de run e retomada
- validação de checkpoints
- smoke tests de integrações
- evals do meta-squad
- verificação de observabilidade e logs
- testes de política e permissionamento
