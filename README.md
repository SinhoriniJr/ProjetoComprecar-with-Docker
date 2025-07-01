# CompreCar Marketplace 🚗

Projeto completo de um sistema de marketplace para compra e venda de veículos, com autenticação, gerenciamento de usuários, controle de pedidos e integração completa entre backend e frontend utilizando Docker.

## 📦 Tecnologias Utilizadas

### Backend (Java + Spring Boot)
- Spring Security
- Spring Data JPA
- JWT (JSON Web Token)
- Upload de imagens
- API RESTful

### Frontend (React)
- React Router DOM
- Context API para autenticação
- Axios para consumo da API
- CSS modularizado

### DevOps
- Docker
- Docker Compose
- Maven Wrapper

## 🛠️ Instalação e Execução

### Pré-requisitos
- Docker e Docker Compose instalados

### Executando o Projeto

# Clone o repositório
git clone https://github.com/seu-usuario/comprecar-marketplace.git
cd comprecar-marketplace

# Execute os containers
docker-compose up --build

A aplicação estará disponível em:

Backend: http://localhost:8080

Frontend: http://localhost:3000

🔐 Funcionalidades
Cadastro e login de usuários

Token JWT para autenticação

Listagem, adição e remoção de veículos

Carrinho e pedidos

Upload de imagens dos veículos

📂 Estrutura do Projeto
ProjetoComprecar-with-Docker-main/
├── backcomprecar/        # Backend Spring Boot
├── frontcomprecar/       # Frontend React
├── docker-compose.yml    # Orquestração dos serviços
