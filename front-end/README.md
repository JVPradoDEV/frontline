# Frontline - Front-end

Bem-vindo ao repositório Front-end do **Frontline**, uma aplicação web inspirada no Twitter.

## 📋 Sobre o Projeto

O Frontline é um clone do Twitter focado em interações sociais e compartilhamento de conteúdo. O projeto conta com as seguintes funcionalidades:

- **Feed Personalizado:** Visualize um feed de publicações exclusivo, contendo apenas os posts dos usuários que você segue.
- **Interações em Posts:** Curta publicações e adicione comentários.
- **Sistema de Usuários:** Crie novos usuários e utilize o sistema de busca para encontrar outros perfis.
- **Rede Social:** Siga outros usuários para acompanhar suas atualizações.
- **Gestão de Perfil:** Atualize suas informações pessoais, incluindo mudança de foto de perfil, alteração do nome de exibição e atualização de senha.

*Nota: Toda a parte de configuração e gerenciamento de variáveis de ambiente é cuidada pelo Back-end. Por favor, consulte o README do Back-end para instruções relacionadas à conexão com o banco de dados e chaves de API.*

## 🚀 Tecnologias Utilizadas

O front-end foi construído utilizando as seguintes tecnologias modernas:

- **[React](https://reactjs.org/)** - Biblioteca JavaScript para construção de interfaces de usuário.
- **[Vite](https://vitejs.dev/)** - Ferramenta de build super rápida para projetos web.
- **[TypeScript](https://www.typescriptlang.org/)** - Superset de JavaScript que adiciona tipagem estática ao código.

## 🛠️ Como executar o projeto localmente

### Pré-requisitos
Certifique-se de ter o **Node.js** e o gerenciador de pacotes **NPM** instalados no seu ambiente de desenvolvimento.

### Instalação e Execução

1. Abra o terminal e certifique-se de estar dentro do diretório raiz do front-end do Frontline.
2. Caso precise inicializar as configurações do npm do zero, utilize:
   ```bash
   npm init
   ```
2. Instale todas as dependências do projeto executando:
   ```bash
   npm install
   ```
3. Para iniciar o servidor de desenvolvimento (localhost), rode o comando:
   ```bash
   npm run dev
   ```
   Após executar este comando, o terminal exibirá a URL local (geralmente **http://localhost:5173/**) onde você pode acessar a aplicação no seu navegador.

## 📦- Build para Produção

Quando terminar o desenvolvimento e quiser preparar o projeto para o deploy, gere a versão otimizada com o comando:
  ```bash
  npm run build
  ```
O Vite irá empacotar os arquivos otimizados e minificados dentro de uma pasta chamada dist, prontos para serem hospedados.

---

### 🖌️ Aqui está alguns concepts das páginas feitas no FIGMA como base para depois ser aplicado no site de fato:
https://www.figma.com/site/GjaMeO5HUTRWPKFHd57UQ5/frontline-projeto-?node-id=0-1&t=DDLwh8RfZfY2swtE-1


## ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
