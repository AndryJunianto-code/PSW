import "./App.css";
import MainHome from "./pages/MainHome";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainHome />
    </ThemeProvider>
  );
}

export default App;
