# Environment Constraints — OpenClow MVP

> **Status:** Post-TASK-033 / MVP baseline established
> **Updated:** 2026-04-24
> **Sources:** `context/POLICY.md`, `opensquad` local repo, live server audit on `root@78.109.16.236`

## Reference Environment

O ambiente de referência do MVP é o servidor `root@78.109.16.236`.

### Current Host Facts

- `16 vCPU`
- `62 GiB RAM`
- `567 GiB` livres em disco
- `Docker` ativo
- `k3s` ativo
- `Postgres`, `Redis`, `Grafana`, `Loki`, `Prometheus`, `MinIO`, `Portainer`, `ArgoCD`
- `Ollama API Gateway` ativo
- `GitHub Actions Runner` ativo
- sem GPU NVIDIA confirmada

### Current Local Models

- `gemma4:31b-it-q4_K_M`
- `qwen2.5-coder:14b`
- `qwen2.5-coder:32b`
- `qwen2.5:14b`

## Hard Constraints

### Runtime

- O MVP precisa funcionar sem depender de GPU dedicada.
- Jobs pesados devem ser assíncronos e tolerantes a maior latência.
- Vídeo e geração visual intensiva não podem ser pressupostos como capacidades locais baratas no baseline.

### Security

- Credenciais não podem morar no repositório de produto nem em docs versionadas.
- O padrão visto em partes do `opensquad` com instruções explícitas de credenciais não é aceitável para o `OpenClow`.
- Skills e tools precisam de allowlist explícita por capacidade.
- Checkpoints humanos são obrigatórios para ações destrutivas, publicação e promoção de capacidades.

### Operations

- O sistema não pode depender de enforcement da IDE host para funcionar corretamente.
- Estado e artefatos precisam sobreviver a reinícios e falhas parciais.
- O dashboard deve consumir estado; não deve ser o único lugar onde o estado existe.
- O sistema precisa conviver com outros workloads já existentes no cluster.

### Product Fit

- O MVP precisa suportar workflows reais da Doze, não um caso genérico fictício.
- Integrações já usadas pela Doze têm prioridade sobre integrações novas.
- O design precisa suportar squads equivalentes aos de marketing e BI já existentes no `opensquad`.

## Integration Constraints

As integrações do baseline devem ser escolhidas a partir do que já está provado localmente:

- `GA4`
- `WooCommerce`
- `Meta Insights`
- `Hotjar`
- `Apify`
- `Canva`
- `Instagram Publisher`
- `Blotato`

Essas integrações exigem:

- storage seguro de segredos
- política de rotação e vinculação de credenciais
- contratos estáveis de input/output
- ambiente de staging ou dry-run quando aplicável

## Architectural Constraints

- O sistema precisa suportar `inline` e `subagent` como modos explícitos de execução.
- Pipelines precisam ter checkpoints como objetos formais.
- `skills`, `squads`, `pipelines` e `tools` precisam ser versionáveis.
- O meta-squad interno deve operar em staging por padrão.
- Publicar ou ampliar permissões deve exigir aprovação humana.

## Organizational Constraints

- O `openclow-prep` ainda proíbe código de produto; portanto, nesta fase só entram artefatos de decisão.
- O backlog oficial ainda não formalizou `opensquad`, servidor e meta-squad; isso deve ser resolvido no Plano 1.
- O time precisa conseguir operar com Claude, Codex e outros agentes sem quebrar o protocolo de bastão.

## Baseline vs Later

### Baseline Required

- squads de marketing e BI equivalentes aos já usados na Doze
- dashboard básico
- orquestração com checkpoints
- memória persistente
- integrações do baseline
- meta-squad para criar e revisar capacidades

### Defer to Later

- serving multimodal pesado local
- escala alta de concorrência
- autonomia sem aprovação
- publicação irrestrita multi-canal
- marketplace de capacidades para terceiros

## Open Risks Still Pending

- GPU não confirmada
- política final de segredos ainda não desenhada
- envelope de concorrência aceitável ainda não medido
- estratégia de vídeo no baseline ainda indefinida
- papel exato de `OpenClaw` e `Paperclip` ainda não decidido
