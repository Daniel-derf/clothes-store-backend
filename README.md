# 🛍️ E-commerce Backend - NestJS

## 🇺🇸 English

A complete backend for an E-commerce system built with **NestJS**, following the best software engineering practices:

- ✅ TDD (Test-Driven Development)
- 🧠 DDD (Domain-Driven Design)
- 🧼 Clean Architecture
- 📄 Swagger for API documentation

---

## 🚀 Technologies Used

- **Node.js**
- **NestJS**
- **PostgreSQL**
- **Swagger** (Interactive documentation)
- **Jest + Supertest** (Integration tests)
- **Docker** (optional)

---

## ⚙️ How to run the project

> **Attention:** The database must be running before starting the application. Follow the instructions in the section below to start the database using Docker or manually.

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Run the application in development mode
npm run start:dev

# Run tests with automatic database reset
npm run test
```

---

## 🐳 Quick start with Docker and database

You can automate the setup of the database and containers using the `bootstrap.sh` script:

```bash
# Give execution permission to the script (only the first time)
chmod +x bootstrap.sh

# Run the script to start the containers and apply init.sql
./bootstrap.sh
```

The script will:

1. Start the required Docker containers (`docker compose up --build -d`)
2. Wait for PostgreSQL to be ready
3. Apply the initialization SQL script (`init.sql`)

---

### Manual alternative

If you prefer to do it manually:

1. Start the database:
   ```bash
   docker compose up --build -d
   ```
2. Wait for the database container to start (you can check with `docker ps`).
3. Apply the SQL script:
   ```bash
   docker exec -i clothes-store-db psql -U user -d store < init.sql
   ```

---

# 🛍️ E-commerce Backend - NestJS

## 🇧🇷 Portuguese

Backend completo para um sistema de E-commerce desenvolvido com **NestJS**, aplicando as melhores práticas de engenharia de software:

- ✅ TDD (Test-Driven Development)
- 🧠 DDD (Domain-Driven Design)
- 🧼 Clean Architecture
- 📄 Swagger para documentação da API

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **PostgreSQL**
- **Swagger** (Documentação interativa)
- **Jest + Supertest** (Testes de integração)
- **Docker** (opcional)

---

## ⚙️ Como rodar o projeto

> **Atenção:** É requisito que o banco de dados esteja rodando antes de iniciar a aplicação. Siga as instruções da seção abaixo para subir o banco via Docker ou manualmente.

```bash
# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Rode a aplicação em modo de desenvolvimento
npm run start:dev

# Executar os testes com reset automático do banco
npm run test
```

---

## 🐳 Inicialização rápida com Docker e banco de dados

Você pode automatizar o setup do banco de dados e containers usando o script `bootstrap.sh`:

```bash
# Dê permissão de execução ao script (apenas na primeira vez)
chmod +x bootstrap.sh

# Execute o script para subir os containers e aplicar o init.sql
./bootstrap.sh
```

O script irá:

1. Subir os containers Docker necessários (`docker compose up --build -d`)
2. Aguardar o banco PostgreSQL estar pronto
3. Aplicar o script SQL de inicialização (`init.sql`)

---

### Alternativa manual

Se preferir fazer manualmente:

1. Suba o banco de dados:
   ```bash
   docker compose up --build -d
   ```
2. Aguarde o container do banco iniciar (pode verificar com `docker ps`).
3. Aplique o script SQL:
   ```bash
   docker exec -i clothes-store-db psql -U user -d store < init.sql
   ```

---
