# Variáveis
BACKEND_DIR=backend
FRONTEND_DIR=frontend

# Regras
.PHONY: install-backend install-frontend install-all start-backend start-frontend start-all

# Instala as dependências do backend
install-backend:
	cd $(BACKEND_DIR) && npm install

# Instala as dependências do frontend
install-frontend:
	cd $(FRONTEND_DIR) && npm install

# Instala todas as dependências
install-all: install-backend install-frontend

# Inicia os servidores backend e frontend
start-backend:
	@cd $(BACKEND_DIR) && npm run start

start-frontend:
	@cd $(FRONTEND_DIR) && npm start

start-all:
	start /b cmd /c "cd backend && npm run start" && start /b cmd /c "cd frontend && npm start"