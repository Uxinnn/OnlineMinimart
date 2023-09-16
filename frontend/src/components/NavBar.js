import React from 'react';
import { Box, Typography, AppBar, Container, Toolbar, Button, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material';


const NavBar = props => {
    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters width="50px">
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;