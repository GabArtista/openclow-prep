# Storage

Camada de persistência durável do MVP.

Objetivos:

- gravar estado transacional com escrita atômica
- manter a fila durável separada do estado principal
- persistir artefatos de run/step em disco
- preparar o contrato para mapeamento futuro em `Postgres`, `Redis` e `MinIO`

Arquivos gerados pelo backend local:

- `runtime-state.json`
- `queue.json`
- `artifacts.json`
- `artifacts/`

Essa camada existe para o MVP executável. A próxima etapa do Squad 1 pode trocar os backends sem alterar a semântica do control plane.
