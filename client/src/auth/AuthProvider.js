import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { Router, useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate(window.location.pathname);
  };

  const auth0config = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  };
  return (
    <Auth0Provider {...auth0config} onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
