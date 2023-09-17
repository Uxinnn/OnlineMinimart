import React from "react";
import { Button, CardContent } from "@mui/material";
import {Typography} from "@mui/material";
import {Card, CardActions, Box} from "@mui/material";


const Home = () => {
  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Card sx={{boxShadow: 0}}>
        <CardContent>
          <Typography variant='h1' sx={{m: 4}}>Are you Pat?</Typography>
        </CardContent>
        <CardActions sx={{justifyContent: 'center'}}>
          <Button variant="contained" sx={{m: 2}} href="/admin">Yes</Button>
          <Button variant="contained" sx={{m: 2}} href="/user">No</Button>
        </CardActions>
        </Card>
      </Box>
    </React.Fragment>
  )
}

export default Home;
