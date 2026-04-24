<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Durable Runtime Analysis

> **Status:** Draft for TASK-028 prep
> **Focus:** durabilidade operacional, restart safety e checkpoint recovery

## Purpose

Este documento descreve o que o runtime precisa garantir para que runs não dependam de memória efêmera do processo.

## Current model

O runtime local já tem persistência simples e fila durável de desenvolvimento.
Para o próximo estágio, isso precisa evoluir para um modelo server-side com:

- estado persistido por run e por capability
- recuperação de checkpoint após restart
- idempotência em retries
- trilha de auditoria por transição relevante

## Required durability properties

1. Um run interrompido deve poder continuar a partir do último checkpoint seguro.
2. Uma aprovação humana precisa ficar registrada e auditável.
3. Um rollback de capability precisa ser uma operação própria, não um efeito colateral.
4. A fila não pode perder steps agendados ao reiniciar o worker.
5. Outputs parciais devem sobreviver a restart.

## Operational implications

- O orchestrator precisa conhecer o estado de cada step.
- O worker precisa publicar eventos de começo, progresso, checkpoint e término.
- O runtime precisa persistir tanto o payload quanto a decisão humana associada.
- O dashboard precisa mostrar claramente o ponto de retomada.

## Restart model

### Safe restart

- runs `waiting_checkpoint`
- runs `queued`
- runs `running` com step idempotente

### Requires extra guardrails

- runs que já chamaram integrações externas write-capable
- runs que estão em promoção ou rollback
- runs com outputs prontos para publicação

## Recommendations

- persistir sempre antes de cada transição crítica
- gerar event IDs estáveis
- evitar dependência de memória de processo para decisão de controle
- tratar qualquer integração write-capable como operação reversível quando possível
