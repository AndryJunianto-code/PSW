import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDataContext } from "../../context/Context";
import IndividualList from "../individual/IndividualList";
import { useMutation, useQuery } from "react-query";
import {
  changeTaskPositionWithinList,
  fetchAllListsInProject,
} from "../../request/listRequest";
import NewListModal from "./NewListModal";
import { useSocketContext } from "../../context/socketContext";
import { useListContext } from "../../context/listContext";
import { useParams } from "react-router-dom";
const ListView = () => {
  const { setOpenNewListModal } = useDataContext();
  const { activeProjectTitle, activeProjectId } = useParams();
  const { socket } = useSocketContext();
  const { allList, setAllList } = useListContext();
  const handleOpenNewListModal = () => setOpenNewListModal(true);
  const { data: listData, isSuccess: listSuccess } = useQuery(
    ["getAllListsInProject", activeProjectId],
    fetchAllListsInProject,
    { retryDelay: 3000 }
  );

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
    listData && setAllList(listData);
  }, [listSuccess, listData]);
  useEffect(() => {
    socket.on("createNewTask", (data) => {
      if (allList !== null) {
        const updatedList = allList.map((list) =>
          list._id === data._id ? data : list
        );
        setAllList(updatedList);
      }
    });

    return () => socket.off("createNewTask");
  }, [socket, allList]);

  return (
    <Box
      backgroundColor="gray.bgLight"
      mt="5.5rem"
      mx="0.8rem"
      borderRadius={"4px"}
      height="100vh"
      border="0.5px solid #f0f0f0"
      pl="0.8rem"
      pt="0.4rem"
    >
      <DragDropContext onDragEnd={(result) => handleDragEnd(result, allList)}>
        <Stack direction="row" alignItems="center">
          <Typography fontWeight="700">{activeProjectTitle}</Typography>
          <Typography
            variant="caption"
            color="gray.fontMDark"
            fontWeight="500"
            ml="1rem"
            sx={{ cursor: "pointer" }}
            onClick={handleOpenNewListModal}
          >
            + New list
          </Typography>
        </Stack>
        {allList !== null &&
          allList.map((list) => <IndividualList list={list} key={list._id} />)}
      </DragDropContext>
      <NewListModal />
    </Box>
  );
};

export default ListView;
