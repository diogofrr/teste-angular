# Cadastro de Produtos

Aplicação web desenvolvida em Angular para gerenciamento de produtos (CRUD completo). O sistema permite criar, listar, editar e excluir produtos com validações de formulário e persistência de dados no LocalStorage.

## 🚀 Tecnologias

- **Angular 21** - Framework frontend
- **PrimeNG 21** - Biblioteca de componentes UI
- **PrimeIcons** - Ícones
- **RxJS** - Programação reativa
- **TypeScript** - Linguagem de programação
- **SCSS** - Pré-processador CSS

## ✨ Funcionalidades

- ✅ **CRUD Completo**: Criar, Listar, Editar e Excluir produtos
- 🔍 **Busca em tempo real**: Filtro por nome, descrição ou categoria
- 📋 **Validação de formulários**: Validação em tempo real com mensagens de erro
- 💾 **Persistência local**: Dados salvos no LocalStorage do navegador
- 🎨 **Interface moderna**: Design responsivo com PrimeNG
- 📱 **Responsivo**: Adaptável para diferentes tamanhos de tela
- 🔔 **Notificações**: Sistema de toast para feedback ao usuário

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **pnpm** (versão 10.2.0 ou superior)

## 🛠️ Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd teste-crud
```

2. Instale as dependências:

```bash
pnpm install
```

## 🏃 Como executar

### Modo de desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
pnpm start
```

A aplicação estará disponível em `http://localhost:4200`

### Build para produção

Para gerar o build de produção:

```bash
pnpm build
```

Os arquivos compilados estarão na pasta `dist/`.

### Executar testes

```bash
pnpm test
```

### Executar linter

```bash
pnpm lint
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── models/
│   │   └── product.model.ts      # Modelo de dados do produto
│   ├── products/
│   │   ├── form/                  # Componente de formulário (criar/editar)
│   │   └── list/                  # Componente de listagem
│   ├── services/
│   │   ├── product.service.ts     # Serviço de gerenciamento de produtos
│   │   ├── local-storage.service.ts # Serviço de LocalStorage
│   │   └── init.service.ts        # Serviço de inicialização com dados de exemplo
│   ├── scripts/
│   │   └── add-sample-products.ts # Script para adicionar produtos de exemplo
│   ├── app.config.ts              # Configuração da aplicação
│   ├── app.routes.ts               # Rotas da aplicação
│   └── app.ts                      # Componente raiz
├── styles.scss                     # Estilos globais
└── index.html                      # HTML principal
```

## 📝 Campos do Produto

- **Nome**: Obrigatório, mínimo de 3 caracteres
- **Descrição**: Obrigatório, mínimo de 10 caracteres, máximo de 256 caracteres
- **Preço**: Obrigatório, valor mínimo de R$ 0,01
- **Categoria**: Obrigatório, mínimo de 2 caracteres

## 💾 Armazenamento

Os dados são persistidos no **LocalStorage** do navegador. Isso significa que:

- Os dados permanecem mesmo após fechar o navegador
- Os dados são específicos para cada navegador/domínio
- Para limpar os dados, você pode usar as ferramentas de desenvolvedor do navegador
