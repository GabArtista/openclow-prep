# Opensquad Fit Assessment

> **Status:** Draft for Plan 0 closure
> **Updated:** 2026-04-23
> **Studied source:** local repo `/home/acer/Documentos/Projetos/mkt-ag/mkt-ag-dozecrew/opensquad`

## Executive Summary

`opensquad` já é um sistema interno real da Doze para marketing e BI assistidos por IA. Ele deve ser tratado no programa como benchmark funcional e fonte de portabilidade prioritária.

O `OpenClow` não deve ignorá-lo nem copiá-lo cegamente.

## What Opensquad Already Proves

- criação e execução de squads multiagente
- pipelines com checkpoints humanos
- memória global e por squad
- modelagem explícita de agents, steps e outputs
- dashboard consumindo estado em tempo real
- skills reais para integrações da Doze
- uso operacional real em squads de marketing e inteligência

## Day-1 Patterns Worth Porting

- `squad.yaml` como contrato do squad
- `pipeline.yaml` como contrato do fluxo
- distinção `inline` vs `subagent`
- checkpoints explícitos com `on_reject`
- memória por squad
- `state.json` e histórico de runs
- skills pequenas e focadas
- dashboard como consumidor de estado

## Limits Found

- enforcement real de permissões ainda depende da IDE host
- segurança de credenciais não está no padrão necessário para o OpenClow
- evidência de operação é mais forte para alguns squads do que para todos
- a camada de governança e promoção de capacidades ainda é leve

## Recommendation

Classificar o `opensquad` como:

- **benchmark obrigatório**
- **fonte de requisitos day-1**
- **fonte de portabilidade de squads, skills, templates e fluxos**

Não classificá-lo, nesta fase, como:

- control plane final do OpenClow
- enforcement final de segurança
- arquitetura final do servidor

## Implication for the Program

O programa deve decidir explicitamente:

1. o que será portado do `opensquad`
2. o que será reescrito com enforcement próprio
3. o que ficará só como referência histórica

Sem essa decisão, o time corre risco de reinventar o que já funciona ou de herdar limites indevidos.
