import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import ItemPropsDialog from './ItemPropsDialog.js';



const CreateItemButton = () => {
  // Used for admins to create items in the store.
  // Opens a dialog form for item creation.

  const [openCreate, setOpenCreate] = React.useState(false);

  const handleCreate = () => {
    setOpenCreate(!openCreate);
  };

  // default values for create item form
  const dummyItem = {"name": "", "qty": 0, "price": 0}

  return (
    <React.Fragment>
      {/* Create item button shown on top of item catalogue */}
      <Button onClick={handleCreate} startIcon={<AddIcon />} variant="contained" sx={{ my: 2}}>
        Create Item
      </Button>
      <ItemPropsDialog item={dummyItem} action="create" openDialog={openCreate} handleDialog={handleCreate}/>
    </React.Fragment>
  )
}

export default CreateItemButton;
