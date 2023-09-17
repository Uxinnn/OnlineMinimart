import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ItemCounter from './itemCounter';
import { Button } from '@mui/material';
import { editItems, getAllItems } from '../Apis.js';


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'qty', label: 'Quantity', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 100}, 
  { id: 'amount', label: 'Amount', minWidth: 100}
];

const UserItemList = () => {
  const [itemList, setItemList] = React.useState([]);
  const [cart, setCart] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    getAllItems().then((data)=>{
      setItemList(data.data)
    });
  }, [])

  const handleAddToCart = (item, count) => {
    setCart({
      ...cart,
      [item.id]: {"count": count, "item": item, "itemPrice": (count * item['price'])}
    })
  }

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
                      <TableCell>

                      </TableCell>
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
                  <React.Fragment>
                    <TableRow>
                      <TableCell>{cart[key]['item']['name']}</TableCell>
                      <TableCell align="right">{cart[key]['count']}</TableCell>
                      <TableCell align="right">{cart[key]['itemPrice'].toFixed(2)}</TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              }
            })}
            <TableRow>
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

export default UserItemList
