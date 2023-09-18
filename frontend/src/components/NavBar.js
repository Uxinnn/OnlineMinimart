import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, AppBar, Container, Toolbar, Button } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';


const NavBar = props => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters width="50px">
          <StoreIcon fontSize='large'/>
          <Box sx={{ flexGrow: 1 }}>
            Pat's Minimart
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button variant='contained' startIcon={<LogoutIcon />} sx={{ boxShadow: 0 }} href='/'>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;