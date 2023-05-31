import { Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import getMonth from "../../utils/getMonth";
import Day from "./Day";
import dayjs from "dayjs";
import { DragDropContext } from "react-beautiful-dnd";
import { useListContext } from "../../context/listContext";
import { changeDueDate } from "../../request/listRequest";
import { useMutation } from "react-query";
import { useSocketContext } from "../../context/socketContext";

const CalendarView = ({ currentMonth }) => {
  const { allList, setAllList } = useListContext();
  const { socket } = useSocketContext();
  const [allTasks, setAllTasks] = useState([]);
  const [dateObject, setDateObject] = useState({});

  const { mutate: mutateDueDate, isLoading: isLoadingDueDate } = useMutation(
    changeDueDate,
    {
      onSuccess: (data) => {},
    }
  );

  const handleDragEnd = (result, listData) => {
    const { destination } = result;
    if (!destination) return;
    const ids = result.draggableId.split(" ");
    const updatedList = listData.filter((list) => list._id === ids[1])[0];
    const indexOfUpdatedList = listData.indexOf(updatedList);
    updatedList.tasks.map((task) => {
      if (task.taskId === ids[0]) {
        task.dueDate = destination.droppableId;
      }
    });
    listData.splice(indexOfUpdatedList, 1, updatedList);
    console.log(listData);
    mutateDueDate({
      listId: ids[1],
      taskId: ids[0],
      dueDate: destination.droppableId,
    });
    socket.emit("changeIndividualCalendarTask", listData);
  };

  useEffect(() => {
    socket.on("changeIndividualCalendarTask", (data) => {
      setAllList(data);
    });
    return () => {
      socket.off("changeIndividualCalendarTask");
    };
  }, [socket]);
  useEffect(() => {
    if (allList !== null) {
      allList.map((list) => {
        setAllTasks((task) => [...task, ...list.tasks]);
      });
    }
    return () => setAllTasks([]);
  }, [allList]);
  useEffect(() => {
    let tempDateObject = {};
    allTasks &&
      allTasks.map((task) => {
        if (task.dueDate) {
          if (tempDateObject.hasOwnProperty(task.dueDate)) {
            tempDateObject[task.dueDate].push(task);
          } else {
            tempDateObject[task.dueDate] = [task];
          }
        }
      });
    setDateObject(tempDateObject);
    return () => setDateObject({});
  }, [allTasks]);
  return (
    <DragDropContext onDragEnd={(result) => handleDragEnd(result, allList)}>
      <Box backgroundColor="gray.bgLight" mt="5rem" height="90vh">
        <div className="gridSystem">
          {currentMonth &&
            currentMonth.map((row, i) => (
              <React.Fragment key={i}>
                {row.map((day, idx) => (
                  <Day
                    day={day}
                    key={idx.toString() + i.toString()}
                    rowIdx={i}
                    idx={idx}
                    allTasks={allTasks}
                    dateObject={dateObject}
                  />
                ))}
              </React.Fragment>
            ))}
        </div>
      </Box>
    </DragDropContext>
  );
};

export default CalendarView;
