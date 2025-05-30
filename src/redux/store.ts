import { configureStore } from "@reduxjs/toolkit";
import { jiraApi } from "./features/jira/JiraSlice";

export const store = configureStore({
  reducer: {
    [jiraApi.reducerPath]: jiraApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jiraApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
