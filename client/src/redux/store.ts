// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import catsReducer from './slices/cats/catsSlice';
import counterReducer from './slices/counter/counterSlice';
import postsReducer from './slices/posts/postsSlice';
import likeReducer from './slices/like/likeSlice';
import errorReducer from './slices/errorSlice'; 
import trashReducer from './slices/trash/trashSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cats: catsReducer,
    posts: postsReducer,
    auth: authReducer,
    like: likeReducer, 
    error: errorReducer, 
    trash: trashReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;
