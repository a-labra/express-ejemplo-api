const express = require('express');
const app = express();
const port = 8085;
const db = require('./db.json');
const cors = require('cors');


//Levantar el servidor
app.listen(port, function() {
  console.log(`Iniciando servidor en el puerto: ${port}`);
  console.log(`http://localhost:${port}`);
});


//Manejar las peticiones
app.use(cors());
app.use(express.json()); //Midleware - Lee los jsons
app.get('/', getUserInfo); // Treae algo
app.get('/:id', getSingleUser);
app.post('/', createUser); // Enviar algo
app.put('/:id', editUserInfo); // Editar algo
app.delete('/:id', deleteUser); //Borrar algo

function getUserInfo(request, response) {
  response.status(200).send(db);
}

function getSingleUser(request, response) {
  const id = request.params.id;

  //Busca en la lista de usuarios
  for(let i = 0; i < db.usersList.length; i++) {
    if(db.usersList[i].id == id) {
      response.status(200).send(db.usersList[i]);
    }
  }
  response.status(404).send('Not user found');
}

function editUserInfo(request, response) {
  const id = request.params.id;
  let userToUpdate;

  //Busca en la lista de usuarios
  for(let i = 0; i < db.usersList.length; i++) {
    if(db.usersList[i].id == id) {
      userToUpdate = db.usersList[i];
    }
  }

  if(request.body.name) {
    const newName = request.body.name;
    userToUpdate.name = newName;
  }
  if(request.body.age) {
    const newAge = request.body.age;
    userToUpdate.age = newAge;
  }
  if(request.body.gender) {
    const newGender = request.body.gender;
    userToUpdate.gender = newGender;
  }
  if(request.body.ocupation) {
    const newOcupation = request.body.ocupation;
    userToUpdate.ocupation = newOcupation;
  }
  // TODO agregar las demas propiedades para que sean editables
  response.send(db);
}

function createUser(request, response) {
  const newUser = request.body.user;
  let newId = Math.floor(Math.random() * 99.99);

  for(let i = 0; i < db.usersList.length; i++) {
    if(db.usersList[i].id == newId) {
      newId = Math.floor(Math.random() * 99.99);
      i = 0;
    } else {
      newUser.id = newId;
    }
  }

  db.usersList.push(newUser);
  response.status(201).send(db);
}

function deleteUser(request, response) {
  const id = request.params.id;
  for(let i = 0; i < db.usersList.length; i++) {
    if(db.usersList[i].id == id) {
      db.usersList.splice(i, 1);
    }
  }
  response.send(db);
}
