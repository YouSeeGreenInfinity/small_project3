// components/pages/IndexPage.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';
import PostCard from '../ui/PostCard';

function IndexPage(): JSX.Element {
  const posts = useAppSelector((store) => store.posts.posts);
  
  // ✅ Фильтруем только опубликованные посты
  const publishedPosts = posts.filter(post => post.published === true);

  console.log('📊 IndexPage - All posts:', posts.length);
  console.log('📊 IndexPage - Published posts:', publishedPosts.length);
  console.log('📊 IndexPage - Published posts data:', publishedPosts);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Опубликованные посты
      </Typography>
      
      {publishedPosts.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Пока нет опубликованных постов
        </Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {publishedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default IndexPage;