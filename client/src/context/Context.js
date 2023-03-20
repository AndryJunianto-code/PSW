import React, { useContext, useState } from "react";

const DataContext = React.createContext({});

const DataContextProvider = ({ children }) => {
  const [activeProject, setActiveProject] = useState({
    projectTitle: "",
    projectId: "",
  });
  const [openDrawer, setOpenDrawer] = useState(false);
  const [viewMode, setViewMode] = useState("List");
  const [detailedTaskSelected, setDetailedTaskSelected] = useState({
    task: "",
    open: false,
  });
  const [openNewListModal, setOpenNewListModal] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };
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
        openNewListModal,
        setOpenNewListModal,
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
