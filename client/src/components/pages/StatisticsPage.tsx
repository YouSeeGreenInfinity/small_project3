import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';

export default function StatisticsPage(): JSX.Element {
  const cats = useAppSelector((store) => store.cats);
  const posts = useAppSelector((store) => store.posts.posts);

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Table sx={{ maxWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Posts</TableCell>
            <TableCell align="center">Cats</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="center">{posts.length}</TableCell>
            <TableCell align="center">{cats.length}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}
