# Brain-Agriculture
> Esta API tem como objetivo gerenciar o cadastro de produtores rurais e suas respectivas propriedades, áreas e culturas agrícolas. Ela permite o armazenamento e a consulta de informações essenciais sobre a produção agrícola no Brasil.
---

## 📄 Documentação da API
Acesse a documentação completa via Postman:
🔗 [https://documenter.getpostman.com/view/6256908/2sB2qcBfkV#13d9c677-67a9-4278-8f46-04ebd874a4ac](https://documenter.getpostman.com/view/6256908/2sB2qcBfkV#13d9c677-67a9-4278-8f46-04ebd874a4ac)

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) — Framework Node.js para aplicações escaláveis  
- [TypeScript](https://www.typescriptlang.org/) — Superset do JavaScript com tipagem estática  
- [Jest](https://jestjs.io/) — Framework de testes  
- [ESLint](https://eslint.org/) — Linting para manter o padrão de código
- [PostgreSQL](https://www.postgresql.org/) — Banco de dados relacional robusto e confiável  
- [TypeORM](https://typeorm.io/) — ORM para TypeScript e JavaScript  
- [Docker](https://www.docker.com/) — Containerização da aplicação  
---

## 🧱 Arquitetura

- **Modularidade por domínio** — Organização do código em módulos independentes  
- **Injeção de dependência** — Utilizando o container do NestJS  
- **Clean Architecture** — Separação clara entre regras de negócio, infraestrutura e interfaces  
- **Testabilidade** — Cobertura  de 70% dos testes com mocks de dependências  

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
