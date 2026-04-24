<!-- TEMPLATE: RUNBOOK | version: 1.0 | do not remove this line -->

# E2E Runbook

> **Status:** draft
> **Purpose:** orientar a execução manual ou automatizada dos cenários staging-first

## Sequence

1. seed capability and run fixtures
2. execute marketing scenario
3. execute intelligence scenario
4. approve and reject checkpoints
5. promote and rollback capability
6. restart services and verify recovery

## Verification points

- run status
- checkpoint status
- promotion status
- audit trail
- output availability

## Stop conditions

- missing contract alignment
- any write action without approval
- restart that loses persisted state
- unresolved audit gap
