import { createAsyncThunk } from '@reduxjs/toolkit';
import { addToTrash } from './trashSlice';
import postsService from '../../../services/postsService';


export const moveToTrashThunk = createAsyncThunk(
  'trash/moveToTrash',
  async ({ postId, post }: { postId: number; post: PostType }, { dispatch }) => {
    try {
      console.log('🔄 Moving post to trash via service:', postId);
      
      // ✅ ИСПОЛЬЗУЙТЕ POSTS SERVICE - он уже настроен с правильным URL
      await postsService.moveToTrash(postId);
      
      // ✅ ДОБАВЛЯЕМ В ЛОКАЛЬНУЮ КОРЗИНУ
      dispatch(addToTrash(post));
      
      console.log('✅ Post moved to trash and added locally:', postId);
      
      return postId;
    } catch (error: any) {
      console.error('❌ Move to trash failed:', error);
      throw new Error(error.message || 'Failed to move to trash');
    }
  }
);