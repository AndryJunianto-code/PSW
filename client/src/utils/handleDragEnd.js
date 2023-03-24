const handleDragEnd = (result, listsData) => {
  const { source, destination, draggableId } = result;
  if (!destination) return;
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return;

  let add;
  let active = todos;
  let complete = completed;
  if (source.droppableId === "todo") {
    add = active[source.index];
    active.splice(source.index, 1);
  } else {
    add = complete[source.index];
    complete.splice(source.index, 1);
  }

  if (destination.droppableId === "todo") {
    active.splice(destination.index, 0, add);
  } else {
    complete.splice(destination.index, 0, add);
  }
  setCompleted(complete);
  setTodos(active);
};
