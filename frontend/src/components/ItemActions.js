import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton, Button, TextField, Box, Dialog, DialogTitle,
  DialogContent, DialogActions, InputAdornment} from '@mui/material';
import {deleteItem, editItem} from "../Apis.js";


const ItemActions = ({item}) => {
  // Used for admins to edit or delete items in the store.

  // For opening/closing the edit item dialog
  const [openEdit, setOpenEdit] = React.useState(false);
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

  // For opening/closing edit item dialog
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // For updating database after an item has been edited.
  const handleEdit = (event) => {
    event.preventDefault();
    const body = {
      name: formValues.name,
      qty: Number(formValues.qty), 
      price: Number(formValues.price)
    };
    editItem(item.id, body, true);
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

  // Deletes the item from the database.
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
        {/*Edit item form starts here*/}
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
              pattern: '[a-zA-Z0-9 ]*', // Limit characters used to reduce the chances of this being misused.
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
            Save
          </Button>
        </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default ItemActions;
