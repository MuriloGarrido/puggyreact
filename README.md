# PiggyUp - Educação Financeira  

## Descrição  
A PiggyUp é uma aplicação web voltada à educação financeira de jovens, desenvolvida com o objetivo de promover o aprendizado de forma interativa e lúdica. A plataforma baseia-se em um sistema de perguntas e respostas sobre temas relacionados a finanças pessoais, permitindo que os usuários ampliem seus conhecimentos de maneira dinâmica.

Para tornar a experiência mais envolvente, a PiggyUp incorpora elementos de gamificação, como uma roleta de recompensas e um guarda-roupa virtual, onde os participantes podem personalizar seus personagens conforme progridem no jogo. Assim, a aplicação busca unir entretenimento e aprendizado, estimulando o interesse dos jovens pela educação financeira de forma prática e divertida.  

## Estrutura do Projeto  

Todos os elementos principais do projeto estão localizados na pasta src, presente no diretório raiz da aplicação. A estrutura dessa pasta é a seguinte:  

assets/ # Contém imagens e recursos estáticos do projeto  
components/guardaRoupa/Chapeus/ # Componente auxiliar da personalização do porquinho, responsável pela alteração dos chapéus    
components/guardaRoupa/GuardaRoupa/ # Página principal dedicada à personalização do personagem (porquinho)  
components/guardaRoupa/Porquinho/ # Componente que representa visualmente o personagem do porquinho, integrando as personalizações aplicadas


components/Autenticacao/ # Página inicial com menu lateral, seletor de fase e carteira  
components/Home/ # Página inicial com menu lateral, seletor de fase e carteira  
components/Index/ # Página inicial (landing page)  
components/Login/ # Tela de login para acessar o sistema  
components/Quiz/ # Quiz de perguntas sobre educação financeira  
components/Roleta/ # Página da roleta/caca-níquel para apostas  


Cada pasta de página contém seus respectivos arquivos **HTML, CSS e JS**, exceto a pasta `assets` que contém apenas imagens.

---
## Descrição das Telas e Funcionalidades

- **Home**  
  Contém um **menu lateral** para navegar entre as páginas, um **seletor de fase** para escolher os níveis de aprendizado e uma área para exibir a **carteira de pontos do usuário**.

- **Roleta**  
  Página que apresenta um **caça-níquel** interativo onde o usuário pode apostar pontos ou moedas do jogo.

- **Guarda-roupa**  
  Tela para **personalizar o porquinho** do usuário, permitindo trocar roupas, cores e acessórios.

- **Login**  
  Página para que o usuário **faça login** no sistema e acesse suas informações e progresso.

- **Quiz**  
  Página com perguntas de **educação financeira**, onde o usuário responde questões e recebe pontuação conforme acertos.

## Instalação e execução
A aplicação PiggyUp foi desenvolvida utilizando o framework React.js, tendo como base as linguagens HTML, CSS e JavaScript. Para o gerenciamento de dependências e execução do ambiente de desenvolvimento, é utilizado o Node.js com o gerenciador de pacotes npm.  

**1 - Requisitos**  
Antes de iniciar, verifique se possui as seguintes ferramentas instaladas em seu computador:
Node.js (versão LTS recomendada)
npm (instalado automaticamente junto com o Node.js)
Git (para clonar o repositório)
A instalação do Node.js pode ser realizada através do site oficial: https://nodejs.org  

**2 - Clonar o repositório**
Acesse o link do projeto no GitHub e utilize o comando abaixo para clonar o repositório em seu ambiente local:  
git clone https://github.com/MaBonfim/PiggyUp.git  

**3 - Acessar o diretório do projeto**
Acesse o diretório do projeto:  
cd puggyreact  

**4 - Instalar as dependências**  
Com o terminal aberto na pasta do projeto, execute o comando abaixo para instalar todas as dependências necessárias:  
npm install  

**5 - Executar a aplicação**  
Após a instalação das dependências, inicie o servidor de desenvolvimento com o comando:  
npm start  

O React iniciará automaticamente a aplicação, que poderá ser acessada no navegador por meio do endereço:
http://localhost:3000  


