import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  loading = false 
}: PaginationProps): JSX.Element {
  const handlePrevious = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return <></>;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap={2} sx={{ mt: 3, mb: 3 }}>
      <Button
        variant="outlined"
        startIcon={<NavigateBefore />}
        onClick={handlePrevious}
        disabled={currentPage <= 1 || loading}
      >
        Назад
      </Button>
      
      <Typography variant="body1" color="text.secondary">
        Страница {currentPage} из {totalPages}
      </Typography>
      
      <Button
        variant="outlined"
        endIcon={<NavigateNext />}
        onClick={handleNext}
        disabled={currentPage >= totalPages || loading}
      >
        Вперед
      </Button>
    </Box>
  );
}

export default Pagination;