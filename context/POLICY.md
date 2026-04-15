# POLICY.md — Política de Contexto e Acesso

> **Version:** 1.0
> **Scope:** Todos os agentes IA operando neste repositório
> **Última atualização:** 2026-04-14

---

## Propósito

Este documento define quais sistemas externos os agentes IA podem usar, como podem usá-los, e o que está absolutamente proibido.

Todo agente deve ler este documento antes de acessar qualquer sistema externo.

---

## 1. GitHub

### Permitido
- Ler issues, PRs, comentários, labels e milestones do repositório `GabArtista/openclow-prep`
- Criar issues usando os templates em `.github/ISSUE_TEMPLATE/`
- Criar PRs usando o template em `.github/PULL_REQUEST_TEMPLATE.md`
- Comentar em issues e PRs
- Criar e fazer push de branches seguindo a convenção `task/<n>-<slug>`, `decision/<n>-<slug>`, `research/<n>-<slug>`
- Fazer merge de PRs após revisão explícita

### Proibido
- Push direto para `main` (sempre usar PR)
- Deletar branches sem aprovação do Program Lead
- Fechar issues sem resolução documentada
- Criar webhooks, GitHub Apps, ou integrações sem aprovação
- Acessar outros repositórios além de `GabArtista/openclow-prep`

---

## 2. Obsidian

### Contexto
O Obsidian pode ser usado como ferramenta de rascunho e curadoria pessoal pelo Program Lead.

### Política
- O Obsidian é ferramenta de apoio pessoal, **não é fonte de verdade**
- Toda nota relevante gerada no Obsidian deve ser commitada no repositório para ser considerada oficial
- Agentes IA não têm acesso direto ao vault do Obsidian
- Se um agente receber conteúdo proveniente do Obsidian, deve assumir que é um rascunho até que seja commitado no repo

### Proibido
- Tratar notas do Obsidian como documentação oficial sem commit no repositório
- Sincronizar automaticamente Obsidian com o repositório sem revisão humana

---

## 3. Internet / Fontes Externas

### Permitido
- Ler documentação pública de tecnologias (docs oficiais, RFCs, especificações)
- Ler papers acadêmicos públicos
- Ler posts de blog técnicos públicos
- Ler benchmarks e relatórios de performance públicos
- Consultar repositórios open-source públicos para referência

### Proibido
- Criar contas em serviços externos
- Contratar ou assinar qualquer serviço
- Fazer POST para APIs externas (exceto GitHub, conforme seção 1)
- Fazer scraping de sites que proíbem isso nos seus `robots.txt` ou ToS
- Compartilhar qualquer dado do repositório com serviços externos não autorizados

### Como Citar Fontes Externas
Toda informação obtida externamente deve ser documentada com:
- URL ou referência bibliográfica
- Data de acesso
- Trecho relevante citado (não apenas um link)
- Nível de confiança (high/medium/low)

Use o template `templates/EVIDENCE.md` para isso.

---

## 4. Servidor / Ambiente Local

### Contexto
O repositório pode ser operado localmente (Linux, macOS) ou em ambiente CI (GitHub Actions).

### Permitido para agentes locais
- Operações git read-only (`git status`, `git log`, `git diff`)
- Operações git de escrita dentro das regras de branch (`git add`, `git commit`, `git push` para branches de trabalho)
- Leitura de arquivos do repositório
- Criação e edição de arquivos do repositório

### Proibido para agentes locais
- Instalar pacotes globais no sistema (`npm install -g`, `pip install --user`, `apt install`)
- Modificar configurações do sistema operacional
- Criar processos em background sem declaração explícita
- Acessar arquivos fora do diretório do repositório
- Executar código de produto em qualquer ambiente

### Ambiente CI (GitHub Actions)
- Apenas os jobs definidos em `.github/workflows/validate-structure.yml` são autorizados
- Nenhum secret deve ser adicionado ao CI sem aprovação do Program Lead
- O CI não deve fazer deploy de nenhum serviço

---

## 5. Credenciais

### Regra Absoluta
**Nenhuma credencial, token, chave de API, senha, ou segredo de qualquer tipo pode ser commitado neste repositório.**

Isso inclui:
- Tokens do GitHub
- Chaves de API (OpenAI, Anthropic, AWS, GCP, etc.)
- Senhas de banco de dados
- Certificados privados
- Variáveis de ambiente com valores sensíveis

### O que fazer se uma credencial for descoberta
1. **NÃO commitar**
2. Informar imediatamente o Program Lead
3. Se já foi commitada: considerar a credencial comprometida, revogar imediatamente, então remover do histórico git

### Referências a credenciais
Se um documento precisar referenciar que uma credencial existe, use o formato:
```
API_KEY=<ver-cofre-de-segredos>
```
Nunca o valor real.

---

## 6. Situações Não Cobertas por Esta Política

Se um agente encontrar uma situação não coberta por esta política:

1. **Pare** — não tome ação sem cobertura de política
2. Abra uma issue no GitHub com label `policy-gap`
3. Descreva a situação, o que estava tentando fazer, e qual regra falta
4. Aguarde resposta do Program Lead antes de prosseguir
5. Atualize `handoffs/ACTIVE.md` com o bloqueador

**Nunca assuma permissão. Na dúvida, pergunte.**
