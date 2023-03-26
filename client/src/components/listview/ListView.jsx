import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDataContext } from "../../context/Context";
import IndividualList from "../individual/IndividualList";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  changeTaskPositionWithinList,
  fetchAllListsInProject,
} from "../../request/listRequest";
import NewListModal from "./NewListModal";
import { useSocketContext } from "../../context/socketContext";

const ListView = () => {
  const { activeProject, setOpenNewListModal } = useDataContext();
  const { socket } = useSocketContext();
  const queryClient = useQueryClient();
  const handleOpenNewListModal = () => setOpenNewListModal(true);
  const [allList, setAllList] = useState([]);
  const {
    data: listData,
    isSuccess: listSuccess,
    refetch: listRefetch,
  } = useQuery(
    ["getAllListsInProject", activeProject?.projectId],
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
      (task) => task.taskId === draggableId
    )[0];

    sourceList.tasks.splice(source.index, 1);
    destinationList.tasks.splice(destination.index, 0, draggingCard);
    socket.emit("changePositionListData", listData);
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
  };

  useEffect(() => {
    socket.on("changePositionListData", (data) =>
      queryClient.invalidateQueries({ queryKey: ["getAllListsInProject"] })
    );
  }, [socket]);
  useEffect(() => {
    listSuccess && setAllList(listData);
  }, [listSuccess]);
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
      <DragDropContext onDragEnd={(result) => handleDragEnd(result, listData)}>
        <Stack direction="row" alignItems="center">
          <Typography fontWeight="700">{activeProject.projectTitle}</Typography>
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
        {listSuccess &&
          listData.map((list) => (
            <IndividualList list={list} listRefetch={listRefetch} />
          ))}
      </DragDropContext>
      <NewListModal />
    </Box>
  );
};

export default ListView;
