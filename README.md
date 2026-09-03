# ActivityLog

Aplicação web para registro e acompanhamento de atividades ao longo do tempo.

## Tecnologias

- [Next.js 16](https://nextjs.org/) — framework React com suporte a servidor
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática no modo strict
- [Tailwind CSS](https://tailwindcss.com/) — estilização via classes utilitárias
- [PostgreSQL 16](https://www.postgresql.org/) — banco de dados relacional
- [Prisma 7](https://www.prisma.io/) — ORM para comunicação com o banco
- [Docker Compose](https://docs.docker.com/compose/) — containerização do banco local
- [Zod](https://zod.dev/) — validação de esquemas com inferência de tipos

## Requisitos

- Node.js 18 ou superior
- npm 9 ou superior
- Docker Desktop

## Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/sdrashen/activity-log2.git

# 2. Entre na pasta
cd activity-log2

# 3. Instale as dependências
npm install
```

## Configuração das variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env
```

Edite o `.env` com os valores desejados:

```env
DATABASE_URL="postgresql://admin:senha123@localhost:5432/activitylog"
POSTGRES_USER=admin
POSTGRES_PASSWORD=senha123
POSTGRES_DB=activitylog
```

## Inicialização do PostgreSQL

```bash
# Inicia o banco em segundo plano
docker compose up -d

# Verifica se está rodando
docker compose ps

# Para o banco
docker compose down

# Para o banco e apaga os dados
docker compose down -v
```

## Execução das migrations

```bash
# Aplica as migrations no banco
npx prisma migrate dev

# Abre o Prisma Studio (interface visual do banco)
npx prisma studio
```

## Inicialização da aplicação

```bash
npm run dev
```

Acesse **http://localhost:3000/activities** no navegador.

## Comandos disponíveis

| Comando                  | Descrição                            |
| ------------------------ | ------------------------------------ |
| `npm run dev`            | Inicia o servidor de desenvolvimento |
| `npm run build`          | Gera o build de produção             |
| `npm run lint`           | Verifica o código com ESLint         |
| `npx prisma migrate dev` | Aplica alterações do schema no banco |
| `npx prisma generate`    | Regenera o Prisma Client             |
| `npx prisma studio`      | Abre interface visual do banco       |
| `npx prisma validate`    | Valida o schema do Prisma            |
| `npx prisma format`      | Formata o schema do Prisma           |
| `docker compose up -d`   | Inicia o PostgreSQL                  |
| `docker compose down`    | Para o PostgreSQL                    |
| `docker compose down -v` | Para e apaga os dados                |

## Estrutura do projeto

activity-log2/
app/
activities/
page.tsx # Página principal — busca dados e renderiza
loading.tsx # Estado de carregamento
error.tsx # Tratamento de erros
generated/
prisma/ # Prisma Client gerado automaticamente
page.tsx # Página raiz
components/
ActivityForm.tsx # Formulário de criação e edição
ActivityList.tsx # Lista de atividades com edição e exclusão
ActivityManager.tsx # Gerencia estado client-side
ActivitySummary.tsx # Painel de consolidado
DurationBadge.tsx # Badge de duração
EmptyState.tsx # Estado de lista vazia
lib/
actions.ts # Server Actions (criar, editar, remover)
activities.ts # Consultas ao banco de dados
prisma.ts # Instância do Prisma Client
validation.ts # Schema Zod e função de validação
prisma/
schema.prisma # Modelo de dados
migrations/ # Histórico de migrations
prisma.config.ts # Configuração do Prisma
docker-compose.yml # Configuração do PostgreSQL
.env.example # Exemplo de variáveis de ambiente

## Decisões técnicas

**Separação entre Server e Client Components**
Componentes que buscam dados (`page.tsx`) são Server Components. Componentes com interatividade (`ActivityManager`, `ActivityList`, `ActivityForm`) são Client Components com `'use client'`.

**Server Actions**
As operações de escrita (criar, editar, remover) usam Server Actions do Next.js, eliminando a necessidade de criar rotas de API manualmente.

**Validação com Zod**
A validação é centralizada em `lib/validation.ts` usando Zod, que infere os tipos TypeScript automaticamente a partir do schema — evitando duplicação entre tipos e regras de validação.

**Duração derivada**
A duração de cada atividade não é armazenada no banco — é calculada a partir de `startTime` e `endTime`. Armazenar dado derivado seria redundância.

**Tratamento de erros por tipo**
Erros de banco indisponível (`P1001`, `P1002`) retornam mensagens diferentes de erros genéricos. Registros não encontrados (`P2025`) são tratados silenciosamente na exclusão.

## Limitações conhecidas

- Os dados ficam vinculados ao banco local — não há autenticação de usuários.
- Sem suporte a múltiplos usuários.
- O banco precisa estar rodando localmente via Docker antes de iniciar a aplicação.
- Não há paginação na lista de atividades.
- Vulnerabilidade conhecida na dependência transitória `deepmerge-ts` (via Prisma 7.9.1). A correção disponível exige downgrade para Prisma 6, 
  o que é uma breaking change. Monitorar atualizações do Prisma para correção futura.
- O componente `ActivityForm` importa Server Actions (`lib/actions.ts`) que dependem do Prisma, o que impede testes unitários completos com Jest. 
  Testes de comportamento interativo (validação, submissão) são cobertos na Fase 15 com Playwright.
- `ActivityList` e `ActivityManager` não são testados com Jest por dependerem 
  indiretamente de Server Actions. Esses componentes são cobertos na Fase 15 com Playwright.

## Executando os testes E2E

Antes de rodar os testes Playwright, inicie a aplicação apontando para o banco de teste:

**Windows (PowerShell):**
```powershell
$env:DATABASE_URL="postgresql://admin:senha123@localhost:5433/activitylog_test"; npm run dev
```

**Linux/Mac:**
```bash
DATABASE_URL="postgresql://admin:senha123@localhost:5433/activitylog_test" npm run dev
```

Em outro terminal, rode os testes:
```bash
npx playwright test
```