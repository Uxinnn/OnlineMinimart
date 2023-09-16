import React from 'react';
import { Box, Typography, AppBar, Container, Toolbar, Button, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';


const NavBar = props => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters width="50px">
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