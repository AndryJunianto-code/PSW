import { Button } from "@mui/material";
import "./App.css";
import MainHome from "./pages/MainHome";
import AuthProvider from "./auth/AuthProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<MainHome />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
