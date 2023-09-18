import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { deleteItem } from "../Apis.js";


const DeleteItemIcon = ({item}) => {
  // Used for admins to delete items in the store.

  // Deletes the item from the database.
  const handleDelete = (event) => {
    event.preventDefault();
    deleteItem(item.id);
  }

  return (
    <React.Fragment>
      {/* Delete icon shown on items catalog */}
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </React.Fragment>
  )
}

export default DeleteItemIcon;
