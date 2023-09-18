import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton, Button, TextField, Box, Dialog, DialogTitle,
  DialogContent, DialogActions, InputAdornment} from '@mui/material';
import { editItem, createItem } from "../Apis.js";


const ItemPropsDialog = ({item, action, openDialog, handleDialog}) => {
  // Used to display a dialog form with the properties of an item.
  // Used as a form for creating and editting an item.

  // Used for input validation to edit item form.
  // If input fails validation, then form cannot be submitted.
  const [errors, setErrors] = React.useState({
    "name": false,
    "qty": false,
    "price": false
  });

  // Keeps track of current values in edit item form.
  // To be used for input validation.
  const [formValues, setFormValues] = React.useState({
    "name": item.name,
    "qty": item.qty,
    "price": item.price
  })


  // For updating database after an item has been edited.
  const commitEdit = (event) => {
    event.preventDefault();
    const body = {
      name: formValues.name,
      qty: Number(formValues.qty), 
      price: Number(formValues.price)
    };
    editItem(item.id, body, true);
  }

  // For adding the new item to the database.
  const commitCreate = (event) => {
    event.preventDefault();
    const body = {
      name: event.target.name.value.trim(),
      qty: Number(event.target.qty.value), 
      price: Number(event.target.price.value)
    }
    createItem(body);
  }

  // Prevents accidental submission of edit item form by pressing 'enter'.
  // Forces admins to face input validation when submitting edit item form
  // since pressing 'enter' can avoid validation.
  const disableEnterSubmit = (event) => {
    if (event.keyCode === 13 ) {
      event.preventDefault();
    }
  }

  // Whenever a field in the edit item form is filled and the admin
  // clicks away, this runs to validate the field value.
  const handleBlur = (event) => {
    setErrors({
      ...errors,
      [event.target.name]: event.target.validity.patternMismatch ||
      (event.target.value.trim() === "")
    });
  };

  // Update field values in the edit item form whenever it changes.
  // Done like this to facilitate input validation.
  const handleFormChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    })
  }

  return (
    <React.Fragment>
      <Dialog open={openDialog} fullWidth='true'>
        <DialogActions>
          <IconButton color="primary" aria-label="close-dialog" onClick={handleDialog}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogTitle textAlign='center' variant='h4'>
          {action === "create" ? "Add New Item" : item.name}
        </DialogTitle>

        <DialogContent>
        {/*Form starts here*/}
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
          onSubmit={action === "create" ? commitCreate : commitEdit}
        >
          <TextField
            id="form-name"
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
              pattern: '[a-zA-Z0-9 ]*', // Limit characters used to reduce the chances of this being misused.
            }}
          />
          <TextField
            id="form-qty"
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
            id="form-price"
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
            {action === "create" ? "Add Item" : "Save"}
          </Button>
        </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default ItemPropsDialog;
