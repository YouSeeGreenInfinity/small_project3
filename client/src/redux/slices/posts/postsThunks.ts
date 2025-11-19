import { createAsyncThunk } from '@reduxjs/toolkit';
import postsService from '../../../services/postsService';
import type { PostFormType, PostType } from '../../../types/postTypes';

export const getPostsThunk = createAsyncThunk<PostType[]>('posts/getPosts', async () => {
  const data = await postsService.getPosts();
  return data;
});

export const addPostThunk = createAsyncThunk<PostType, PostFormType>(
  'posts/addPost',
  async (formData) => {
    const data = await postsService.submitPost(formData);
    return data;
  },
);

export const deletePostThunk = createAsyncThunk<PostType['id'], PostType['id']>(
  'posts/deletePost',
  async (id) => {
    await postsService.deletePost(id);
    return id;
  },
);

export const editPostThunk = createAsyncThunk<
  PostType,
  { formData: PostFormType; id: PostType['id'] }
>('posts/editPost', async ({ formData, id }) => {
  const data = await postsService.editPost(formData, id);
  return data;
});
