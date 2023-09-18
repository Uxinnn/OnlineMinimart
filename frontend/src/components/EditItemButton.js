import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import ItemPropsDialog from './ItemPropsDialog.js';


const EditItemButton = ({item}) => {
  // Used for admins to edit items in the store.
  // Opens a dialog form for editting the item.

  // For opening/closing the edit item dialog
  const [openEdit, setOpenEdit] = React.useState(false);

  // For opening/closing edit item dialog
  const handleEdit = (event) => {
    setOpenEdit(!openEdit);
  };

  return (
    <React.Fragment>
      {/* Edit button shown on items catalog */}
      <IconButton aria-label="edit" onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <ItemPropsDialog item={item} action="edit" openDialog={openEdit} handleDialog={handleEdit}/>
    </React.Fragment>
  )
}

export default EditItemButton;
