export default function listModalReducer(state, action) {
  switch (action.type) {
    case "openListModal":
      return {
        ...state,
        open: true,
      };
    case "closeListModal":
      return {
        open: false,
        listTitle: "",
        listColor: "#40bc86",
        listId: "",
        updateMode: false,
      };
    case "handleListTitle":
      return {
        ...state,
        listTitle: action.listTitle,
      };
    case "handleListColor":
      return {
        ...state,
        listColor: action.listColor,
      };
    case "openListModalUpdate":
      return {
        open: true,
        listTitle: action.listTitle,
        listColor: action.listColor,
        listId: action.listId,
        updateMode: true,
      };
    default:
      throw new Error();
  }
}
