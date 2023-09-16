import React from 'react';
import TextField from '@mui/material/TextField';


const ItemCounter = ({item, handleAddToCart}) => {
  const [count, setCount] = React.useState(0);

  const handleCountChange = (event) => {
    console.log(event.target.value)
    if (event.target.value > -1 && event.target.value < item.qty + 1){
      setCount(Number(event.target.value));
      handleAddToCart(item, Number(event.target.value))
    }
  }

  return (
    <React.Fragment>
      <TextField
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0, max: item.qty }}
        label="Number"
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
