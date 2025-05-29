import { configureStore } from "@reduxjs/toolkit";
import jiraReducer from "./features/jira/jiraSlice";

export const store = configureStore({
  reducer: {
    jira: jiraReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
