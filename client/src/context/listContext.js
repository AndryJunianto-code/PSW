import React, { useContext, useReducer, useState } from "react";
import listModalReducer from "../reducer/listModalReducer";

const initialListModalState = {
  open: false,
  listTitle: "",
  listColor: "#40bc86",
  listId: "",
  updateMode: true,
};
const ListContext = React.createContext();
export const ListContextProvider = ({ children }) => {
  const [allList, setAllList] = useState([]);
  const [listModalState, listModalDispatch] = useReducer(
    listModalReducer,
    initialListModalState
  );
  return (
    <ListContext.Provider
      value={{
        allList,
        setAllList,
        listModalState,
        listModalDispatch,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export const useListContext = () => {
  return useContext(ListContext);
};
