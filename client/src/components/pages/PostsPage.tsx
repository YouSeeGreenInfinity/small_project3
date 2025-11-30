import { Box, Snackbar, Alert, CircularProgress, Typography, Button } from '@mui/material';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getBatchLikesThunk, getUserLikesThunk } from '../../redux/slices/like/likeThunks';
import { clearError } from '../../redux/slices/like/likeSlice';
import { getPostsThunk, getMorePostsThunk } from '../../redux/slices/posts/postsThunks';
import EditModal from '../ui/EditModal';
import PostCard from '../ui/PostCard';
import PostForm from '../ui/PostForm';
import TrashModal from '../ui/TrashModal';
import { Delete } from '@mui/icons-material';

export default function PostsPage(): JSX.Element {
  const [trashModalOpen, setTrashModalOpen] = useState(false);
  const trashItemsCount = useAppSelector((store) => store.trash.items.length);

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
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<Delete />}
          onClick={() => setTrashModalOpen(true)}
          disabled={trashItemsCount === 0}
          color="warning"
        >
          Корзина ({trashItemsCount})
        </Button>
      </Box>
      
      {/* Модальное окно корзины */}
      <TrashModal 
        open={trashModalOpen} 
        onClose={() => setTrashModalOpen(false)} 
      />
      
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