import Axios from 'axios';

const baseUrl = "http://localhost:5000"


const getAllItems = () => {
  const items = Axios.get(baseUrl + "/web/api/v1/items");
  
  return items;
}

const createItem = (body) => {
  Axios.post(baseUrl + '/web/api/v1/items', body)
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

const editItems = (body) => {
  Axios.put(baseUrl + '/web/api/v1/items', body)
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
  getAllItems, 
  createItem,
  editItem,
  editItems,
  deleteItem
};
