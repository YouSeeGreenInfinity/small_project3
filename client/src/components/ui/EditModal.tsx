import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleModal } from '../../redux/slices/posts/postsSlice';
import { editPostThunk } from '../../redux/slices/posts/postsThunks';
import type { PostFormType } from '../../types/postTypes';

export default function EditModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const currPost = useAppSelector((store) => store.posts.currPost);

  return (
    <Dialog
      open={!!currPost}
      onClose={() => dispatch(toggleModal(null))}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (currPost) {
            const formData = Object.fromEntries(new FormData(event.currentTarget)) as PostFormType;
            void dispatch(editPostThunk({ formData, id: currPost.id }));
            dispatch(toggleModal(null));
          }
        },
      }}
    >
      <DialogTitle>Edit post</DialogTitle>
      <DialogContent>
        <Box my={5}>
          <TextField variant="outlined" name="title" defaultValue={currPost?.title} />
          <TextField variant="outlined" name="body" defaultValue={currPost?.body} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(toggleModal(null))}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
