import { Box } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import EditModal from '../ui/EditModal';
import PostCard from '../ui/PostCard';
import PostForm from '../ui/PostForm';

export default function PostsPage(): JSX.Element {
  const posts = useAppSelector((store) => store.posts.posts);

  return (
    <>
      <PostForm />
      <br />
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {posts.map((post) => (
          <Box key={post.id} mr={3} mb={3}>
            <PostCard post={post} />
          </Box>
        ))}
      </Box>
      <EditModal />
    </>
  );
}
