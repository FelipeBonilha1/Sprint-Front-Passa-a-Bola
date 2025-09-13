#  Passa a Bola

Plataforma acadêmica desenvolvida em **React + Vite + TailwindCSS** para promover o **futebol feminino** e facilitar a organização de partidas, conectando jogadoras, times e espaços esportivos.

---

##  Objetivo

O projeto surgiu na disciplina de **Engenharia de Software** com a ideia de criar uma aplicação semelhante ao app **Apito**, mas voltada para **incentivar o futebol feminino**.  
Na primeira sprint criamos o protótipo mobile, e nesta segunda entrega evoluímos para um **site funcional** que contempla landing page e telas principais.

---

## Funcionalidades

- **Landing Page (Home):**  
  - Apresentação do projeto  
  - Seções "Sobre", "Metas" e "Contato"  
  - Paleta de cores personalizada  

- **Login:** formulário simples de autenticação

- **Perfil:** cadastro de dados pessoais (nome, apelido, idade, e-mail, celular)

- **Feed:** lista de jogos públicos disponíveis, com botão **“Quero jogar”**

- **Publicar Partida:** formulário para cadastrar novas partidas

- **Buscar Partida:** formulário + histórico de buscas

- **Perto de Você:** lista de partidas próximas + status

- **Histórico:** registro visual de partidas anteriores

---

## 🛠️ Tecnologias

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)  
- [TailwindCSS v4](https://tailwindcss.com/)  
- [React Router DOM](https://reactrouter.com/)  
- Node.js v18+  

---

## 📦 Requisitos

- Node.js 18 ou superior  
- NPM 9+ ou Yarn

---

## 🚀 Como rodar o projeto

```bash
# clone este repositório
git clone https://github.com/seu-usuario/passa-a-bola.git

# acesse a pasta
cd passa-a-bola

# instale as dependências
npm install

# rode em ambiente de desenvolvimento
npm run dev

# abra no navegador (normalmente em)
http://localhost:5173


src/
 ├─ pages/        # Telas do sistema (Home, Login, Feed, etc.)
 ├─ ui/           # Shell com Header, Footer e Bottom Nav
 ├─ data/         # Dados mockados (jogos, status)
 ├─ index.css     # Estilos com Tailwind e tokens de cor
 ├─ main.jsx      # Entrada principal

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
