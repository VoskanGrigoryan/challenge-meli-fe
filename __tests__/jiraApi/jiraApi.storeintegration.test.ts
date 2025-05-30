import { configureStore } from '@reduxjs/toolkit';
import { jiraApi } from '../../src/redux/features/jira/JiraSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

describe('jiraApi store integration', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [jiraApi.reducerPath]: jiraApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(jiraApi.middleware),
    });
    setupListeners(store.dispatch);
  });

  it('should have a defined state for jiraApi', () => {
    const state = store.getState() as any;
    expect(state[jiraApi.reducerPath]).toBeDefined();
  });
});
