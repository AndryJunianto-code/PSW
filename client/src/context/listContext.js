import React, { useContext, useState } from "react";

const ListContext = React.createContext();
export const ListContextProvider = ({ children }) => {
  const [allList, setAllList] = useState([]);
  return (
    <ListContext.Provider
      value={{
        allList,
        setAllList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export const useListContext = () => {
  return useContext(ListContext);
};
