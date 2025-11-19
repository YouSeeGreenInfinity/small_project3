import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { PostType } from '../../../types/postTypes';
import { addPostThunk, deletePostThunk, editPostThunk, getPostsThunk } from './postsThunks';

type PostsState = { posts: PostType[]; currPost: PostType | null };

const initialState: PostsState = {
  posts: [],
  currPost: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<PostType | null>) => {
      state.currPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsThunk.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getPostsThunk.rejected, (state) => {
        state.posts = [];
      })
      .addCase(addPostThunk.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        state.posts = state.posts.filter((el) => el.id !== action.payload);
      })
      .addCase(editPostThunk.fulfilled, (state, action) => {
        const index = state.posts.findIndex((el) => el.id === action.payload.id);
        state.posts[index] = action.payload;
      });
  },
});

export const { toggleModal } = postsSlice.actions;

export default postsSlice.reducer;
