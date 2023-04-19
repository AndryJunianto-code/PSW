import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useListContext } from "../../context/listContext";
import { useMutation } from "react-query";
import { changeDueDate } from "../../request/listRequest";
import dayjs from "dayjs";
import { useSocketContext } from "../../context/socketContext";

const CalendarModalDay = ({ rowIdx, day, task }) => {
  const { currentList } = useListContext();
  const { socket } = useSocketContext();
  const [isHover, setIsHover] = useState(false);
  const isToday = dayjs().format("DD MMM YYYY") === day.format("DD MMM YYYY");
  const isDueDate = task?.dueDate === day.format("MMM DD YYYY");

  const handleHover = () => setIsHover(true);
  const handleUnhover = () => setIsHover(false);

  const { mutate: mutateDueDate } = useMutation(changeDueDate, {
    onSuccess: (data) => {
      socket.emit("setDueDate", data);
    },
  });

  const handleSetDueDate = () => {
    mutateDueDate({
      listId: currentList,
      taskId: task?.taskId,
      dueDate: day.format("MMM DD YYYY"),
    });
  };

  return (
    <Box
      onMouseOver={handleHover}
      onMouseOut={handleUnhover}
      onClick={handleSetDueDate}
      sx={{ cursor: "pointer" }}
    >
      {rowIdx === 0 && (
        <Typography variant="caption" padding="0.3rem">
          {day.format("dd").toUpperCase()}
        </Typography>
      )}
      <Box className="gridMiniItem">
        <Typography
          variant="caption"
          color={
            ((isToday || isDueDate) && "white") || isHover
              ? "white"
              : "gray.fontMDark"
          }
          backgroundColor={
            isDueDate
              ? "primary.main"
              : isToday
              ? "#f17ead"
              : isHover
              ? "primary.medium"
              : ""
          }
          padding="0.25rem"
          borderRadius={isToday && !isDueDate ? "50px" : "4px"}
        >
          {day.format("DD")}
        </Typography>
      </Box>
    </Box>
  );
};

export default CalendarModalDay;
