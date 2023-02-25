import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#645CBB", //dark purple
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
    gray: {
      bgLight: "#fafbfc",
      fontMDark: "#959ba6",
    },
  },
  typography: {
    fontFamily: `"Lato", "sans-serif"`,
  },
});
