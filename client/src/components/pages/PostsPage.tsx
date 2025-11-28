// import { Box } from '@mui/material';
// import React from 'react';
// import { useAppSelector } from '../../redux/hooks';
// import EditModal from '../ui/EditModal';
// import PostCard from '../ui/PostCard';
// import PostForm from '../ui/PostForm';

// export default function PostsPage(): JSX.Element {
//   const posts = useAppSelector((store) => store.posts.posts);

//   return (
//     <>
//       <PostForm />
//       <br />
//       <Box display="flex" flexWrap="wrap" justifyContent="center">
//         {posts.map((post) => (
//           <Box key={post.id} mr={3} mb={3}>
//             <PostCard post={post} />
//           </Box>
//         ))}
//       </Box>
//       <EditModal />
//     </>
//   );
// }

// components/ui/PostCard.tsx

// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardActions,
//   Typography,
//   IconButton,
//   Box,
//   Chip
// } from '@mui/material';
// import {
//   Favorite,
//   FavoriteBorder,
//   Edit,
//   Delete
// } from '@mui/icons-material';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { toggleLikeThunk } from '../../redux/slices/like/likeThunks';
// import type { PostType } from '../../types/postTypes';

// interface PostCardProps {
//   post: PostType;
//   onEdit?: (post: PostType) => void;
//   onDelete?: (postId: number) => void;
// }

// export default function PostCard({ post, onEdit, onDelete }: PostCardProps): JSX.Element {
//   const dispatch = useAppDispatch();
//   const { likedPostIds, likesCount } = useAppSelector((state) => state.like);
//   const user = useAppSelector((state) => state.auth.user);
  
//   const isLiked = likedPostIds.includes(post.id);
//   const postLikeCount = likesCount[post.id] || 0;
//   const isAuthor = user.status === 'logged' && user.id === post.userId;

  // const handleLikeClick = () => {
  //   if (user.status !== 'logged') {
  //     // Можно добавить redirect на логин или показать snackbar
  //     return;
  //   }
  //   dispatch(toggleLikeThunk(post.id));
  // };

  // return (
  //   <Card sx={{ maxWidth: 345, minWidth: 300, m: 1, position: 'relative' }}>
  //     {/* Бейдж количества лайков */}
  //     {postLikeCount > 0 && (
  //       <Chip
  //         label={postLikeCount}
  //         size="small"
  //         color="primary"
  //         sx={{
  //           position: 'absolute',
  //           top: 8,
  //           right: 8,
  //           backgroundColor: 'primary.main',
  //           color: 'white'
  //         }}
  //       />
  //     )}
      
  //     <CardContent>
  //       <Typography gutterBottom variant="h5" component="h2">
          {/* {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {post.body}
        </Typography>
        
        {/* Информация об авторе */}
      //   <Typography variant="caption" color="text.secondary">
      //     Автор: {post.User?.username || 'Неизвестен'}
      //   </Typography>
      // </CardContent>

      // <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
      //   <Box>
      //     {/* Кнопка лайка */}
//           <IconButton 
//             aria-label="like"
//             onClick={handleLikeClick}
//             color={isLiked ? 'error' : 'default'}
//             disabled={user.status !== 'logged'}
//           >
//             {isLiked ? <Favorite /> : <FavoriteBorder />}
//           </IconButton>
//         </Box>

//         <Box>
//           {/* Кнопки редактирования/удаления (только для автора) */}
//           {isAuthor && (
//             <>
//               <IconButton 
//                 aria-label="edit"
//                 onClick={() => onEdit?.(post)}
//                 size="small"
//               >
//                 <Edit />
//               </IconButton>
//               <IconButton 
//                 aria-label="delete"
//                 onClick={() => onDelete?.(post.id)}
//                 size="small"
//                 color="error"
//               >
//                 <Delete />
//               </IconButton>
//             </> */}
// //           )}
// //         </Box>
// //       </CardActions>
// //     </Card>
// //   );
// // }

// components/pages/PostsPage.tsx


// components/pages/PostsPage.tsx
// import { Box, Snackbar, Alert } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { getBatchLikesThunk, getUserLikesThunk } from '../../redux/slices/like/likeThunks';
// import { clearError } from '../../redux/slices/like/likeSlice';
// import EditModal from '../ui/EditModal';
// import PostCard from '../ui/PostCard';
// import PostForm from '../ui/PostForm';

// export default function PostsPage(): JSX.Element {
//   const dispatch = useAppDispatch();
//   const posts = useAppSelector((store) => store.posts.posts);
//   const isAuthenticated = useAppSelector((store) => store.auth.user.status === 'logged');
  
//   // Типизированные селекторы
//   const likesError = useAppSelector((store) => store.like.error);
//   const likesLoading = useAppSelector((store) => store.like.loading);

//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   // Автоматически показываем snackbar при ошибке
//   useEffect(() => {
//     if (likesError) {
//       setSnackbarOpen(true);
//     }
//   }, [likesError]);

//   // Загружаем лайки при монтировании
//   useEffect(() => {
//     if (isAuthenticated) {
//       void dispatch(getUserLikesThunk());
//     }
    
//     if (posts.length > 0) {
//       const postIds = posts.map(post => post.id);
//       void dispatch(getBatchLikesThunk(postIds));
//     }
//   }, [dispatch, isAuthenticated, posts.length]);

//   const handleCloseSnackbar = (): void => {
//     setSnackbarOpen(false);
//     dispatch(clearError()); // Очищаем ошибку в store
//   };

//   return (
//     <>
//       <PostForm />
      
//       {/* Показываем индикатор загрузки если нужно */}
//       {likesLoading && (
//         <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
//           <Alert severity="info">Loading likes...</Alert>
//         </Box>
//       )}
      
//       <Box display="flex" flexWrap="wrap" justifyContent="center" sx={{ mt: 2 }}>
//         {posts.map((post) => (
//           <Box key={post.id} mr={3} mb={3}>
//             <PostCard post={post} />
//           </Box>
//         ))}
//       </Box>
      
//       {/* Snackbar для ошибок */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity="error" 
//           sx={{ width: '100%' }}
//         >
//           {likesError}
//         </Alert>
//       </Snackbar>

//       <EditModal />
//     </>
//   );
// }

// //2 var
// import { Box, Snackbar, Alert } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { getBatchLikesThunk, getUserLikesThunk } from '../../redux/slices/like/likeThunks';
// import { clearError } from '../../redux/slices/like/likeSlice';
// import { getPostsThunk } from '../../redux/slices/posts/postsThunks'; // ✅ ДОБАВИТЬ ЭТОТ ИМПОРТ
// import EditModal from '../ui/EditModal';
// import PostCard from '../ui/PostCard';
// import PostForm from '../ui/PostForm';

// export default function PostsPage(): JSX.Element {
//   const dispatch = useAppDispatch();
//   const posts = useAppSelector((store) => store.posts.posts);
//   const isAuthenticated = useAppSelector((store) => store.auth.user.status === 'logged');
  
//   // Типизированные селекторы
//   const likesError = useAppSelector((store) => store.like.error);
//   const likesLoading = useAppSelector((store) => store.like.loading);

//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   // Автоматически показываем snackbar при ошибке
//   useEffect(() => {
//     if (likesError) {
//       setSnackbarOpen(true);
//     }
//   }, [likesError]);

//   // ✅ ИСПРАВЛЕННЫЙ useEffect: загружаем посты при монтировании
//   useEffect(() => {
//     // Загружаем посты
//     void dispatch(getPostsThunk());
    
//     // Загружаем лайки если пользователь авторизован
//     if (isAuthenticated) {
//       void dispatch(getUserLikesThunk());
//     }
//   }, [dispatch, isAuthenticated]);

//   // ✅ ОТДЕЛЬНЫЙ useEffect для загрузки лайков когда посты обновляются
//   useEffect(() => {
//     if (posts.length > 0) {
//       const postIds = posts.map(post => post.id);
//       void dispatch(getBatchLikesThunk(postIds));
//     }
//   }, [dispatch, posts]); // ✅ Зависимость от posts, а не posts.length

//   const handleCloseSnackbar = (): void => {
//     setSnackbarOpen(false);
//     dispatch(clearError());
//   };

//   return (
//     <>
//       <PostForm />
      
//       {/* Показываем индикатор загрузки если нужно */}
//       {likesLoading && (
//         <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
//           <Alert severity="info">Loading likes...</Alert>
//         </Box>
//       )}
      
//       <Box display="flex" flexWrap="wrap" justifyContent="center" sx={{ mt: 2 }}>
//         {posts.map((post) => (
//           <Box key={post.id} mr={3} mb={3}>
//             <PostCard post={post} />
//           </Box>
//         ))}
//       </Box>
      
//       {/* Snackbar для ошибок */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity="error" 
//           sx={{ width: '100%' }}
//         >
//           {likesError}
//         </Alert>
//       </Snackbar>

//       <EditModal />
//     </>
//   );
// }

// с бесконечным скроллом
import { Box, Snackbar, Alert, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getBatchLikesThunk, getUserLikesThunk } from '../../redux/slices/like/likeThunks';
import { clearError } from '../../redux/slices/like/likeSlice';
import { getPostsThunk, getMorePostsThunk } from '../../redux/slices/posts/postsThunks';
import EditModal from '../ui/EditModal';
import PostCard from '../ui/PostCard';
import PostForm from '../ui/PostForm';

export default function PostsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  
  // ✅ ПРАВИЛЬНЫЕ СЕЛЕКТОРЫ
  const posts = useAppSelector((store) => store.posts.posts);
  const hasMore = useAppSelector((store) => store.posts.infiniteScroll.hasMore);
  const currentInfiniteScrollPage = useAppSelector((store) => store.posts.infiniteScroll.currentPage);
  const postsLoading = useAppSelector((store) => store.posts.loading);
  const isAuthenticated = useAppSelector((store) => store.auth.user.status === 'logged');
  const currentUser = useAppSelector((store) => store.auth.user); // ✅ ДОБАВИЛИ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ
  
  // Типизированные селекторы для лайков
  const likesError = useAppSelector((store) => store.like.error);
  const likesLoading = useAppSelector((store) => store.like.loading);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // ✅ ФИЛЬТРАЦИЯ ПОСТОВ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ
  const userPosts = useMemo(() => {
    if (!currentUser.id || currentUser.status !== 'logged') return [];
    
    return posts.filter(post => post.userId === currentUser.id);
  }, [posts, currentUser]);

  // Автоматически показываем snackbar при ошибке
  useEffect(() => {
    if (likesError) {
      setSnackbarOpen(true);
    }
  }, [likesError]);

  // ✅ ЗАГРУЗКА ПЕРВОЙ СТРАНИЦЫ ПРИ МОНТИРОВАНИИ
  useEffect(() => {
    const initializePosts = async () => {
      await dispatch(getPostsThunk()); // Загружаем первую страницу
      setInitialLoad(false);
    };

    void initializePosts();
    
    // Загружаем лайки если пользователь авторизован
    if (isAuthenticated) {
      void dispatch(getUserLikesThunk());
    }
  }, [dispatch, isAuthenticated]);

  // ✅ ОТДЕЛЬНЫЙ useEffect для загрузки лайков когда посты обновляются
  useEffect(() => {
    if (posts.length > 0) {
      const postIds = posts.map(post => post.id);
      void dispatch(getBatchLikesThunk(postIds));
    }
  }, [dispatch, posts]);

  // ✅ ОБРАБОТЧИК СКРОЛЛА (ИСПРАВЛЕННЫЙ)
  const handleScroll = useCallback(() => {
    if (postsLoading || !hasMore) return;

    // Проверяем, достигли ли мы низа страницы
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Загружаем следующую страницу когда до низа осталось 200px
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      const nextPage = currentInfiniteScrollPage + 1;
      void dispatch(getMorePostsThunk(nextPage));
    }
  }, [postsLoading, hasMore, currentInfiniteScrollPage, dispatch]);

  // ✅ ДОБАВЛЯЕМ И УБИРАЕМ ОБРАБОТЧИК СКРОЛЛА
  useEffect(() => {
    if (initialLoad) return;

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, initialLoad]);

  const handleCloseSnackbar = (): void => {
    setSnackbarOpen(false);
    dispatch(clearError());
  };

  return (
    <>
      <PostForm />
      
      {/* Заголовок с именем пользователя */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h5" component="h1">
          Мои посты
        </Typography>
        {currentUser.status === 'logged' && (
          <Typography variant="body2" color="text.secondary">
            Пользователь: {currentUser.username}
          </Typography>
        )}
      </Box>
      
      {/* Показываем индикатор загрузки если нужно */}
      {likesLoading && (
        <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
          <Alert severity="info">Loading likes...</Alert>
        </Box>
      )}
      
      <Box display="flex" flexWrap="wrap" justifyContent="center" sx={{ mt: 2 }}>
        {userPosts.map((post) => (
          <Box key={post.id} mr={3} mb={3}>
            <PostCard post={post} />
          </Box>
        ))}
      </Box>

      {/* Индикатор загрузки внизу */}
      {postsLoading && (
        <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Сообщение когда посты закончились */}
      {!hasMore && userPosts.length > 0 && (
        <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Вы просмотрели все свои посты
          </Typography>
        </Box>
      )}

      {/* Сообщение когда нет постов */}
      {!initialLoad && userPosts.length === 0 && !postsLoading && (
        <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
          <Typography variant="body1" color="text.secondary">
            {currentUser.status === 'logged' 
              ? 'У вас пока нет постов. Создайте первый!' 
              : 'Войдите в систему чтобы увидеть свои посты'
            }
          </Typography>
        </Box>
      )}
      
      {/* Snackbar для ошибок */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {likesError}
        </Alert>
      </Snackbar>

      <EditModal />
    </>
  );
}