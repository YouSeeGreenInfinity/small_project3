import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PostType } from '../../../types/postTypes';

interface TrashState {
  items: PostType[];
}

const initialState: TrashState = {
  items: [],
};

const trashSlice = createSlice({
  name: 'trash',
  initialState,
  reducers: {
    addToTrash: (state, action: PayloadAction<PostType>) => {
      state.items.push(action.payload);
    },
    removeFromTrash: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    restoreFromTrash: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearTrash: (state) => {
      state.items = [];
    },
    // ✅ ДОБАВЬТЕ ЭТОТ ACTION
    setTrashItems: (state, action: PayloadAction<PostType[]>) => {
      state.items = action.payload;
    },
  },
});

export const { 
  addToTrash, 
  removeFromTrash, 
  restoreFromTrash, 
  clearTrash,
  setTrashItems // ✅ ЭКСПОРТИРУЙТЕ
} = trashSlice.actions;
export default trashSlice.reducer;