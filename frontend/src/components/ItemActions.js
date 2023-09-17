import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment} from '@mui/material';
import Box from '@mui/material/Box';
import {deleteItem, editItem} from "../Apis.js";


const ItemActions = ({item}) => {
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const body = {
      name: formValues.name,
      qty: Number(formValues.qty), 
      price: Number(formValues.price)
    };
    editItem(item.id, body, true);
  }

  const [errors, setErrors] = React.useState({
    "name": false, 
    "qty": false, 
    "price": false
  });

  const [formValues, setFormValues] = React.useState({
    "name": item.name, 
    "qty": item.qty, 
    "price": item.price
  })

  const disableEnterSubmit = (event) => {
    if (event.keyCode === 13 ) {
      event.preventDefault();
    }
  }

  const handleBlur = (event) => {
    setErrors({
      ...errors,
      [event.target.name]: event.target.validity.patternMismatch || (event.target.value.trim() === "")
    });
  };

  const handleFormChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    })
  }

  const handleDelete = (event) => {
    event.preventDefault();
    deleteItem(item.id);
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

      {/* Dialog box for edit */}
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
          onSubmit={handleEdit}
        >
          <TextField
            id="edit-name"
            label={errors["name"] ? "Error" : "Name"}
            name="name"
            type="text"
            fullWidth
            error={errors["name"]}
            onBlur={handleBlur}
            onChange={handleFormChange}
            onKeyDown={disableEnterSubmit}
            value={formValues["name"]}
            helperText={errors["name"] ? "Invalid name specified. Only alphanumeric characters and space allowed." : ""}
            inputProps={{
              pattern: '[a-zA-Z0-9 ]*', 
            }}
          />
          <TextField
            id="edit-qty"
            label={errors["qty"] ? "Error" : "Quantity"}
            name="qty"
            type="text"
            error={errors["qty"]}
            onBlur={handleBlur}
            onChange={handleFormChange}
            onKeyDown={disableEnterSubmit}
            value={formValues["qty"]}
            helperText={errors["qty"] ? "Invalid quantity specified." : ""}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              inputMode: 'numeric', 
              pattern: '[0-9]*', 
            }}
          />
          <TextField
            id="edit-price"
            label={errors["price"] ? "Error" : "Price"}
            name="price"
            type="text"
            error={errors["price"]}
            onBlur={handleBlur}
            onChange={handleFormChange}
            onKeyDown={disableEnterSubmit}
            value={formValues["price"]}
            helperText={errors["price"] ? "Invalid price specified." : ""}
            InputProps={{
              startAdornment: (<InputAdornment position="start">$</InputAdornment>)
            }}
            inputProps={{
              inputMode: 'numeric', 
              pattern: '[0-9]*[.]?[0-9]+'
            }}
          />
          <Button 
            type="submit" 
            variant="contained"
            disabled={(errors['name'] || errors['qty'] || errors['price']) ? true : false}
          >
            Save
          </Button>
        </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default ItemActions;
