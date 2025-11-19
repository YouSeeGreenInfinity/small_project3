import { createSlice } from '@reduxjs/toolkit';
import type { UserStateType } from '../../../types/userTypes';
import { checkUserThunk, loginThunk, logoutThunk, signUpThunk } from './authThunks';

type AuthState = { accessToken: string; user: UserStateType; error: string };
const initialState: AuthState = { accessToken: '', user: { status: 'pending' }, error: '' };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserThunk.pending, (state, action) => {
        state.user.status = 'pending';
      })
      .addCase(checkUserThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = { ...action.payload.user, status: 'logged' };
      })
      .addCase(checkUserThunk.rejected, (state, action) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = { ...action.payload.user, status: 'logged' };
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.accessToken = '';
        state.user = { status: 'guest' };
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = { ...action.payload.user, status: 'logged' };
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      });
  },
});

export const { setError } = authSlice.actions;

export default authSlice.reducer;
