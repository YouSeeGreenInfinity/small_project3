import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { decrement, increment, incrementByAmount } from '../../redux/slices/counter/counterSlice';

export default function CounterPage(): JSX.Element {
  const counter = useAppSelector((store) => store.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Grid container direction="row">
      <Grid item xs={4} />
      <Grid item xs={4}>
        <Box mt={5} display="flex" flexDirection="column" justifyContent="center">
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Button sx={{ margin: 1 }} variant="contained" onClick={() => dispatch(increment())}>
              +
            </Button>

            <Button sx={{ margin: 1 }} variant="contained" onClick={() => dispatch(decrement())}>
              -
            </Button>

            <Button
              sx={{ margin: 1 }}
              variant="contained"
              onClick={() => dispatch(incrementByAmount(42))}
            >
              42
            </Button>
          </Box>
          <Box mt={3} display="flex" flexDirection="row" justifyContent="center">
            <Typography variant="h4">{counter}</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
