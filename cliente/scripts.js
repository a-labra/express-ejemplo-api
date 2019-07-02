const cardsList = document.querySelector('#cards-list');

const url = 'http://localhost:8085';
const config = {
  method: 'get'
}

fetch(url, config)
  .then(function(response) {
    console.log(response);
    return response.json(); // Lo que retorna una promesa se recibe como parametro en la siguiente
  })
  .then(function(responseJson) {
    console.log(responseJson.usersList);

    for(let user of responseJson.usersList) {
      cardsList.innerHTML += `
        <div class="card">
          <h2>${user.name}</h2>
          <p>${user.ocupation}</p>
        </div>
      `
    }
  })
