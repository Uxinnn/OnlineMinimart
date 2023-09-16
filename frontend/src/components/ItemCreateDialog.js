import React from 'react';
import Axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import Box from '@mui/material/Box';
import {createItem} from '../apis.js';


const ItemCreateDialog = () => {
const [openCreate, setOpenCreate] = React.useState(false);

const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleCreate = (event) => {
    event.preventDefault();
    const body = {
      name: event.target.name.value,
      qty: Number(event.target.qty.value), 
      price: Number(event.target.price.value)
    }
    createItem(body);
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
            label="Name"
            name="name"
            fullWidth
          />
          <TextField
            id="create-qty"
            label="Quantity"
            name="qty"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="create-price"
            label="price"
            name="price"
          />
          <Button type="submit" variant="outlined" variant="contained">Add item</Button>
        </Box>
      </DialogContent>
    </Dialog>
  </React.Fragment>
  )
}

export default ItemCreateDialog;
