import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  message: string | null;
  isOpen: boolean;
}

const initialState: ErrorState = {
  message: null,
  isOpen: false,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.isOpen = true;
    },
    clearError: (state) => {
      state.message = null;
      state.isOpen = false;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;