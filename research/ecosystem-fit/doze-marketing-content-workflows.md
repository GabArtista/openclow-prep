<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Doze Marketing and Content Workflows

> **Status:** Draft for TASK-028 prep
> **Scope:** workflows de marketing e criação de conteúdo já usados pela Doze e mapeados a partir do `opensquad`
> **Non-goal:** expor credenciais, tokens, chaves ou segredos operacionais

## Purpose

Este documento consolida o funcionamento prático dos workflows de marketing e criação de conteúdo que precisam ser considerados no OpenClow.
Ele separa o que é fluxo operacional do que é dado sensível para que o desenvolvimento continue sem depender de memória informal.

## Workflow 1: `marketing-dozecrew`

### Intent

Fluxo semanal de marketing responsável por análise, pesquisa, estratégia, criação, revisão, publicação e avaliação.

### Shape

| Step | Responsibility | Output | Access required | Notes |
|---|---|---|---|---|
| Foco da semana | definir tema e prioridade semanal | briefing semanal | humano | checkpoint inicial |
| Análise de performance | ler sinais de GA4, Instagram, YouTube e Hotjar | relatório de performance | `GA4`, `Meta Insights`, `Hotjar` | subagent de analytics |
| Pesquisa de mercado | coletar referências, tendências e benchmarks | pesquisa de mercado | `web_search`, `web_fetch`, `Apify` | subagent de pesquisa |
| Criação de estratégia | consolidar direcionamento e ângulos | estratégia semanal | inputs internos | inline, sem segredo |
| Aprovação de estratégia | validar escopo e risco | checkpoint aprovado/rejeitado | humano | checkpoint obrigatório |
| Criação de conteúdo | produzir copy para feed, stories e posts estáticos | conteúdo semanal | estratégia aprovada | inline |
| Aprovação de conteúdo | validar tom, mensagem e coerência | checkpoint aprovado/rejeitado | humano | rollback para o passo anterior |
| Criação de design | transformar conteúdo em arte visual | design visual | `Canva`, `template-designer` | subagent criativo |
| Aprovação de design | validar layout e consistência visual | checkpoint aprovado/rejeitado | humano | rollback para o design |
| Revisão de qualidade | checar inconsistências e riscos | revisão de qualidade | conteúdo + design | inline |
| Aprovação de publicação | liberar ou barrar publicação | checkpoint aprovado/rejeitado | humano | checkpoint final antes de agendar |
| Agendamento/publicação | publicar ou programar publicações | agenda de publicação | `Instagram Publisher`, `Blotato` | `Blotato` é opcional |
| Avaliação do squad | analisar resultado do ciclo | avaliação do squad | dados do ciclo | subagent de fechamento |

### Integrations and access pattern

| Integration | Purpose | Access pattern | Environment rule |
|---|---|---|---|
| `GA4` | leitura de tráfego e conversão | read-only analytics | staging-first |
| `Meta Insights` | leitura de performance social | read-only insights | staging-first |
| `Hotjar` | comportamento e feedback visual | read-only analytics | staging-first |
| `Apify` | coleta e scraping de mercado | API key com escopo mínimo | staging-first, dry-run quando possível |
| `Canva` | produção visual | API/OAuth com escopo de criação | humano aprova antes de publicar |
| `Instagram Publisher` | publicação direta | token/app com escopo de postagem | nunca publicar sem checkpoint final |
| `Blotato` | agendamento multi-canal | opcional, escopo de agendamento | usar só quando estável |
| `web_search` / `web_fetch` | pesquisa pública | sem segredo | permitido em preparação |

## Workflow 2: `inteligencia-dozecrew`

### Intent

Fluxo mensal de BI para cruzar vendas, tráfego, social e comportamento e gerar insights acionáveis.

### Shape

| Step | Responsibility | Output | Access required | Notes |
|---|---|---|---|---|
| Definir briefing mensal | escolher foco de análise | briefing de BI | humano | checkpoint inicial |
| Coletar dados de e-commerce | puxar pedidos, categorias, produtos e receita | snapshot de loja | `WooCommerce` | leitura preferencial |
| Coletar dados de tráfego | puxar sessões, canais e conversão | snapshot de GA4 | `GA4` | leitura analítica |
| Coletar dados sociais | puxar alcance, engajamento e crescimento | snapshot social | `Meta Insights` | leitura analítica |
| Coletar sinais de comportamento | ler heatmaps, gravações e eventos | snapshot Hotjar | `Hotjar` | leitura analítica |
| Coletar mercado | complementar com web research | recorte de mercado | `Apify`, `web_search`, `web_fetch` | pesquisa estruturada |
| Cruzar dados | gerar correlações e hipóteses | matriz de insights | inputs do ciclo | inline |
| Narrar relatório | escrever relatório executivo | relatório BI final | inputs consolidados | inline |

### Integrations and access pattern

| Integration | Purpose | Access pattern | Environment rule |
|---|---|---|---|
| `WooCommerce` | vendas e catálogo | read-only, no write by default | staging-first |
| `GA4` | tráfego e conversão | read-only analytics | staging-first |
| `Meta Insights` | social e mídia | read-only insights | staging-first |
| `Hotjar` | comportamento de usuário | read-only analytics | staging-first |
| `Apify` | coleta externa | API key minimalista | staging-first |
| `web_search` / `web_fetch` | pesquisa pública | sem segredo | permitido |

## Secrets and credential handling

O OpenClow não deve armazenar credenciais no repo nem reproduzir valores sensíveis em documentação.

O que pode ser documentado:
- tipo de credencial exigida
- escopo mínimo
- ambiente de uso
- checkpoint obrigatório
- se o acesso é read-only ou write-capable

O que não pode ser documentado:
- tokens, passwords, API keys, client secrets, refresh tokens
- URLs com credencial embutida
- dumps de `env`
- prints de painel com segredo visível

## Day-1 implications

1. Os dois workflows são a referência funcional mínima do OpenClow.
2. `marketing-dozecrew` precisa de checkpoint humano antes de qualquer publicação externa.
3. `inteligencia-dozecrew` precisa de leitura confiável e rastreável, mas não de write access por padrão.
4. `Blotato` fica como opcional até a estabilidade operacional ser comprovada.
