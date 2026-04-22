import { configureStore } from "@reduxjs/toolkit";

import {
  boardsReducer,
  listsReducer,
  tasksReducer,
  usersReducer,
} from "@/entities";

export default configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    tasks: tasksReducer,
    user: usersReducer,
  },
});
