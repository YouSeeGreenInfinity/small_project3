// import React, { useEffect } from 'react';
// import {
//   Modal,
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   CardActions,
//   IconButton,
// } from '@mui/material';
// import { Restore, DeleteForever, Close } from '@mui/icons-material';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { 
//   restoreFromTrash, 
//   removeFromTrash, 
//   clearTrash,
//   setTrashItems // ✅ ИМПОРТИРУЙТЕ
// } from '../../redux/slices/trash/trashSlice';
// import { deletePostThunk } from '../../redux/slices/posts/postsThunks';

// interface TrashModalProps {
//   open: boolean;
//   onClose: () => void;
// }

// function TrashModal({ open, onClose }: TrashModalProps): JSX.Element {
//   const dispatch = useAppDispatch();
//   const trashItems = useAppSelector((store) => store.trash.items);
//   const user = useAppSelector((store) => store.auth.user);

//   // ✅ ЭФФЕКТ ДЛЯ ЗАГРУЗКИ КОРЗИНЫ ПРИ ОТКРЫТИИ
//   useEffect(() => {
//     if (open && user) {
//       fetchTrash();
//     }
//   }, [open, user]);

//   const fetchTrash = async (): Promise<void> => {
//     try {
//       console.log('🔄 Fetching trash...');
//       const token = localStorage.getItem('token'); // или из store
      
//       const response = await fetch('/api/posts/user/trash', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch trash');
//       }
      
//       const trashPosts = await response.json();
//       console.log('📦 Trash response:', trashPosts);
      
//       // ✅ СОХРАНИТЕ ДАННЫЕ С СЕРВЕРА В REDUX
//       dispatch(setTrashItems(trashPosts));
      
//     } catch (error) {
//       console.error('❌ Error fetching trash:', error);
//     }
//   };

//   const handleRestore = async (postId: number): Promise<void> => {
//     try {
//       // ✅ ВОССТАНОВЛЕНИЕ НА СЕРВЕРЕ
//       const token = localStorage.getItem('token');
//       const response = await fetch(`/api/posts/${postId}/restore`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (response.ok) {
//         // ✅ ОБНОВИТЕ ЛОКАЛЬНОЕ СОСТОЯНИЕ
//         dispatch(restoreFromTrash(postId));
//         console.log('✅ Post restored from trash:', postId);
//       } else {
//         throw new Error('Failed to restore post');
//       }
//     } catch (error) {
//       console.error('❌ Error restoring post:', error);
//     }
//   };

//   const handleDeletePermanently = (postId: number): void => {
//     if (window.confirm('Удалить пост навсегда? Это действие нельзя отменить.')) {
//       dispatch(removeFromTrash(postId));
//       void dispatch(deletePostThunk(postId));
//     }
//   };

//   const handleClearTrash = (): void => {
//     if (window.confirm('Очистить всю корзину? Все посты будут удалены навсегда.')) {
//       trashItems.forEach(item => {
//         void dispatch(deletePostThunk(item.id));
//       });
//       dispatch(clearTrash());
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 600,
//         maxHeight: '80vh',
//         bgcolor: 'background.paper',
//         boxShadow: 24,
//         p: 4,
//         borderRadius: 2,
//         overflow: 'auto'
//       }}>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//           <Typography variant="h5">
//             Корзина ({trashItems.length})
//           </Typography>
//           <IconButton onClick={onClose}>
//             <Close />
//           </IconButton>
//         </Box>

//         {trashItems.length === 0 ? (
//           <Typography color="text.secondary" textAlign="center">
//             Корзина пуста
//           </Typography>
//         ) : (
//           <>
//             <Box mb={2}>
//               <Button 
//                 variant="outlined" 
//                 color="error" 
//                 onClick={handleClearTrash}
//                 disabled={trashItems.length === 0}
//               >
//                 Очистить корзину
//               </Button>
//             </Box>

//             {trashItems.map((post) => (
//               <Card key={post.id} sx={{ mb: 2 }}>
//                 <CardContent>
//                   <Typography variant="h6">{post.title}</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {post.body}
//                   </Typography>
//                   {post.User && (
//                     <Typography variant="caption" color="text.secondary">
//                       Автор: {post.User.username}
//                     </Typography>
//                   )}
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     startIcon={<Restore />}
//                     onClick={() => handleRestore(post.id)}
//                     size="small"
//                   >
//                     Восстановить
//                   </Button>
//                   <Button
//                     startIcon={<DeleteForever />}
//                     onClick={() => handleDeletePermanently(post.id)}
//                     color="error"
//                     size="small"
//                   >
//                     Удалить навсегда
//                   </Button>
//                 </CardActions>
//               </Card>
//             ))}
//           </>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// export default TrashModal;

import React, { useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import { Restore, DeleteForever, Close } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { 
  restoreFromTrash, 
  removeFromTrash, 
  clearTrash,
  setTrashItems
} from '../../redux/slices/trash/trashSlice';
import { deletePostThunk, getPostsThunk, getPublishedPostsThunk } from '../../redux/slices/posts/postsThunks';
import postsService from '../../services/postsService';


interface TrashModalProps {
  open: boolean;
  onClose: () => void;
}

function TrashModal({ open, onClose }: TrashModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const trashItems = useAppSelector((store) => store.trash.items);

  // ✅ ЭФФЕКТ ДЛЯ ЗАГРУЗКИ КОРЗИНЫ
  useEffect(() => {
    if (open) {
      fetchTrash();
    }
  }, [open]);

  const fetchTrash = async (): Promise<void> => {
    try {
      console.log('🔄 Fetching trash...');
      
      // ✅ ИСПОЛЬЗУЙТЕ POSTS SERVICE
      const trashPosts = await postsService.getUserTrash();
      
      console.log('📦 Trash response:', trashPosts);
      
      dispatch(setTrashItems(trashPosts));
      
    } catch (error) {
      console.error('❌ Error fetching trash:', error);
    }
  };

  // const handleRestore = async (postId: number): Promise<void> => {
  //   try {
  //     console.log('🔄 Restoring post:', postId);
      
  //     // ✅ ИСПОЛЬЗУЙТЕ POSTS SERVICE ВМЕСТО ПРЯМОГО FETCH
  //     await postsService.restoreFromTrash(postId);
      
  //     // ✅ ОБНОВЛЯЕМ ЛОКАЛЬНОЕ СОСТОЯНИЕ
  //     dispatch(restoreFromTrash(postId));
      
  //     console.log('✅ Post restored from trash:', postId);
      
  //   } catch (error) {
  //     console.error('❌ Error restoring post:', error);
  //     alert('Ошибка при восстановлении поста');
  //   }
  // };

  const handleRestore = async (postId: number): Promise<void> => {
    try {
      console.log('🔄 Restoring post:', postId);
      
      await postsService.restoreFromTrash(postId);
      
      dispatch(restoreFromTrash(postId));
      
      // ✅ ОБНОВЛЯЕМ ВСЕ ВОЗМОЖНЫЕ СПИСКИ
      void dispatch(getPostsThunk());
      void dispatch(getPublishedPostsThunk({ page: 1, limit: 6 }));
      
      console.log('✅ Post restored and all lists updated:', postId);
      
    } catch (error) {
      console.error('❌ Error restoring post:', error);
      alert('Ошибка при восстановлении поста');
    }
  };

  const handleDeletePermanently = async (postId: number): Promise<void> => {
    if (window.confirm('Удалить пост навсегда? Это действие нельзя отменить.')) {
      try {
        // ✅ ТОЖЕ ИСПОЛЬЗУЙТЕ SERVICE ДЛЯ УДАЛЕНИЯ
        await postsService.deletePost(postId);
        
        dispatch(removeFromTrash(postId));
        
        console.log('✅ Post permanently deleted:', postId);
        
      } catch (error) {
        console.error('❌ Error deleting post permanently:', error);
        alert('Ошибка при удалении поста');
      }
    }
  };

  const handleClearTrash = async (): Promise<void> => {
    if (window.confirm('Очистить всю корзину? Все посты будут удалены навсегда.')) {
      try {
        // ✅ УДАЛЯЕМ ВСЕ ПОСТЫ ЧЕРЕЗ SERVICE
        const deletePromises = trashItems.map(item => 
          postsService.deletePost(item.id)
        );
        
        await Promise.all(deletePromises);
        
        dispatch(clearTrash());
        
        console.log('✅ Trash cleared successfully');
        
      } catch (error) {
        console.error('❌ Error clearing trash:', error);
        alert('Ошибка при очистке корзины');
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        maxHeight: '80vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        overflow: 'auto'
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">
            Корзина ({trashItems.length})
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {trashItems.length === 0 ? (
          <Typography color="text.secondary" textAlign="center">
            Корзина пуста
          </Typography>
        ) : (
          <>
            <Box mb={2}>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={handleClearTrash}
                disabled={trashItems.length === 0}
              >
                Очистить корзину
              </Button>
            </Box>

            {trashItems.map((post) => (
              <Card key={post.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.body}
                  </Typography>
                  {post.User && (
                    <Typography variant="caption" color="text.secondary">
                      Автор: {post.User.username}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    startIcon={<Restore />}
                    onClick={() => handleRestore(post.id)}
                    size="small"
                  >
                    Восстановить
                  </Button>
                  <Button
                    startIcon={<DeleteForever />}
                    onClick={() => handleDeletePermanently(post.id)}
                    color="error"
                    size="small"
                  >
                    Удалить навсегда
                  </Button>
                </CardActions>
              </Card>
            ))}
          </>
        )}
      </Box>
    </Modal>
  );
}

export default TrashModal;