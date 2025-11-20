import { createSlice } from '@reduxjs/toolkit';
import { LikeState } from "../../../types/likeTypes";
import { getBatchLikesThunk, getLikesCountThunk, getUserLikesThunk, toggleLikeThunk } from './likeThunks';

const initialState: LikeState = {
  likedProductIds: [],
  likesCount: {},
  loading: false,
  error: null
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    clearLikes: (state) => {
      state.likedProductIds = [];
      state.likesCount = {};
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // ✅ TOGGLE LIKE
      .addCase(toggleLikeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleLikeThunk.fulfilled, (state, action) => {
        const { productId, liked } = action.payload;
        
        // Обновляем список лайкнутых постов
        if (liked) {
          // Добавляем лайк
          if (!state.likedProductIds.includes(productId)) {
            state.likedProductIds.push(productId);
          }
        } else {
          // Удаляем лайк
          state.likedProductIds = state.likedProductIds.filter(id => id !== productId);
        }
        
        // Обновляем счетчик лайков
        state.likesCount[productId] = action.payload.newLikeCount;
        
        state.loading = false;
        state.error = null;
      })
      .addCase(toggleLikeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // ✅ GET USER LIKES
      .addCase(getUserLikesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserLikesThunk.fulfilled, (state, action) => {
        state.likedProductIds = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserLikesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // ✅ GET LIKES COUNT
      .addCase(getLikesCountThunk.fulfilled, (state, action) => {
        const { productId, count } = action.payload;
        state.likesCount[productId] = count;
      })
      .addCase(getLikesCountThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      
      // ✅ GET BATCH LIKES
      .addCase(getBatchLikesThunk.fulfilled, (state, action) => {
        action.payload.forEach((item: any) => {
          state.likesCount[item.productId] = item.count;
        });
      })
      .addCase(getBatchLikesThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export const { clearLikes, clearError } = likeSlice.actions;
export default likeSlice.reducer;