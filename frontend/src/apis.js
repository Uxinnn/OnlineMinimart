import Axios from 'axios';

const baseUrl = "http://localhost:3001"


const createItem = (body) => {
  Axios.post(baseUrl + '/web/api/v1/items/', body)
  .then(function (response) {
    console.log(response);
    window.location.reload();
  })
  .catch(function (error) {
    console.log(error);
  });
}

const editItem = (id, body) => {
  Axios.put(baseUrl + '/web/api/v1/items/' + id, body)
  .then(function (response) {
    console.log(response);
    window.location.reload();
  })
  .catch(function (error) {
    console.log(error);
  });
}

const deleteItem = (id) => {
  Axios.delete(baseUrl + '/web/api/v1/items/' + id)
  .then(function (response) {
    console.log(response);
    window.location.reload();
  })
  .catch(function (error) {
    console.log(error);
  });
}

export {
  createItem,
  editItem,  
  deleteItem
};
