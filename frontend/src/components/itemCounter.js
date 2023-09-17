import React from 'react';
import TextField from '@mui/material/TextField';


const ItemCounter = ({item, handleAddToCart}) => {
  // Used to keep track of the quantity of an item a user is intending to purchase.

  const [count, setCount] = React.useState(0);

  const handleCountChange = (event) => {
    // Input validation to ensure the number of items wanted by the user is
    // in stock.
    if (event.target.value > -1 && event.target.value < item.qty + 1){
      setCount(Number(event.target.value));
      handleAddToCart(item, Number(event.target.value))
    }
  }

  return (
    <React.Fragment>
      <TextField
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0, max: item.qty }}
        label="To purchase"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleCountChange}
        value={count}
      />
    </React.Fragment>
  )
}

export default ItemCounter;
