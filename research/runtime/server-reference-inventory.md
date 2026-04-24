# Server Reference Inventory

> **Status:** Post-TASK-033 / MVP baseline established
> **Updated:** 2026-04-24
> **Host:** `root@78.109.16.236`

## Summary

O servidor atual é suficiente para um MVP multiagente server-first, desde que o recorte inicial respeite a ausência de GPU confirmada e trate jobs pesados como assíncronos.

## Current Capacity

- `16 vCPU`
- `62 GiB RAM`
- `567 GiB` livres
- sem GPU NVIDIA detectada

## Active Platform Components

- `Docker`
- `k3s`
- `Postgres`
- `Redis`
- `Grafana`
- `Loki`
- `Prometheus`
- `MinIO`
- `ArgoCD`
- `Portainer`
- `GitHub Actions Runner`
- `Ollama API Gateway`

## Local Model Inventory

- `gemma4:31b-it-q4_K_M`
- `qwen2.5-coder:14b`
- `qwen2.5-coder:32b`
- `qwen2.5:14b`

## Architectural Implications

### Supports Baseline

- estratégia
- pesquisa
- BI
- copy
- pipelines com APIs
- checkpoints humanos
- meta-squad de definição e validação

### Needs Care

- criativos muito pesados
- edição de vídeo
- alta concorrência com modelos grandes
- workloads multimodais locais intensivos

## Recommendation

Usar este servidor como ambiente oficial de referência do MVP e assumir, por padrão:

- runtime local-first
- filas explícitas
- jobs pesados assíncronos
- observabilidade integrada desde o início
