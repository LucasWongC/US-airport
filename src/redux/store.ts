import { configureStore } from '@reduxjs/toolkit';
import airportSlice from './slices/airportSlice';

export const store = configureStore({
  reducer: {
    data: airportSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
