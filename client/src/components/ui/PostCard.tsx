
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Box from '@mui/material/Box';
// import Chip from '@mui/material/Chip';
// import { Favorite, FavoriteBorder, Edit, Delete } from '@mui/icons-material';
// import * as React from 'react';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { toggleModal } from '../../redux/slices/posts/postsSlice';
// import { deletePostThunk, publishPostThunk } from '../../redux/slices/posts/postsThunks';
// import { toggleLikeThunk, getLikesCountThunk } from '../../redux/slices/like/likeThunks';
// import type { PostType } from '../../types/postTypes';
// import PublishButton from './PublishButton';

// type PostCardPropsType = {
//   post: PostType;
// };

// function PostCard({ post }: PostCardPropsType): JSX.Element {
//   const dispatch = useAppDispatch();
  
//   // Получаем данные из Redux store
//   const user = useAppSelector((store) => store.auth.user);
//   const { likedProductIds, likesCount, loading } = useAppSelector((store) => store.like);

//   // ✅ ДОБАВИМ ОТЛАДКУ ДЛЯ ПРОВЕРКИ ДАННЫХ
//   console.log('🔍 PostCard Debug:', {
//     postId: post.id,
//     postData: post,
//     userData: user,
//     hasUserId: 'userId' in post,
//     hasUser: 'User' in post,
//     postUserId: post.userId,
//     postUser: post.User,
//     currentUserId: user.id
//   });
  
//   // Проверяем лайки
//   const isLiked = likedProductIds.includes(post.id);
//   const likeCount = likesCount[post.id] || 0;
//   const isAuthor = user.status === 'logged' && user.id === post.userId;

//   // Обработчик лайка
//   const handleLikeClick = (): void => {
//     if (user.status !== 'logged') {
//       // Можно добавить уведомление о необходимости авторизации
//       console.log('Please login to like posts');
//       return;
//     }
//     void dispatch(toggleLikeThunk(post.id));
//   };

//   // Обработчик удаления
//   const handleDelete = (): void => {
//     if (window.confirm('Are you sure you want to delete this post?')) {
//       void dispatch(deletePostThunk(post.id));
//     }
//   };

//   // Обработчик редактирования
//   const handleEdit = (): void => {
//     dispatch(toggleModal(post));
//   };

//   // Загружаем количество лайков при монтировании
//   React.useEffect(() => {
//     if (!likesCount[post.id]) {
//       void dispatch(getLikesCountThunk(post.id));
//     }
//   }, [dispatch, post.id, likesCount]);

//   console.log(`Post #${post.id}`, { isLiked, likeCount });


//   // Обработчик публикации
//   const handlePublish = (): void => {
//     if (user.status !== 'logged') {
//       console.log('Please login to publish posts');
//       return;
//     }
//     void dispatch(publishPostThunk(post.id));
//   };

//   return (
//     <Card sx={{ minWidth: 275, maxWidth: 345, position: 'relative' }}>
//       {/* Бейдж количества лайков */}
//       {likeCount > 0 && (
//         <Chip
//           label={likeCount}
//           size="small"
//           color="primary"
//           sx={{
//             position: 'absolute',
//             top: 8,
//             right: 8,
//             backgroundColor: 'primary.main',
//             color: 'white',
//             fontWeight: 'bold'
//           }}
//         />
//       )}
      
//       <CardContent>
//         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//           Post #{post.id}
//         </Typography>
//         <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
//           {post.title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//           {post.body}
//         </Typography>
        
//         {/* Информация об авторе */}
//         {post.User && (
//           <Typography variant="caption" color="text.secondary">
//             By: {post.User.username}
//           </Typography>
//         )}
//       </CardContent>

//       <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
//         {/* Кнопка лайка */}
//         <Box>
//           <IconButton 
//             aria-label="like"
//             onClick={handleLikeClick}
//             disabled={loading || user.status !== 'logged'}
//             color={isLiked ? 'error' : 'default'}
//             sx={{
//               transition: 'all 0.2s ease-in-out',
//               '&:hover': {
//                 transform: 'scale(1.1)',
//                 backgroundColor: isLiked ? 'error.light' : 'action.hover'
//               }
//             }}
//           >
//             {isLiked ? <Favorite /> : <FavoriteBorder />}
//           </IconButton>
//         </Box>

//         {/* Кнопки управления (только для автора) */}
//         <Box>
//           {isAuthor ? (
//             <>
//               <IconButton 
//                 aria-label="edit"
//                 onClick={handleEdit}
//                 size="small"
//                 color="primary"
//                 sx={{ mr: 1 }}
//               >
//                 <Edit />
//               </IconButton>
//               <IconButton 
//                 aria-label="delete"
//                 onClick={handleDelete}
//                 size="small"
//                 color="error"
//               >
//                 <Delete />
//               </IconButton>
//             </>
//           ) : (
//             <Typography variant="caption" color="text.secondary">
//               {isAuthor ? 'Your post' : ''}
//             </Typography>
//           )}

// <PublishButton
//   onClick={handlePublish}
//   disabled={user.status !== 'logged' || post.published}
//   loading={loading} // можно использовать существующее loading
//   isPublished={post.published} // ✅ передаем статус публикации
// />

//         </Box>
//       </CardActions>
//     </Card>
//   );
// }

// export default React.memo(PostCard);


import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Favorite, FavoriteBorder, Edit, Delete } from '@mui/icons-material';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleModal } from '../../redux/slices/posts/postsSlice';
import { deletePostThunk, publishPostThunk } from '../../redux/slices/posts/postsThunks';
import { toggleLikeThunk, getLikesCountThunk } from '../../redux/slices/like/likeThunks';
import type { PostType } from '../../types/postTypes';
import PublishButton from './PublishButton';

type PostCardPropsType = {
  post: PostType;
};

function PostCard({ post }: PostCardPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  
  // Получаем данные из Redux store
  const user = useAppSelector((store) => store.auth.user);
  const { likedProductIds, likesCount, loading } = useAppSelector((store) => store.like);

  // ✅ ДОБАВИМ ОТЛАДКУ ДЛЯ ПРОВЕРКИ ДАННЫХ
  console.log('🔍 PostCard Debug:', {
    postId: post.id,
    postData: post,
    userData: user,
    hasUserId: 'userId' in post,
    hasUser: 'User' in post,
    postUserId: post.userId,
    postUser: post.User,
    currentUserId: user.id
  });
  
  // Проверяем лайки
  const isLiked = likedProductIds.includes(post.id);
  const likeCount = likesCount[post.id] || 0;
  const isAuthor = user.status === 'logged' && user.id === post.userId;

  // Обработчик лайка
  const handleLikeClick = (): void => {
    if (user.status !== 'logged') {
      // Можно добавить уведомление о необходимости авторизации
      console.log('Please login to like posts');
      return;
    }
    void dispatch(toggleLikeThunk(post.id));
  };

  // Обработчик удаления
  const handleDelete = (): void => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      void dispatch(deletePostThunk(post.id));
    }
  };

  // Обработчик редактирования
  const handleEdit = (): void => {
    dispatch(toggleModal(post));
  };

  // Обработчик публикации
  const handlePublish = (): void => {
    if (user.status !== 'logged') {
      console.log('Please login to publish posts');
      return;
    }
    
    console.log('🔄 Publishing post:', post.id);
    void dispatch(publishPostThunk(post.id))
      .unwrap()
      .then((updatedPost) => {
        console.log('✅ Post published successfully in component:', updatedPost);
        console.log('✅ Post published status:', updatedPost.published);
      })
      .catch((error) => {
        console.log('❌ Publish failed:', error);
      });
  };

  // Загружаем количество лайков при монтировании
  React.useEffect(() => {
    if (!likesCount[post.id]) {
      void dispatch(getLikesCountThunk(post.id));
    }
  }, [dispatch, post.id, likesCount]);

  console.log(`Post #${post.id}`, { isLiked, likeCount, published: post.published });

  return (
    <Card sx={{ minWidth: 275, maxWidth: 345, position: 'relative' }}>
      
      {/* Бейдж "Опубликовано" - СЛЕВА */}
      {post.published && (
        <Chip
          label="Опубликовано"
          size="small"
          color="success"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            fontWeight: 'bold',
            backgroundColor: 'success.main',
            color: 'white'
          }}
        />
      )}
      
      {/* Бейдж количества лайков - СПРАВА */}
      {likeCount > 0 && (
        <Chip
          label={likeCount}
          size="small"
          color="primary"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'primary.main',
            color: 'white',
            fontWeight: 'bold'
          }}
        />
      )}
      
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Post #{post.id}
        </Typography>
        <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {post.body}
        </Typography>
        
        {/* Информация об авторе */}
        {post.User && (
          <Typography variant="caption" color="text.secondary">
            By: {post.User.username}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
        {/* Кнопка лайка */}
        <Box>
          <IconButton 
            aria-label="like"
            onClick={handleLikeClick}
            disabled={loading || user.status !== 'logged'}
            color={isLiked ? 'error' : 'default'}
            sx={{
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: isLiked ? 'error.light' : 'action.hover'
              }
            }}
          >
            {isLiked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>

        {/* Кнопки управления (только для автора) */}
        <Box>
          {isAuthor ? (
            <>
              <IconButton 
                aria-label="edit"
                onClick={handleEdit}
                size="small"
                color="primary"
                sx={{ mr: 1 }}
              >
                <Edit />
              </IconButton>
              <IconButton 
                aria-label="delete"
                onClick={handleDelete}
                size="small"
                color="error"
              >
                <Delete />
              </IconButton>
            </>
          ) : (
            <Typography variant="caption" color="text.secondary">
              {isAuthor ? 'Your post' : ''}
            </Typography>
          )}

          <PublishButton
            onClick={handlePublish}
            disabled={user.status !== 'logged' || post.published}
            loading={loading}
            isPublished={post.published}
          />
        </Box>
      </CardActions>
    </Card>
  );
}

export default React.memo(PostCard);
