import React, { useContext, useState, useEffect } from "react";

const DataContext = React.createContext({});

const DataContextProvider = ({ children }) => {
  const [activeProject, setActiveProject] = useState(
    JSON.parse(localStorage.getItem("activeProject")) || {
      projectTitle: "",
      projectId: "",
    }
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const [viewMode, setViewMode] = useState("List");
  const [detailedTaskSelected, setDetailedTaskSelected] = useState({
    task: "",
    open: false,
  });
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };
  useEffect(() => {
    localStorage.setItem("activeProject", JSON.stringify(activeProject));
  }, [activeProject]);
  return (
    <DataContext.Provider
      value={{
        activeProject,
        setActiveProject,
        openDrawer,
        setOpenDrawer,
        viewMode,
        setViewMode,
        toggleDrawer,
        detailedTaskSelected,
        setDetailedTaskSelected,
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
