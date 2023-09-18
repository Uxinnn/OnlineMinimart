import React from "react";
import { Button, CardContent } from "@mui/material";
import {Typography} from "@mui/material";
import {Card, CardActions, CardMedia, Box} from "@mui/material";
import BannerLogo from '../BannerLogo.png'


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
        <CardMedia
          component="img"
          height="194"
          image={BannerLogo}
          alt="Welcome Banner"
        />
        <CardContent sx={{textAlign: 'center'}}>
          <Typography variant='h3' sx={{mx: 2}}>Are you Pat?</Typography>
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
