import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import IndividualBoardList from "./individual/IndividualBoardList";
import { useDataContext } from "../context/Context";
import { useListContext } from "../context/listContext";
import { useSocketContext } from "../context/socketContext";
import { changeTaskPositionWithinList } from "../request/listRequest";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import NewListModal from "./listview/NewListModal";

const BoardView = () => {
  const { user } = useAuth0();
  const { activeProject, setActiveProject, setDetailedTaskSelected } =
    useDataContext();
  const { allList, setAllList, listModalDispatch } = useListContext();
  const { socket } = useSocketContext();

  const { mutate: mutateTaskPositionWithinList } = useMutation(
    changeTaskPositionWithinList
  );

  const handleOpenNewListModal = () => {
    listModalDispatch({ type: "openListModal" });
  };

  const handleDragEnd = (result, listData) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    const sourceList = listData.filter(
      (list) => list._id === source.droppableId
    )[0];
    const destinationList = listData.filter(
      (list) => list._id === destination.droppableId
    )[0];
    const indexOfSourceList = listData.indexOf(sourceList);
    const indexOfDestinationList = listData.indexOf(destinationList);
    const draggingCard = sourceList.tasks.filter(
      (task) => task?.taskId === draggableId
    )[0];

    sourceList.tasks.splice(source.index, 1);
    destinationList.tasks.splice(destination.index, 0, draggingCard);
    if (source.droppableId !== destination.droppableId) {
      mutateTaskPositionWithinList({
        listId: source.droppableId,
        newTasks: listData[indexOfSourceList].tasks,
      });
    }
    mutateTaskPositionWithinList({
      listId: destination.droppableId,
      newTasks: listData[indexOfDestinationList].tasks,
    });
    socket.emit("changePositionListData", listData);
  };

  useEffect(() => {
    socket.on("changePositionListData", (data) => {
      setAllList(data);
    });

    return () => {
      socket.off("changePositionListData");
    };
  }, [socket]);
  useEffect(() => {
    socket.on("updateList", (data) => {
      if (allList !== null) {
        const updatedList = allList.map((list) =>
          list._id === data._id ? data : list
        );
        setAllList(updatedList);
      }
    });
    return () => socket.off("updateList");
  }, [socket, allList]);
  useEffect(() => {
    socket.on("deleteTask", (msg) => {
      setDetailedTaskSelected({ open: false });
    });
    return () => socket.off("deleteTask");
  }, [socket, allList]);
  useEffect(() => {
    socket.on("removeActiveProject", (data) => {
      if (user?.sub === data) {
        socket.emit("leaveProject", activeProject);
        setActiveProject({ projectTitle: "", projectId: "" });
        setAllList([]);
      }
    });
  }, [socket]);
  return (
    <Box backgroundColor="gray.bgLight" mt="7vh" height="93vh" width="100%">
      <Box pt="2rem" pl="2rem" pr="1rem">
        <DragDropContext onDragEnd={(result) => handleDragEnd(result, allList)}>
          {activeProject.projectId !== "" ? (
            <Stack
              direction="row"
              width={{ xs: "85vw", md: "95vw", lg: "80vw" }}
              sx={{ overflowX: "auto", cursor: "pointer" }}
              pb="1rem"
            >
              {allList !== null &&
                allList.map((list) => (
                  <IndividualBoardList list={list} key={list._id} />
                ))}
              <Box
                minWidth="15rem"
                mr="1.2rem"
                mt="0.5rem"
                onClick={handleOpenNewListModal}
              >
                <Typography variant="body2" mr="1.5rem" color="gray.fontMDark">
                  + New list
                </Typography>
              </Box>
            </Stack>
          ) : (
            <Typography
              variant="caption"
              color="gray.fontMDark"
              fontWeight="500"
            >
              Choose a project !
            </Typography>
          )}
        </DragDropContext>
      </Box>
      <NewListModal />
    </Box>
  );
};

export default BoardView;
