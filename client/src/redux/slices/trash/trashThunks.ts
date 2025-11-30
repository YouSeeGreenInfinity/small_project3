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

export const restoreFromTrashThunk = createAsyncThunk(
    'trash/restoreFromTrash',
    async (postId: number, { dispatch }) => {
      try {
        console.log('🔄 Restoring post from trash:', postId);
        
        // Восстанавливаем на сервере
        await postsService.restoreFromTrash(postId);
        
        // Удаляем из локальной корзины
        dispatch(restoreFromTrash(postId));
        
        // Обновляем основной список
        void dispatch(getPostsThunk());
        
        console.log('✅ Post restored successfully:', postId);
        
        return postId;
      } catch (error: any) {
        console.error('❌ Restore from trash failed:', error);
        throw new Error(error.message || 'Failed to restore from trash');
      }
    }
  );