# Skills Package

Responsável por:

- catalogar skills e tools do MVP
- modelar bindings de integração sem segredos no repo
- separar adapters `script`, `mcp` e `hybrid`
- concentrar a portabilidade day-1 do `opensquad`

O benchmark operacional atual da Doze já usa skills `mcp`, `script`, `python` e `hybrid`.
O bootstrap do OpenClow deve preservar esses modos de integração, mas mover enforcement, segredos e lifecycle para a camada controlada do produto.
