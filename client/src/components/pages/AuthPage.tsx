/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { loginThunk, signUpThunk } from '../../redux/slices/auth/authThunks';
import type { UserLoginType, UserSignUpType } from '../../types/userTypes';

export default function AuthPage(): JSX.Element {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    pathname === '/signup'
      ? void dispatch(signUpThunk(formData as UserSignUpType))
      : void dispatch(loginThunk(formData as UserLoginType));
  };

  return (
    <Grid container>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <Box
          display="flex"
          flexDirection="column"
          mt={5}
          justifyContent="center"
          component="form"
          onSubmit={submitHandler}
        >
          {pathname === '/signup' && (
            <TextField variant="outlined" name="username" label="username" />
          )}
          <TextField variant="outlined" name="email" type="email" label="email" />
          <TextField variant="outlined" name="password" type="password" label="password" />
          <Box mt={3} display="flex" justifyContent="center">
            <Button variant="contained" type="submit">
              {pathname === '/signup' ? 'Sign Up' : 'Login'}
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
}
