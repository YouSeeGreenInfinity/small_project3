import { createAsyncThunk } from '@reduxjs/toolkit';
import postsService from '../../../services/postsService';
import type { PostFormType, PostsResponse, PostType } from '../../../types/postTypes';

// ✅ ДЛЯ POSTS PAGE (бесконечный скролл)
export const getPostsThunk = createAsyncThunk<PostType[]>(
  'posts/getPosts', 
  async (_, { rejectWithValue }) => {
    try {
      const data = await postsService.getPosts(1, 10);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to get posts');
    }
  }
);

export const getMorePostsThunk = createAsyncThunk<PostType[], number>(
  'posts/getMorePosts',
  async (page, { rejectWithValue }) => {
    try {
      const data = await postsService.getPosts(page, 10);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to get more posts');
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
  PostType,
  PostType['id']
>(
  'posts/publishPost',
  async (postId, { rejectWithValue }) => {
    try {
      const data = await postsService.publishPost(postId); // ✅ ПРАВИЛЬНО
      console.log('✅ publishPostThunk received data:', data);
      return data; // ✅ возвращаем данные напрямую
    } catch (error: any) {
      console.error('❌ publishPostThunk error:', error);
      return rejectWithValue(error.response?.data?.error || 'Failed to publish post');
    }
  }  
);

// ✅ ДЛЯ INDEX PAGE (+пагинация!!!!)
export const getPublishedPostsThunk = createAsyncThunk<
  PostsResponse,
  { page: number; limit: number }
>(
  'posts/getPublishedPosts',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const data = await postsService.getPublishedPosts(page, limit);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to get posts');
    }
  }
);

// ✅ THUNK ДЛЯ ВОССТАНОВЛЕНИЯ ИЗ КОРЗИНЫ
export const restoreFromTrashThunk = createAsyncThunk<
  PostType,
  PostType['id']
>(
  'posts/restoreFromTrash',
  async (postId, { rejectWithValue }) => {
    try {
      const data = await postsService.restoreFromTrash(postId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to restore from trash');
    }
  }
);

// ✅ THUNK ДЛЯ ЗАГРУЗКИ КОРЗИНЫ
export const getTrashThunk = createAsyncThunk<
  PostType[]
>(
  'posts/getTrash',
  async (_, { rejectWithValue }) => {
    try {
      const data = await postsService.getUserTrash();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to get trash');
    }
  }
);