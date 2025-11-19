import { CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import type { CatType } from '../../types/catTypes';

type CatItemProps = {
  cat: CatType;
};

function CatItem({ cat }: CatItemProps): JSX.Element {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia component="img" height="200" width="200" image={cat.img} />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {cat.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default React.memo(CatItem);
