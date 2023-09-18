import { createTheme } from "@mui/material/styles";
import { grey, green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      // main: "#B1F7D8", 
      main: green[500],
    },
    secondary: {
      main: grey[500],
    },
  },
});

export default theme
