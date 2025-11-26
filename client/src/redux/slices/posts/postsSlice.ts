// import type { PayloadAction } from '@reduxjs/toolkit';
// import { createSlice } from '@reduxjs/toolkit';
// import type { PostType } from '../../../types/postTypes';
// import { addPostThunk, deletePostThunk, editPostThunk, getPostsThunk } from './postsThunks';

// type PostsState = { posts: PostType[]; currPost: PostType | null };

// const initialState: PostsState = {
//   posts: [],
//   currPost: null,
// };

// const postsSlice = createSlice({
//   name: 'posts',
//   initialState,
//   reducers: {
//     toggleModal: (state, action: PayloadAction<PostType | null>) => {
//       state.currPost = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getPostsThunk.fulfilled, (state, action) => {
//         state.posts = action.payload;
//       })
//       .addCase(getPostsThunk.rejected, (state) => {
//         state.posts = [];
//       })
//       .addCase(addPostThunk.fulfilled, (state, action) => {
//         state.posts = [action.payload, ...state.posts];
//       })
//       .addCase(deletePostThunk.fulfilled, (state, action) => {
//         state.posts = state.posts.filter((el) => el.id !== action.payload);
//       })
//       .addCase(editPostThunk.fulfilled, (state, action) => {
//         const index = state.posts.findIndex((el) => el.id === action.payload.id);
//         state.posts[index] = action.payload;
//       });
//   },
// });

// export const { toggleModal } = postsSlice.actions;

// export default postsSlice.reducer;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { PostType } from '../../../types/postTypes';
import { addPostThunk, deletePostThunk, editPostThunk, getPostsThunk, publishPostThunk } from './postsThunks';

interface PostsState { 
  posts: PostType[]; 
  currPost: PostType | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  currPost: null,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<PostType | null>) => {
      state.currPost = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ GET POSTS
      .addCase(getPostsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostsThunk.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getPostsThunk.rejected, (state, action) => {
        state.posts = [];
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // ✅ ADD POST
      .addCase(addPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPostThunk.fulfilled, (state, action) => {
        // ✅ Добавляем новый пост в начало списка
        state.posts.unshift(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // ✅ DELETE POST
      .addCase(deletePostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        state.posts = state.posts.filter((el) => el.id !== action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(deletePostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // ✅ EDIT POST
      .addCase(editPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPostThunk.fulfilled, (state, action) => {
        const index = state.posts.findIndex((el) => el.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(editPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })     
      .addCase(publishPostThunk.fulfilled, (state, action) => {
        if (!action.payload) {
          console.error('❌ publishPostThunk.fulfilled: action.payload is undefined');
          state.loading = false;
          return;
        }

        // ✅ ПРОВЕРЬ ЧТО action.payload СОДЕРЖИТ id
        console.log('🔄 Updating post in state:', action.payload);


  // Находим пост и обновляем его статус
 const index = state.posts.findIndex((post) => post.id === action.payload.id);
  if (index !== -1) {
    state.posts[index] = action.payload;
    console.log('✅ Post updated in state:', action.payload.id);
  } else {
    console.log('⚠️ Post not found in state:', action.payload.id);
  }
  state.loading = false;
  state.error = null;
})
.addCase(publishPostThunk.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(publishPostThunk.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
  console.error('❌ Publish post failed:', action.payload);
})

  },
});

export const { toggleModal, clearError } = postsSlice.actions;
export default postsSlice.reducer;
