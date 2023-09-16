import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import Box from '@mui/material/Box';
import {deleteItem, editItem} from "../Apis.js";
import { Refresh } from '@mui/icons-material';


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
      name: event.target.name.value,
      qty: Number(event.target.qty.value), 
      price: Number(event.target.price.value)
    };
    editItem(item.id, body, true);
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
            label="Name"
            name="name"
            defaultValue={item.name}
            fullWidth
          />
          <TextField
            id="edit-qty"
            label="Quantity"
            name="qty"
            defaultValue={item.qty}
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
          />
          <Button type="submit" variant="outlined" variant="contained">Save</Button>
        </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default ItemActions;
