import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDataContext } from "../../context/Context";
import IndividualList from "../individual/IndividualList";
import { useQuery } from "react-query";
import { fetchAllListsInProject } from "../../request/listRequest";

const ListView = () => {
  const { activeProject, setOpenNewListModal } = useDataContext();

  const [completed, setCompleted] = useState([
    { id: "AA", task: "cleaning" },
    { id: "BB", task: "makan" },
  ]);
  const [isListOpen, setIsListOpen] = useState(true);
  const handleOpenList = () => setIsListOpen(!isListOpen);
  const handleOpenNewListModal = () => setOpenNewListModal(true);

  const {
    data: listData,
    isSuccess: listSuccess,
    refetch: listRefetch,
  } = useQuery(
    ["getAllListsInProject", activeProject?.projectId],
    fetchAllListsInProject,
    { retryDelay: 3000 }
  );

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    console.log(source);
    console.log(destination);
  };

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
      <DragDropContext onDragEnd={handleDragEnd}>
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
    </Box>
  );
};

export default ListView;
