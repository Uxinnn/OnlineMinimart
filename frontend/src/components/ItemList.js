import React from 'react';
import Axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ItemActions from './ItemActions';
import ItemCreateDialog from './ItemCreateDialog';



const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'qty', label: 'Quantity', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 100}, 
  { id: 'actions', label: 'Actions', minWidth: 100}
];

const ItemList = props => {
  const [itemList, setItemList] = React.useState([]);
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
    Axios.get("http://localhost:3001/web/api/v1/items").then((data)=>{
    setItemList(data.data)
    });
  }, [])

  return (
    <div>
      <h2>Items Catalog</h2>
      <ItemCreateDialog />
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
                        if (column.id === "actions") {
                          return (
                            <TableCell>
                              <ItemActions item={row} />
                            </TableCell>
                            )
                        }
                        return (
                          <TableCell key={column.id}>
                            {row[column.id]}
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
    </div>
  );
}

export default ItemList