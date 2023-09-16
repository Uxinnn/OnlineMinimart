import React from 'react';
import Axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';
import Box from '@mui/material/Box';


const ItemActions = ({item}) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editName, setEditName] = React.useState(item.name);
  const [editQty, setEditQty] = React.useState(item.qty);
  const [editPrice, setEditPrice] = React.useState(item.price);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleNameChange = (event) => {
    setEditName(event.target.value)
  }

  const handleQtyChange = (event) => {
    setEditQty(event.target.value)
  }

  const handlePriceChange = (event) => {
    setEditPrice(event.target.value)
  }


  const handleSave = (event) => {
    alert(JSON.stringify({
      name: editName, 
      qty: Number(editQty), 
      price: Number(editPrice)
    }))
    Axios.put('http://localhost:3001/web/api/v1/items/' + item.id, {
      name: editName, 
      qty: Number(editQty), 
      price: Number(editPrice)
    })
    // Axios.put('http://localhost:3001/web/api/v1/items/' + item.id, {
    //   name: event.target.name.value,
    //   qty: Number(event.target.qty.value), 
    //   price: Number(event.target.price.value)
    // })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleDelete = () => {
    Axios.delete('http://localhost:3001/web/api/v1/items/' + item.id)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <React.Fragment>
      {/* Actions available shown on items catalog */}
      <IconButton aria-label="edit" onClick={handleOpenEdit}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>

      {/* Dialog boxes for actions when clicked */}
      <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth='true'>
        <DialogActions>
          <IconButton color="primary" aria-label="close dialog" autoFocus onClick={handleCloseEdit}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogTitle textAlign='center' variant='h4'>
          {item.name}
        </DialogTitle>
        <DialogContent>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
          // onSubmit={handleSave}
          onSubmit={handleSave}
        >
          <TextField
            id="edit-name"
            label="Name"
            name="name"
            defaultValue={item.name}
            onChange={handleNameChange}
            fullWidth
          />
          <TextField
            id="edit-qty"
            label="Quantity"
            name="qty"
            defaultValue={item.qty}
            onChange={handleQtyChange}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="edit-price"
            label="price"
            name="price"
            defaultValue={item.price}
            onChange={handlePriceChange}
          />
        </Box>
        <Button onClick={handleSave} variant="outlined">Save</Button>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default ItemActions;
