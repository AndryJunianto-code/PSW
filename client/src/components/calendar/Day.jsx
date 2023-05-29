import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ListDroppable } from "../../utils/ListDroppable";
import IndividualCalendarTask from "./IndividualCalendarTask";
import dayjs from "dayjs";
import { v4 } from "uuid";

const Day = ({ day, rowIdx, dateObject }) => {
  const [showTaskIcon, setShowTaskIcon] = useState(false);
  const handleHover = () => setShowTaskIcon(true);
  const handleUnhover = () => setShowTaskIcon(false);
  const dayFormatted = dayjs(day).format("MMM DD YYYY");

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
          <Typography
            variant="caption"
            color="gray.fontMDark"
            sx={{ position: "absolute", top: "6.6rem" }}
          >
            {day.format("DD")}
          </Typography>
        </div>
      </Box>
    </Box>
  );
};

export default Day;
