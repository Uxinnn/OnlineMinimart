import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow} from '@mui/material';
import ItemActions from '../components/ItemActions';
import ItemCreateDialog from '../components/ItemCreateDialog';
import {getAllItems} from '../Apis.js'


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'qty', label: 'Quantity', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 100}, 
  { id: 'actions', label: 'Actions', minWidth: 100}
];

const AdminPage = () => {
  // Admin page for Pat and employees to manage items in the online store.

  // Use to retreive all items from database since number of items is small.
  // If there are large number of items, can consider fetching based on range
  // to prevent retrieval taking too long and using too much memory storing all
  // items.
  const [itemList, setItemList] = React.useState([]);
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

  return (
    <div>
      <h2>Items Management Catalog</h2>
      <ItemCreateDialog />
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
                        if (column.id === "actions") {
                          return (
                            <TableCell>
                              {/*Contains logic for editing and deleting item*/}
                              <ItemActions item={row} />
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
    </div>
  );
}

export default AdminPage
