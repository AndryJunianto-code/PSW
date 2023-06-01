import { useEffect, useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ListDroppable } from "../../utils/ListDroppable";
import IndividualCalendarTask from "./IndividualCalendarTask";
import dayjs from "dayjs";
import { v4 } from "uuid";
import NewTaskModal from "./NewTaskModal";

const Day = ({ day, rowIdx, dateObject }) => {
  const [showTaskIcon, setShowTaskIcon] = useState(false);
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);
  const isToday = dayjs().format("DD MMM YYYY") === day.format("DD MMM YYYY");
  const hasPassed = isToday
    ? "#56ffb5"
    : new Date(day).getTime() <= new Date().getTime()
    ? "#fcb410"
    : "#fdf4b3";

  const handleHover = () => {
    if (!openNewTaskModal) {
      setShowTaskIcon(true);
    }
  };
  const handleUnhover = () => {
    if (!openNewTaskModal) {
      setShowTaskIcon(false);
    }
  };
  const dayFormatted = dayjs(day).format("MMM DD YYYY");

  const newTaskAnchorRef = useRef(null);
  const handleToggleModal = () => {
    setOpenNewTaskModal((prev) => !prev);
  };
  return (
    <Box
      className="gridItem"
      onMouseOver={handleHover}
      onMouseOut={handleUnhover}
    >
      <Box sx={{ position: "relative" }}>
        {rowIdx === 0 && (
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {day.format("ddd").toUpperCase()}
          </Typography>
        )}
        <ListDroppable droppableId={dayFormatted}>
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                position: "absolute",
                top: "0.2rem",
                width: "100%",
                minHeight: "6rem",
              }}
            >
              {dateObject.hasOwnProperty(dayFormatted) &&
                dateObject[dayFormatted]?.map((task, index) => (
                  <IndividualCalendarTask
                    key={task.taskId}
                    index={index}
                    task={task}
                    hasPassed={hasPassed}
                  />
                ))}
              {provided.placeholder}
            </Box>
          )}
        </ListDroppable>

        <div
          className={`${rowIdx === 0 ? "headerAlignment" : "dateAlignment"}`}
        >
          {showTaskIcon && (
            <Box
              ref={newTaskAnchorRef}
              onClick={handleToggleModal}
              mr="0.4rem"
              sx={{
                backgroundColor: "primary.main",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "0.8rem",
                height: "0.8rem",
                padding: "0.1rem",
                position: "absolute",
                top: "6.7rem",
                right: "1rem",
              }}
            >
              <AddIcon sx={{ color: "white", fontSize: "1rem" }} />
            </Box>
          )}
          <NewTaskModal
            newTaskAnchorRef={newTaskAnchorRef}
            openNewTaskModal={openNewTaskModal}
            setOpenNewTaskModal={setOpenNewTaskModal}
            date={dayFormatted}
          />
          <Typography
            variant="caption"
            color="gray.fontMDark"
            sx={{
              position: "absolute",
              top: "6.6rem",
              backgroundColor: isToday && "#645CBB",
              borderRadius: isToday && "50%",
              px: isToday && "0.2rem",
              color: isToday && "white",
            }}
          >
            {day.format("DD")}
          </Typography>
        </div>
      </Box>
    </Box>
  );
};

export default Day;
