<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Scenario Matrix

> **Status:** contract
> **Purpose:** lista compacta dos cenários staging-first que a implementação precisa cobrir

| ID | Scenario | Preconditions | Steps | Expected result |
|---|---|---|---|---|
| E2E-01 | Marketing weekly run | capability `marketing-dozecrew` at least `staging` | start run, approve checkpoints, finish cycle | outputs and audit trail persistidos |
| E2E-02 | Intelligence monthly run | capability `inteligencia-dozecrew` at least `staging` | start run, gather data, finish report | relatório consultável e persistido |
| E2E-03 | Checkpoint reject | checkpoint pending | reject checkpoint | run returns to mapped step |
| E2E-04 | Promotion approval | capability promotion pending | approve promotion | capability transitions to target status |
| E2E-05 | Rollback approval | rollback pending | approve rollback | capability transitions back and audit is stored |
| E2E-06 | Restart recovery | run waiting_checkpoint | restart services | run state restored without losing checkpoint |
| E2E-07 | Creative image render | `creative-image` at least `staging` | start run, render previews, approve render gate | preview artifacts and manifest persistidos |

## Notes

- all scenarios are staging-first
- production validation is explicitly out of scope here
- write-capable integrations require explicit approval path
- `creative-image` is validated with dry-run artifacts only; no production publishing is involved
