import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Button} from '@mui/material';
import ItemCounter from '../components/itemCounter.js';
import { editItems, getAllItems } from '../Apis.js';


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'qty', label: 'Quantity', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 100}, 
  { id: 'amount', label: 'Amount', minWidth: 100}
];

const UserPage = () => {
  // User page for customers to browse and buy items from the minimart.

  // Use to retreive all items from database since number of items is small.
  // If there are large number of items, can consider fetching based on range
  // to prevent retrieval taking too long and using too much memory storing all
  // items.
  const [itemList, setItemList] = React.useState([]);
  // Used to keep track of items to be bought and their price.
  const [cart, setCart] = React.useState({});
  // States used for pagination of table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Retrieve all items
  React.useEffect(() => {
    getAllItems().then((data)=>{
      setItemList(data.data)
    });
  }, [])

  // Handles used to manage pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Use this to add/remove items from cart whenever a customer selects an item
  const handleAddToCart = (item, count) => {
    setCart({
      ...cart,
      [item.id]: {"count": count, "item": item, "itemPrice": (count * item['price'])}
    })
  }

  // Called when the customer clicks pay. Use to update item quantity in database.
  const handlePay = () => {
    const items = [];
    for (const [itemId, itemData] of Object.entries(cart)) {
      items.push({
        "id": itemId,
        "qty": itemData['item']['qty'] - itemData['count']
      })
    }
    editItems(items);
  }

  return (
    <div>
      <h2>Items Catalog</h2>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">

            {/*Creating table column headers*/}
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/*Populate table with items with pagination*/}
            <TableBody>
              {itemList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      {columns.map((column) => {
                        if (column.id === "amount") {
                          return (
                            <TableCell>
                              {/*Contains logic for adding/removing items to cart*/}
                              <ItemCounter item={row} handleAddToCart={handleAddToCart} />
                            </TableCell>
                            )
                        }
                        return (
                          <TableCell key={column.id}>
                            {(column.id === 'price') ? row[column.id].toFixed(2) : row[column.id]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={itemList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/*Payment cart logic for customers to see items to be purchased and total cost*/}
      <h3>Your Cart</h3>
      <TableContainer component={Paper} sx={{ maxWidth: 600 , my: 2}}>
        <Table aria-label="cart table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Item Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(cart).map((key, index) => {
              if (cart[key]['count'] > 0) {
                return (
                    <TableRow>
                      <TableCell>{cart[key]['item']['name']}</TableCell>
                      <TableCell align="right">{cart[key]['count']}</TableCell>
                      <TableCell align="right">{cart[key]['itemPrice'].toFixed(2)}</TableCell>
                    </TableRow>
                );
              }
            })}
            <TableRow>
              {/*Calculate and show total cost*/}
              <TableCell><b>Total Cost:</b></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">
                {Object.keys(cart).reduce((previous, key) => {
                  return previous + cart[key].itemPrice;
                }, 0).toFixed(2)
                }
              </TableCell>
            </TableRow>
          </TableBody>
          <Button variant='contained' sx={{m: 2}} onClick={handlePay}>Pay</Button>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserPage
