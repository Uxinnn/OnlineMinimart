import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';


const ItemCounter = ({item, handleAddToCart}) => {
  const [count, setCount] = React.useState(1);

  const handleCountChange = (event) => {
    setCount(Number(event.target.value) + 1);
    handleAddToCart(item, count)
  }

  return (
    <React.Fragment>
      <TextField
        id="outlined-number"
        label="Number"
        type="number"
        defaultValue={0}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleCountChange}
      />
    </React.Fragment>
  )
}

export default ItemCounter;
