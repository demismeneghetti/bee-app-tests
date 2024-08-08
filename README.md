# Bee App Tests

Bee App Tests é um projeto para testar automação de testes, incluindo funcionalidades de login, cadastro de usuário e operações CRUD. Este projeto é dividido em backend (Node.js com Express e MongoDB) e frontend (React).

## Estrutura do Projeto

bee-app-tests/
│
├── backend/
│ ├── .env.development
│ ├── .env.production
│ ├── package.json
│ ├── server.js
│ ├── node_modules/
│ └── ...
│
├── frontend/
│ ├── .env.development
│ ├── .env.production
│ ├── package.json
│ ├── src/
│ │ ├── components/
│ │ │ ├── Login.js
│ │ │ ├── Register.js
│ │ │ ├── Products.js
│ │ └── ...
│ ├── node_modules/
│ └── ...
│
├── .gitignore
├── Makefile
└── README.md


## Pré-requisitos

- Node.js instalado
- MongoDB instalado e em execução

## Configuração do Projeto

### Passo 1: Clonar o Repositório

```bash
git clone <URL_do_seu_repositório>
cd bee-app-tests
```

### Passo 2: Configurar Variáveis de Ambiente

Crie os arquivos .env.development e .env.production tanto para o backend quanto para o frontend.

  Backend
- backend/.env.development:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost/bee-app-tests
```

- backend/.env.production:

```bash
PORT=3000
MONGODB_URI=mongodb://<seu_mongo_prod>/bee-app-tests
```

Frontend
- frontend/.env.development:

```bash
REACT_APP_API_URL=http://localhost:3000
```

- frontend/.env.production:
```bash
REACT_APP_API_URL=http://<seu_backend_prod>
```

### Passo 3: Instalar Dependências

Instale as dependências para o backend e o frontend.

```bash
make install-all
```

### Passo 4: Executar o Projeto

Executar o Backend

- Em modo de desenvolvimento:
```bash
make start-backend
```
- Em modo de produção:
```bash
cd backend
npm run start:prod
```

Executar o Frontend

- Em modo de desenvolvimento:
```bash
make install-all
```

- Em modo de produção:
```bash
cd frontend
npm run start:prod
```

Executar Ambos os Servidores

- Em modo de desenvolvimento:
```bash
make start-all
```

- Em modo de produção:
```bash
cd backend
npm run start:prod & cd ../frontend
npm run start:prod
```

### Estrutura dos Diretórios
- backend/: Contém o código do servidor, configurações e dependências.
- frontend/: Contém o código do cliente React, configurações e dependências.
- Makefile: Facilita a execução de comandos comuns.
- .gitignore: Define arquivos e diretórios a serem ignorados pelo Git.
- README.md: Documentação do projeto.


### Contato
Para mais informações, entre em contato com [demis@beelab.com.br].