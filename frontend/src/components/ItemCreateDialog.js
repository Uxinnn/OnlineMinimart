import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {Button, IconButton, Box, InputAdornment, TextField, Dialog,
  DialogTitle, DialogContent, DialogActions} from '@mui/material';
import {createItem} from '../Apis.js';


const ItemCreateDialog = () => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [errors, setErrors] = React.useState({
    "name": false,
    "qty": false,
    "price": false
  });

  const [formValues, setFormValues] = React.useState({
    "name": "",
    "qty": 0,
    "price": 0
  })

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleCreate = (event) => {
    event.preventDefault();
    const body = {
      name: event.target.name.value.trim(),
      qty: Number(event.target.qty.value), 
      price: Number(event.target.price.value)
    }
    createItem(body);
  }

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

  return (
    <React.Fragment>
    {/* Create item button */}
    <Button onClick={handleOpenCreate} startIcon={<AddIcon />} variant="contained" sx={{ my: 2}}>
      Create Item
    </Button>

    {/* Dialog box for create */}
      <Dialog open={openCreate} onClose={handleCloseCreate} fullWidth='true'>
        <DialogActions>
          <IconButton color="primary" aria-label="close dialog" autoFocus onClick={handleCloseCreate}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogTitle textAlign='center' variant='h4'>
          Create New item
        </DialogTitle>
        <DialogContent>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleCreate}
        >
          <TextField
            id="create-name"
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
            id="create-qty"
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
            id="create-price"
            label={errors["price"] ? "Error" : "Price"}
            name="price"
            type="text"
            error={errors["price"]}
            onBlur={handleBlur}
            onChange={handleFormChange}
            onKeyDown={disableEnterSubmit}
            value={formValues["price"]}
            helperText={errors["price"] ? "Invalid price specified." : ""}
            // Note: there is InputProps with a capital I and inputProps with a small i
            InputProps={{
              startAdornment: (<InputAdornment position="start">$</InputAdornment>)
            }}
            inputProps={{
              inputMode: 'numeric', 
              pattern: '[0-9]*[.]?[0-9]+'  // Decimal value only
            }}
          />
          <Button 
            type="submit" 
            variant="contained"
            disabled={(errors['name'] || errors['qty'] || errors['price'])}
          >
            Add item
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  </React.Fragment>
  )
}

export default ItemCreateDialog;
