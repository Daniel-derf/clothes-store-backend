#!/bin/bash
# chmod +x bootstrap.sh to give permission

set -e

echo "Subindo containers Docker..."
docker compose up --build -d

echo "Aguardando o PostgreSQL iniciar..."
until docker exec clothes-store-db pg_isready -U user; do
  sleep 2
done

echo "Aplicando o script SQL de inicialização..."
docker exec -i clothes-store-db psql -U user -d store < init.sql

echo "Pronto! O ambiente foi inicializado."