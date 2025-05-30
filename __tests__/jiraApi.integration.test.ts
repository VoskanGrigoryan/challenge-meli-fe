import { configureStore } from '@reduxjs/toolkit';
import { jiraApi } from '../src/redux/features/jira/JiraSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

describe('jiraApi integration', () => {
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

  it('should start with initial state', () => {
    const state = store.getState()[jiraApi.reducerPath];
    expect(state).toBeDefined();
  });

  // You can add more integration tests with MSW or fetch mocks for endpoints
});
