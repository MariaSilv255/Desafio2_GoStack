const express = require("express");
const cors = require("cors");

// const { v4: uuid, validate: isUuid } = require('uuid');
const { uuid } = require('uuidv4');
const app = express();
app.use(express.json());
app.use(cors());


const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body; //requisição
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0,
  };
  repositories.push(repository);
  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const repositoryIndex = repositories.findIndex(repository =>
    repository.id==id);

if(repositoryIndex == -1){
  return response.status(400).json({error:"Erro não foi encontrado"});
}

const repository = {
  id,
  title,
  url,
  techs,
  likes: repositories[repositoryIndex].likes,
};

repositories[repositoryIndex] = repository;
return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const projectIndex = repositories.findIndex(repository => repository.id == id)

  if (projectIndex < 0) {
    return response.status(400).json({ Error: 'Project not found.' })
  }else{
  repositories.splice(projectIndex, 1)
    
  }
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorio= repositories.find(repositorie => repositorie.id === id);
  if (!repositorio){
    return response.status(400).json({ error: 'Repositorie not found'});
  }
  repositorio.likes++;
  return response.status(200).json(repositorio) 
});


module.exports = app;
