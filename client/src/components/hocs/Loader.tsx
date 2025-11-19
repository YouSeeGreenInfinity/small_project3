import { Box } from '@mui/material';
import React from 'react';
import { Hearts } from 'react-loader-spinner';

type LoaderProps = {
  children: React.ReactElement;
  isLoading: boolean;
};

export default function Loader({ children, isLoading }: LoaderProps): JSX.Element {
  if (isLoading)
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Hearts
          height="200"
          width="200"
          color="#008080"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible
        />
      </Box>
    );
  return children;
}
