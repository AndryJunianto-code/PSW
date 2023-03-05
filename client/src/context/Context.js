import React, { useContext, useState } from "react";

const DataContext = React.createContext({});

const DataContextProvider = ({ children }) => {
  const [activeProject, setActiveProject] = useState("");
  return (
    <DataContext.Provider
      value={{
        activeProject,
        setActiveProject,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};

export { DataContext, DataContextProvider };
