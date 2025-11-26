// components/ui/PublishButton.tsx
import Button from '@mui/material/Button';
import PublishIcon from '@mui/icons-material/Publish';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from 'react';

interface PublishButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  isPublished?: boolean; // ✅ НОВЫЙ ПРОПС
}

function PublishButton({ 
  onClick, 
  disabled = false, 
  loading = false,
  isPublished = false // ✅ по умолчанию не опубликовано
}: PublishButtonProps): JSX.Element {
  
  // Если уже опубликовано - показываем другую кнопку
  if (isPublished) {
    return (
      <Button
        variant="outlined"
        size="small"
        startIcon={<CheckCircleIcon />}
        disabled
        sx={{
          fontSize: '0.7rem',
          padding: '4px 12px',
          textTransform: 'none',
          color: 'success.main',
          borderColor: 'success.main',
        }}
      >
        Опубликовано
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      size="small"
      startIcon={<PublishIcon />}
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        fontSize: '0.75rem',
        padding: '4px 12px',
        textTransform: 'none',
        minWidth: 'auto',
      }}
    >
      {loading ? 'Публикация...' : 'Опубликовать'}
    </Button>
  );
}

export default React.memo(PublishButton);