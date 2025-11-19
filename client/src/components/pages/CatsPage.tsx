import { Box } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import CatCard from '../ui/CatCard';

export default function CatsPage(): JSX.Element {
  const cats = useAppSelector((store) => store.cats);
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" mt={5}>
      {cats.map((cat) => (
        <Box mr={3} mb={2} key={cat.id}>
          <CatCard cat={cat} />
        </Box>
      ))}
    </Box>
  );
}
