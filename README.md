# Sumário
  * [Como iniciar](https://github.com/lucasmoraessilva/planner-project#Como-iniciar)
  * [Dependências](https://github.com/lucasmoraessilva/planner-project#Dependências)
  * [Tecnologias](https://github.com/lucasmoraessilva/planner-project#Tecnologias)
  * [Rotas](https://github.com/lucasmoraessilva/planner-project#Rotas)

# Como iniciar
  Este é um guia para mostrar como vocẽ pode rodar o projeto localmente.
  
  É possível iniciar o projeto através do **Docker**, dos scripts de inicialização do projeto que usam o **ts-node-dev** ou realizando o **build** do projeto e iniciando **diretamente com o Node**.

  ## Docker
  No diretório raiz do projeto há um arquivo Dockerfile que contém toda a configuração necessária para gerar uma imagem de container com a nossa aplicação. Para iniciar, basta realizar o build da imagem e iniciar o container.

  Clone o projeto.
  
    git clone https://github.com/lucasmoraessilva/planner-project planner-project

  Navegue até o diretório raiz do projeto.
  
    cd planner-project

  Realize o build da imagem.
    
    docker build -t planner-api-image .

  Note que o ponto (final da linha superior) faz parte do comando.

  Inicie um container com a imagem criada.
  
    docker run -d --name planner-api-container -p 3000:3000 planner-api-image

  Após seguir todos os passos será possível acessar a API através do endereço localhost:3000.

  ## Scripts (ts-node-dev)
  No arquivo package.json há alguns scripts configurados para iniciar a API no ambiente de desenvolvimento ou produção, build e outros.

  Para iniciar a API através destes scripts, basta seguir os passos abaixo.

  Clone o projeto.
  
    git clone https://github.com/lucasmoraessilva/planner-project planner-project

  Navegue até o diretório raiz do projeto.
  
    cd planner-project

  Instale as dependências do projeto. 
  
    npm install

  Inicie o projeto

    npm run start:dev
  
  ou

    npm run start:prod

  Você não verá nenhuma grande diferença entre os comandos se estiver rodando a aplicação localmente, pois o script de produção foi feito para auxiliar a entrega da API no ambiente do Render.

  Após seguir todos os passos a API estará acessível através do endereço localhost:3000.

  ## Build
  Este processo é utilizado no ambiente de produção (Render). Ele não tem grandes modificações e pode ser iniciado tranquilamente de maneira local.

  Clone o projeto.
  
    git clone https://github.com/lucasmoraessilva/planner-project planner-project

  Navegue até o diretório raiz do projeto.
  
    cd planner-project

  Clone o projeto.
  
    git clone https://github.com/lucasmoraessilva/planner-project planner-project

  Instale as dependências do projeto. 
  
    npm install

  Realize o build do projeto. O diretório /dist deve ser criado na raiz do projeto.
  
    npm run build

  Inicie a aplicação com o Node.
  
    node dist/server.js

   Com todos estes passos é possível iniciar a API diretamente com o Node em arquivos .js. A API estará disponível através do endereço localhost:3000.

# Dependências

  Para estes projeto foram utilizadas as bibliotecas

  * dotenv
  * express
  * joi
  * jsonwebtoken
  * mongoose
  * swagger-ui-express
  * typescript

  Também foram utilizadas estas bibliotecas para auxiliar no desenvolvimento

  * @types/express (desenvolvimento)
  * @types/jsonwebtoken (desenvolvimento)
  * @types/swagger-ui-express (desenvolvimento)
  * nodemon (desenvolvimento)
  * ts-node-dev (desenvolvimento)

# Tecnologias

  * Node
  * MongoDB
  * Git e GitHub
  * Plataforma Render para hospedagem

# Rotas

  * GET /events - Retorna uma lista com todos os eventos de todos os usuários. É possível passar um valor de filtro para esta requisição, trazendo somente os eventos que ocorrem em um determinado dia da semana. É um valor de 0 a 6 do tipo string.

  * POST /events - Cria um evento. Um evento é descrito no corpo da requisição e enviado para a API. Caso todos os campos sejam válidos, um evento será criado. Caso contrário, os erros serão retornados informando o que deve ser ajustado para a requisição ser aceita.

  * DELETE /events - Deleta os eventos de um dia da semana específico. Nesta rota o uso do filtro de dia da semana da semana é obrigatório. Todos os eventos que ocorerrão no dia da semana especificado serão deletados.

  * GET /events/{_id} - Retorna os dados de um evento. Todos os dados do evento especificado são retornados em um objeto.

  * PUT /events/{_id} - Atualiza os dados de um evento. Os dados de atualização são especificados no corpo da requisição.

  * DELETE /events/{_id} - Deleta um evento. O evento que possuir o _id especificado será excluído.

  * POST /users/ signUp - Cadastra um usuário. Os dados do usuário devem ser passados no corpo da requisição. Vale lembrar que o email é uma propriedade única, não permitindo que dois usuários tenham o mesmo e-mail cadastrado.

  * POST /users/ signIn - Realiza o processo de login. Um cookie contendo um JWT é retornado, permitindo ao usuário realizar operações que necessitam de autorização. No momento, todas as rotas são livres, este processo não precisa ser realizado antes de cada requisição.

  * PUT /users/{_id} - Atualiza dos dados de um usuário. O usuáiro que for identicado pelo _id informado terá os seus dados atualizados. Os dados do usuáiro são passados no corpo da requisição.