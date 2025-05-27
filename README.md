# Brain-Agriculture
> Esta API tem como objetivo gerenciar o cadastro de produtores rurais e suas respectivas propriedades, áreas e culturas agrícolas. Ela permite o armazenamento e a consulta de informações essenciais sobre a produção agrícola no Brasil.
---

## 📄 Documentação da API
A API está documentada tanto no Swagger (OpenAPI) quanto no Postman, oferecendo diferentes formas de consulta e entendimento.

🔗 Documentação no Postman:
https://documenter.getpostman.com/view/6256908/2sB2qcBfkV#13d9c677-67a9-4278-8f46-04ebd874a4ac

🌐 Endpoints disponíveis em:

Produção: https://brain-agriculture-backend-production.up.railway.app/api

Localhost: http://localhost:3333/api



# endpoint da API (Produção)
🔗 https://brain-agriculture-backend-production.up.railway.app/

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) — Framework Node.js para aplicações escaláveis  
- [TypeScript](https://www.typescriptlang.org/) — Superset do JavaScript com tipagem estática  
- [Jest](https://jestjs.io/) — Framework de testes  
- [ESLint](https://eslint.org/) — Linting para manter o padrão de código
- [PostgreSQL](https://www.postgresql.org/) — Banco de dados relacional
- [TypeORM](https://typeorm.io/) — ORM para TypeScript e JavaScript  
- [Docker](https://www.docker.com/) — Containerização da aplicação  
---

## 🧱 Arquitetura

- **Modularidade por domínio** — Organização do código em módulos independentes  
- **Injeção de dependência** — Utilizando o container do NestJS  
- **Clean Architecture** — Separação clara entre regras de negócio, infraestrutura e interfaces  
- **Testabilidade** — Cobertura  de 70% dos testes com mocks de dependências
  
   <img width="848" alt="image" src="https://github.com/user-attachments/assets/0e1234d9-6ed9-428f-9dc8-8ab967a3b851" />

---

## ⚙️ Configuração e Instalação

```
# 1. Clone o repositório
git clone [https://github.com/felipevilella/Brain-Agriculture-backEnd](https://github.com/felipevilella/Brain-Agriculture-backEnd)

# 2. Acesse o diretório
cd Brain-Agriculture-backEnd

# 3. Instale as dependências
yarn

# 4. Rode o Docker (banco de dados e dependências)
docker compose up --build
```


▶️ Executando a Aplicação
```
# Desenvolvimento (com hot reload)
yarn start:dev

# Compilação para produção
yarn build

# Executar aplicação em modo produção
yarn start:prod

```

🧪 Rodando os Testes
```
# Executa todos os testes
yarn test:ci
```

▶️ Migrations
```
# Gerar migrations
yarn typeorm:migrate:generate src/infra/database/typeorm/migrations/{name_migrations}
```
