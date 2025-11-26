// import { createAsyncThunk } from '@reduxjs/toolkit';
// import postsService from '../../../services/postsService';
// import type { PostFormType, PostType } from '../../../types/postTypes';

// export const getPostsThunk = createAsyncThunk<PostType[]>('posts/getPosts', async () => {
//   const data = await postsService.getPosts();
//   return data;
// });

// export const addPostThunk = createAsyncThunk<PostType, PostFormType>(
//   'posts/addPost',
//   async (formData) => {
//     const data = await postsService.submitPost(formData);
//     return data;
//   },
// );

// export const deletePostThunk = createAsyncThunk<PostType['id'], PostType['id']>(
//   'posts/deletePost',
//   async (id) => {
//     await postsService.deletePost(id);
//     return id;
//   },
// );

// export const editPostThunk = createAsyncThunk<
//   PostType,
//   { formData: PostFormType; id: PostType['id'] }
// >('posts/editPost', async ({ formData, id }) => {
//   const data = await postsService.editPost(formData, id);
//   return data;
// });


import { createAsyncThunk } from '@reduxjs/toolkit';
import postsService from '../../../services/postsService';
import type { PostFormType, PostType } from '../../../types/postTypes';

export const getPostsThunk = createAsyncThunk<PostType[]>(
  'posts/getPosts', 
  async (_, { rejectWithValue }) => {
    try {
      const data = await postsService.getPosts();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to get posts');
    }
  }
);

export const addPostThunk = createAsyncThunk<PostType, PostFormType>(
  'posts/addPost',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await postsService.submitPost(formData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create post');
    }
  }
);

export const deletePostThunk = createAsyncThunk<PostType['id'], PostType['id']>(
  'posts/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      await postsService.deletePost(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete post');
    }
  }
);

export const editPostThunk = createAsyncThunk<
  PostType,
  { formData: PostFormType; id: PostType['id'] }
>(
  'posts/editPost', 
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const data = await postsService.editPost(formData, id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to edit post');
    }
  }
);

export const publishPostThunk = createAsyncThunk<
  PostType, // возвращаемый тип
  PostType['id'] // тип аргумента (id поста)
>(
  'posts/publishPost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await postsService.publishPost(postId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to publish post');
    }
  }
);