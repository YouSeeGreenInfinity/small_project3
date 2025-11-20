import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { RootState } from '../../redux/store';
import { clearError } from '../../redux/slices/errorSlice'; // или из authSlice

const ErrorSnackbar: React.FC = () => {
  const dispatch = useDispatch();
  
  // Если используете отдельный error slice
  const error = useSelector((state: RootState) => state.error);
  
  // Или если ошибка в auth slice
  // const error = useSelector((state: RootState) => state.auth.error);

  const handleClose = () => {
    dispatch(clearError());
  };

  return (
    <Snackbar
      open={error.isOpen} // или !!error.message для auth slice
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error.message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;