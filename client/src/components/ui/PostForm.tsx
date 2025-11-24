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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔄 PostForm submitting:', {
      formData: input,
      hasTitle: !!input.title,
      hasBody: !!input.body,
      timestamp: new Date().toISOString()
    });

    // ✅ ИСПРАВЛЕННЫЙ КОД:
    dispatch(addPostThunk(input))
      .unwrap()
      .then(() => {
        console.log('✅ Post created successfully!');
        setInput({ title: '', body: '' });
      })
      .catch((error) => {
        console.log('❌ Post creation failed:', error);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      component="form"
      my={5}
      onSubmit={handleSubmit}
      sx={{ gap: 2 }}
    >
      <TextField 
        name="title" 
        value={input.title} 
        onChange={changeHandler}
        label="Title"
        required
      />
      <TextField 
        name="body" 
        value={input.body} 
        onChange={changeHandler}
        label="Content"
        required
        multiline
        rows={2}
      />
      <Button type="submit" variant="contained">
        Create Post
      </Button>
    </Box>
  );
}

export default React.memo(PostForm);