import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import authService from '../../../services/authService';
import type { UserAuthType, UserLoginType, UserSignUpType } from '../../../types/userTypes';

export const checkUserThunk = createAsyncThunk<UserAuthType>('auth/check', async () => {
  const data = await authService.checkUser();
  return data;
});

export const signUpThunk = createAsyncThunk<UserAuthType, UserSignUpType>(
  'auth/signup',
  async (formData, thunkApi) => {
    try {
      const data = await authService.signUpUser(formData);
      return data;
    } catch (error) {
      const err = error as AxiosError<Error>;
      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const loginThunk = createAsyncThunk<UserAuthType, UserLoginType>(
  'auth/login',
  async (formData) => {
    const data = await authService.loginUser(formData);
    return data;
  },
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});
