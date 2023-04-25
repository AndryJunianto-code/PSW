import React, { useContext } from "react";
import socketIO from "socket.io-client";

const socket = socketIO.connect(
  /* "https://psw-production.up.railway.app/" */ "http://localhost:5000/"
);
const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};
