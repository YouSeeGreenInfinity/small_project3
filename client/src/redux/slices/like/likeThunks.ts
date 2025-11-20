// redux/slices/like/likeThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import likeService from '../../../services/likeService';

export const toggleLikeThunk = createAsyncThunk(
  'like/toggle',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await likeService.toggleLike(productId);
      return { 
        productId, 
        liked: response.liked,
        newLikeCount: response.newLikeCount 
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Like operation failed');
    }
  }
);

export const getLikesCountThunk = createAsyncThunk(
  'like/getCount',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await likeService.getLikesCount(productId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to get likes count');
    }
  }
);

export const getUserLikesThunk = createAsyncThunk(
  'like/getUserLikes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await likeService.getUserLikes();
      return response.likedProductIds;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to get user likes');
    }
  }
);

export const getBatchLikesThunk = createAsyncThunk(
  'like/getBatch',
  async (productIds: number[], { rejectWithValue }) => {
    try {
      const response = await likeService.getMultipleLikesCount(productIds);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to get batch likes');
    }
  }
);