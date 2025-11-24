// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { checkUserThunk, loginThunk, logoutThunk, signUpThunk } from './authThunks';

// // ✅ ОПРЕДЕЛЯЕМ ТИПЫ в соответствии с Navbar
// type UserStatus = 'guest' | 'pending' | 'logged';

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   status: UserStatus;
// }

// interface AuthState {
//   accessToken: string | null;
//   user: User | { status: 'guest' } | { status: 'pending' }; // ✅ Соответствует UserStateType
//   isAuthenticated: boolean;
//   error: string | null;
// }

// const initialState: AuthState = {
//   accessToken: localStorage.getItem('accessToken'),
//   user: { status: 'guest' }, // ✅ Начальное состояние с status
//   isAuthenticated: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (state, action: PayloadAction<{ accessToken: string; user: User }>) => {
//       state.accessToken = action.payload.accessToken;
//       state.user = { ...action.payload.user, status: 'logged' as const }; // ✅ Добавляем status
//       state.isAuthenticated = true;
//       state.error = null;
//       localStorage.setItem('accessToken', action.payload.accessToken);
//     },
//     updateToken: (state, action: PayloadAction<string>) => {
//       state.accessToken = action.payload;
//       localStorage.setItem('accessToken', action.payload);
//     },
//     logout: (state) => {
//       state.accessToken = null;
//       state.user = { status: 'guest' }; // ✅ Сбрасываем к guest
//       state.isAuthenticated = false;
//       state.error = null;
//       localStorage.removeItem('accessToken');
//     },
//     setError: (state, action: PayloadAction<string | null>) => {
//       state.error = action.payload;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // ✅ Обработка pending состояний
//       .addCase(checkUserThunk.pending, (state) => {
//         state.user = { status: 'pending' };
//         state.loading = true;
//       })
//       .addCase(loginThunk.pending, (state) => {
//         state.user = { status: 'pending' };
//         state.loading = true;
//       })
//       .addCase(signUpThunk.pending, (state) => {
//         state.user = { status: 'pending' };
//         state.loading = true;
//       })
//       // ✅ Обработка успешных запросов
//       .addCase(checkUserThunk.fulfilled, (state, action) => {
//         state.user = { ...action.payload.user, status: 'logged' as const };
//         state.accessToken = action.payload.accessToken;
//         state.isAuthenticated = true;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(loginThunk.fulfilled, (state, action) => {
//         state.user = { ...action.payload.user, status: 'logged' as const };
//         state.accessToken = action.payload.accessToken;
//         state.isAuthenticated = true;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(signUpThunk.fulfilled, (state, action) => {
//         state.user = { ...action.payload.user, status: 'logged' as const };
//         state.accessToken = action.payload.accessToken;
//         state.isAuthenticated = true;
//         state.loading = false;
//         state.error = null;
//       })
//       // ✅ Обработка ошибок
//       .addCase(checkUserThunk.rejected, (state) => {
//         state.user = { status: 'guest' };
//         state.isAuthenticated = false;
//         state.loading = false;
//       })
//       .addCase(loginThunk.rejected, (state, action) => {
//         state.user = { status: 'guest' };
//         state.isAuthenticated = false;
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(signUpThunk.rejected, (state, action) => {
//         state.user = { status: 'guest' };
//         state.isAuthenticated = false;
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // ✅ Обработка логаута
//       .addCase(logoutThunk.fulfilled, (state) => {
//         state.accessToken = null;
//         state.user = { status: 'guest' };
//         state.isAuthenticated = false;
//         state.loading = false;
//         state.error = null;
//       });
//   },
// });

// export const { setCredentials, updateToken, logout, setError, clearError } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkUserThunk, loginThunk, logoutThunk, signUpThunk } from './authThunks';

type UserStatus = 'guest' | 'pending' | 'logged';

interface User {
  id: number;
  username: string;
  email: string;
  status: UserStatus;
}

interface AuthState {
  accessToken: string | null;
  user: User | { status: 'guest' } | { status: 'pending' };
  isAuthenticated: boolean;
  loading: boolean; // ✅ ДОБАВИТЬ ЭТО ПОЛЕ
  error: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken'),
  user: { status: 'guest' },
  isAuthenticated: false,
  loading: false, // ✅ ДОБАВИТЬ
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string; user: User }>) => {
      state.accessToken = action.payload.accessToken;
      state.user = { ...action.payload.user, status: 'logged' as const };
      state.isAuthenticated = true;
      state.loading = false; // ✅ ДОБАВИТЬ
      state.error = null;
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = { status: 'guest' };
      state.isAuthenticated = false;
      state.loading = false; // ✅ ДОБАВИТЬ
      state.error = null;
      localStorage.removeItem('accessToken');
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Обработка pending состояний
      .addCase(checkUserThunk.pending, (state) => {
        state.user = { status: 'pending' };
        state.loading = true;
      })
      .addCase(loginThunk.pending, (state) => {
        state.user = { status: 'pending' };
        state.loading = true;
      })
      .addCase(signUpThunk.pending, (state) => {
        state.user = { status: 'pending' };
        state.loading = true;
      })
      // ✅ Обработка успешных запросов - ИСПРАВИТЬ ТИПЫ
      .addCase(checkUserThunk.fulfilled, (state, action) => {
        // ✅ ПРАВИЛЬНО ПРЕОБРАЗУЕМ ТИПЫ
        state.user = { 
          ...action.payload.user, 
          status: 'logged' as const 
        };
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        // ✅ ПРАВИЛЬНО ПРЕОБРАЗУЕМ ТИПЫ
        state.user = { 
          ...action.payload.user, 
          status: 'logged' as const 
        };
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        // ✅ ПРАВИЛЬНО ПРЕОБРАЗУЕМ ТИПЫ
        state.user = { 
          ...action.payload.user, 
          status: 'logged' as const 
        };
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      // ✅ Обработка ошибок
      .addCase(checkUserThunk.rejected, (state) => {
        state.user = { status: 'guest' };
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.user = { status: 'guest' };
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.user = { status: 'guest' };
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      // ✅ Обработка логаута
      .addCase(logoutThunk.fulfilled, (state) => {
        state.accessToken = null;
        state.user = { status: 'guest' };
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        localStorage.removeItem('accessToken');
      });
  },
});

export const { setCredentials, updateToken, logout, setError, clearError } = authSlice.actions;
export default authSlice.reducer;