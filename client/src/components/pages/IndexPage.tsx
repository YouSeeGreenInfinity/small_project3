// import React from 'react';
// import { Box, Typography } from '@mui/material';
// import { useAppSelector } from '../../redux/hooks';
// import PostCard from '../ui/PostCard';

// function IndexPage(): JSX.Element {
//   const posts = useAppSelector((store) => store.posts.posts);
  
//   // ✅ Фильтруем только опубликованные посты
//   const publishedPosts = posts.filter(post => post.published === true);

//   console.log('📊 IndexPage - All posts:', posts.length);
//   console.log('📊 IndexPage - Published posts:', publishedPosts.length);
//   console.log('📊 IndexPage - Published posts data:', publishedPosts);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Опубликованные посты
//       </Typography>
      
//       {publishedPosts.length === 0 ? (
//         <Typography variant="body1" color="text.secondary">
//           Пока нет опубликованных постов
//         </Typography>
//       ) : (
//         <Box display="flex" flexWrap="wrap" gap={2}>
//           {publishedPosts.map((post) => (
//             <PostCard key={post.id} post={post} />
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// }

// export default IndexPage;

// с пагинацией и сортировкой
import React, { useEffect, useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  SelectChangeEvent,
  TextField,
  InputAdornment
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getPublishedPostsThunk } from '../../redux/slices/posts/postsThunks';
import PostCard from '../ui/PostCard';
import Pagination from '../ui/Pagination';

function IndexPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { publishedPosts, loading, pagination } = useAppSelector((store) => store.posts);
  const likesCount = useAppSelector((store) => store.like.likesCount);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); // ✅ ПОИСКОВЫЙ ЗАПРОС

  useEffect(() => {
    console.log('🏠 IndexPage mounted, loading page:', currentPage);
    void dispatch(getPublishedPostsThunk({ page: currentPage, limit: 6 }));
  }, [dispatch, currentPage]);

  // Получаем уникальных авторов
  const authors = useMemo(() => {
    const uniqueAuthors = new Set();
    publishedPosts.forEach(post => {
      if (post.User?.username) {
        uniqueAuthors.add(post.User.username);
      }
    });
    return Array.from(uniqueAuthors).sort() as string[];
  }, [publishedPosts]);

  // Фильтрация и сортировка постов
  const filteredAndSortedPosts = useMemo(() => {
    if (!publishedPosts.length) return [];
    
    // Сначала фильтруем по автору
    let filteredPosts = publishedPosts;
    if (selectedAuthor !== 'all') {
      filteredPosts = publishedPosts.filter(post => 
        post.User?.username === selectedAuthor
      );
    }
    
    // ✅ ФИЛЬТРАЦИЯ ПО ПОИСКОВОМУ ЗАПРОСУ
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.body.toLowerCase().includes(query)
      );
    }
    
    // Затем сортируем
    const postsCopy = [...filteredPosts];
    
    switch(sortBy) {
      case 'newest':
        return postsCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      case 'oldest':
        return postsCopy.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      
      case 'author':
        return postsCopy.sort((a, b) => 
          (a.User?.username || '').localeCompare(b.User?.username || '')
        );
      
      case 'likes':
        return postsCopy.sort((a, b) => 
          (likesCount[b.id] || 0) - (likesCount[a.id] || 0)
        );
      
      default:
        return postsCopy;
    }
  }, [publishedPosts, sortBy, likesCount, selectedAuthor, searchQuery]);

  const handlePageChange = (page: number): void => {
    console.log('🔄 Changing to page:', page);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (event: SelectChangeEvent): void => {
    setSortBy(event.target.value);
  };

  const handleAuthorChange = (event: SelectChangeEvent): void => {
    setSelectedAuthor(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  console.log('📊 IndexPage state:', {
    postsCount: publishedPosts.length,
    filteredCount: filteredAndSortedPosts.length,
    currentPage,
    totalPages: pagination.totalPages,
    loading,
    sortBy,
    selectedAuthor,
    searchQuery,
    authorsCount: authors.length
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">
          Опубликованные посты
        </Typography>
        
        <Box display="flex" gap={2}>
          {/* ✅ ПОЛЕ ПОИСКА */}
          <TextField
            placeholder="Поиск по тексту..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            sx={{ minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            disabled={loading}
          />

          {/* Фильтр по автору */}
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Автор</InputLabel>
            <Select
              value={selectedAuthor}
              label="Автор"
              onChange={handleAuthorChange}
              disabled={loading}
            >
              <MenuItem value="all">Все авторы</MenuItem>
              {authors.map(author => (
                <MenuItem key={author} value={author}>
                  {author}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Сортировка */}
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Сортировка</InputLabel>
            <Select
              value={sortBy}
              label="Сортировка"
              onChange={handleSortChange}
              disabled={loading}
            >
              <MenuItem value="newest">Сначала новые</MenuItem>
              <MenuItem value="oldest">Сначала старые</MenuItem>
              <MenuItem value="author">По автору</MenuItem>
              <MenuItem value="likes">По лайкам</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Информация о фильтрации */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Всего постов: {pagination.totalPosts}
        {selectedAuthor !== 'all' && ` • Автор: ${selectedAuthor}`}
        {searchQuery && ` • Поиск: "${searchQuery}"`}
        {sortBy !== 'newest' && ` • Сортировка: ${
          sortBy === 'oldest' ? 'старые' :
          sortBy === 'author' ? 'автор' : 
          sortBy === 'likes' ? 'лайки' : 'новые'
        }`}
        {(selectedAuthor !== 'all' || searchQuery) && 
          ` (найдено: ${filteredAndSortedPosts.length})`
        }
      </Typography>

      {/* Загрузка */}
      {loading && (
        <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Список постов */}
      {!loading && filteredAndSortedPosts.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          {searchQuery && selectedAuthor !== 'all'
            ? `Нет постов от автора "${selectedAuthor}" с текстом "${searchQuery}"`
            : searchQuery
            ? `Нет постов с текстом "${searchQuery}"`
            : selectedAuthor !== 'all'
            ? `Нет постов от автора "${selectedAuthor}"`
            : 'Пока нет опубликованных постов'
          }
        </Typography>
      ) : (
        <>
          <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
            {filteredAndSortedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Box>

          {/* Пагинация */}
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            loading={loading}
          />
        </>
      )}
    </Box>
  );
}

export default IndexPage;