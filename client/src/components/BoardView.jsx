import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ListDroppable } from "../utils/ListDroppable";
import IndividualBoardTask from "./individual/IndividualBoardTask";
import IndividualBoardList from "./individual/IndividualBoardList";
import { useDataContext } from "../context/Context";
import { useListContext } from "../context/listContext";
import { useSocketContext } from "../context/socketContext";
import { changeTaskPositionWithinList } from "../request/listRequest";
import { useMutation } from "react-query";

const BoardView = () => {
  const { activeProject } = useDataContext();
  const { allList, setAllList } = useListContext();
  const { socket } = useSocketContext();

  const { mutate: mutateTaskPositionWithinList } = useMutation(
    changeTaskPositionWithinList
  );

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
    </Box>
  );
};

export default BoardView;
