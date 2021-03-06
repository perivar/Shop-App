import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  diff: true,
});
import rootReducer from '../slices';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Define a reusable AppThunk type once, in your store file, and then use that type whenever you write a thunk:
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
