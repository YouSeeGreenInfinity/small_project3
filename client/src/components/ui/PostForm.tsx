import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { addPostThunk } from '../../redux/slices/posts/postsThunks';
import type { PostFormType } from '../../types/postTypes';

function PostForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<PostFormType>({ title: '', body: '' });

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      component="form"
      my={5}
      onSubmit={(e) => {
        e.preventDefault();
        void dispatch(addPostThunk(input));
        setInput({ title: '', body: '' });
      }}
    >
      <TextField name="title" value={input.title} onChange={changeHandler} />
      <TextField name="body" value={input.body} onChange={changeHandler} />
      <Button type="submit">submit</Button>
    </Box>
  );
}

export default React.memo(PostForm);
