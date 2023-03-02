import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <Link to="/app">app</Link>
      <Button onClick={() => loginWithRedirect()}>Login</Button>;
    </>
  );
};

export default Home;
