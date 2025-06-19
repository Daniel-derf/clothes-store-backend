# 🛍️ E-commerce Backend - NestJS

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
