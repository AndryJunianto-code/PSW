import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useListContext } from "../../context/listContext";
import { useDataContext } from "../../context/Context";
import { useSocketContext } from "../../context/socketContext";

const IndividualBoardTask = ({ task, index, listId, listTitle }) => {
  const { taskId, taskTitle } = task;
  const { setCurrentList } = useListContext();
  const { setDetailedTaskSelected, detailedTaskSelected } = useDataContext();
  const { socket } = useSocketContext();

  const handleOpenDetailTask = (e) => {
    e.preventDefault();
    setCurrentList(listId);
    if (
      e.target === e.currentTarget ||
      e.target === e.currentTarget.childNodes[0] ||
      e.target.getAttribute("data-title") === "title"
    ) {
      setDetailedTaskSelected({
        taskTitle,
        taskId,
        listId,
        listTitle,
        open: true,
      });
      socket.emit("joinTask", taskId);
    }
  };
  useEffect(() => {
    if (detailedTaskSelected.taskId === taskId) {
      setDetailedTaskSelected((prev) => ({ ...prev, listId, listTitle }));
    }
  }, [listId, listTitle]);
  return <></>;
};

export default IndividualBoardTask;
