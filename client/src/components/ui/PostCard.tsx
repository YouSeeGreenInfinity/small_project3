import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { toggleModal } from '../../redux/slices/posts/postsSlice';
import { deletePostThunk } from '../../redux/slices/posts/postsThunks';
import type { PostType } from '../../types/postTypes';

type PostCardPropsType = {
  post: PostType;
};

function PostCard({ post }: PostCardPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  console.log(`Post #${post.id}`);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Post of the Day
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {post.title}
        </Typography>
        <Typography variant="body2">{post.body}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => void dispatch(deletePostThunk(post.id))}>
          Delete
        </Button>
        <Button size="small" onClick={() => void dispatch(toggleModal(post))}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}

export default React.memo(PostCard);
