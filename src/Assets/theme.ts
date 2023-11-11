import { createTheme } from "@mui/material";

export const theme = createTheme({
   palette: {
      primary: {
         main: '#3f50b5',
         dark: '#002884',
         contrastText: '#fff',
         light: '#757ce8',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
})