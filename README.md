# Sistema de Gestão CRUD

Um sistema de gestão completo com funcionalidades CRUD (Create, Read, Update, Delete) desenvolvido com HTML, CSS e JavaScript puro.

## Funcionalidades

- **Autenticação de Usuários**
  - Login com email e senha
  - Validação de campos em tempo real
  - Persistência de sessão
  - Redirecionamento automático para usuários logados

- **Cadastro de Usuários**
  - Formulário de cadastro com validações
  - Armazenamento local dos dados
  - Verificação de email duplicado

- **Listagem de Dados**
  - Visualização em tabela
  - Ordenação por colunas
  - Paginação
  - Busca e filtros

- **Gerenciamento de Dados**
  - Criação de novos registros
  - Edição de registros existentes
  - Exclusão de registros
  - Confirmação antes de excluir

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage para persistência de dados

## Estrutura do Projeto

```
CRUD/
├── css/
│   └── style.css
├── js/
│   ├── login.js
│   ├── cadastro.js
│   └── listagem.js
├── pages/
│   ├── login.html
│   ├── cadastro.html
│   └── listagem.html
└── README.md
```

## Como Usar

1. Clone o repositório
2. Abra o arquivo `pages/login.html` em seu navegador
3. Crie uma conta através da página de cadastro
4. Faça login com suas credenciais
5. Comece a gerenciar seus dados

## Validações Implementadas

### Login
- Email válido (formato correto)
- Senha com mínimo de 6 caracteres
- Campos obrigatórios
- Verificação de credenciais

### Cadastro
- Nome completo
- Email válido e único
- Senha com requisitos mínimos
- Confirmação de senha

## Armazenamento

O sistema utiliza o LocalStorage do navegador para:
- Armazenar dados dos usuários
- Manter sessão do usuário logado
- Persistir dados entre recarregamentos da página

## Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
