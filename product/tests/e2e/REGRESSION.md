<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# E2E Regression Contract

> **Status:** active
> **Purpose:** registrar a suíte automatizada que protege o fluxo staging-first do produto

## Canonical command

```bash
npm --prefix product run regression
```

## Coverage

- marketing weekly run
- intelligence monthly run
- checkpoint approve
- checkpoint reject
- promotion approval
- rollback approval
- restart recovery
- dashboard smoke

## Pass criteria

- todos os cenários executam sem intervenção manual além dos checkpoints já previstos
- nenhum run perde estado entre restart da API
- artefatos, histórico e auditoria permanecem consultáveis após a execução
- o dashboard abre e injeta a base da API corretamente

## Notes

- `e2e` continua como alias compatível
- qualquer evolução do produto deve manter este comando como regressão mínima
