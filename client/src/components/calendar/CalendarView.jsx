import { Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import getMonth from "../../utils/getMonth";
import Day from "./Day";
import dayjs from "dayjs";
import { DragDropContext } from "react-beautiful-dnd";
import { useListContext } from "../../context/listContext";

const CalendarView = () => {
  const { allList } = useListContext();
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [allTasks, setAllTasks] = useState([]);
  const [dateObject, setDateObject] = useState({});

  const handleDragEnd = (result, listData) => {
    const { source, destination } = result;
    console.log(source, destination);
  };

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
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
  useEffect(() => {
    console.log(dateObject);
  }, [dateObject]);
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
