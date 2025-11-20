// // import type { AxiosError } from 'axios';
// import axios from 'axios';
// import type { StoreType } from '../redux/store';

// let store: StoreType | undefined;

// export const injectStore = (_store: StoreType): void => {
//   store = _store;
// };

// const axiosInstance = axios.create({
//   baseURL: `${import.meta.env.VITE_BASE_URL}`,
//   withCredentials: true,
// });

// // Перехватчик запроса
// axiosInstance.interceptors.request.use((config) => {
//   const token = store?.getState().auth.accessToken;
//   console.log('🚀 Making request to:', config.url);
//   console.log('📝 Current access token:', token ? 'present' : 'missing');
  
//   if (!config.headers.Authorization && token) {
//     config.headers.Authorization = `Bearer ${token}`;
//     console.log('✅ Added Authorization header');
//   }
  
//   return config;
// });

// // Перехватчик ответа
// axiosInstance.interceptors.response.use(
//   (res) => {
//     console.log('✅ Response received:', res.status, res.config.url);
//     return res;
//   },
//   async (err) => {
//     console.log('❌ Response error:', err.response?.status, err.config?.url);
//     console.log('Error message:', err.message);
    
//     const prevRequest = err.config;
    
//     if (prevRequest.url?.endsWith('/tokens/refresh')) {
//       console.log('Refresh token endpoint failed, stopping retry');
//       return Promise.reject(err);
//     }
    
//     if (err.response?.status === 403 && !prevRequest.sent) {
//       console.log('Attempting token refresh...');
//       prevRequest.sent = true;
//       try {
//         const { data } = await axiosInstance.get('/tokens/refresh');
//         console.log('Token refresh successful');
//         prevRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//         return axiosInstance(prevRequest);
//       } catch (refreshError) {
//         console.log('Token refresh failed');
//         return Promise.reject(refreshError);
//       }
//     }
    
//     return Promise.reject(err);
//   }
// );

// import type { AxiosError } from 'axios';
// import axios from 'axios';
// import type { StoreType } from '../redux/store';

// let store: StoreType | undefined;

// export const injectStore = (_store: StoreType): void => {
//   store = _store;
// };

// const axiosInstance = axios.create({
//   baseURL: `${import.meta.env.VITE_BASE_URL}`,
//   withCredentials: true,
// });

// // Перехватчик запроса
// axiosInstance.interceptors.request.use((config) => {
//   const token = store?.getState().auth.accessToken;
//   console.log('🚀 Making request to:', config.url);
//   console.log('📝 Current access token:', token ? 'present' : 'missing');
  
//   if (!config.headers.Authorization && token) {
//     config.headers.Authorization = `Bearer ${token}`;
//     console.log('✅ Added Authorization header');
//   }
  
//   return config;
// });

// // Перехватчик ответа
// axiosInstance.interceptors.response.use(
//   (res) => {
//     console.log('✅ Response received:', res.status, res.config.url);
//     return res;
//   },
//   async (err: AxiosError & { config: { sent?: boolean; url?: string } }) => {
//     console.log('❌ Response error:', err.response?.status, err.config?.url);
//     console.log('Error message:', err.message);
    
//     const prevRequest = err.config;
    
//     if (prevRequest.url?.endsWith('/tokens/refresh')) {
//       console.log('Refresh token endpoint failed, stopping retry');
//       return Promise.reject(err);
//     }
    
//     if (err.response?.status === 403 && !prevRequest.sent) {
//       console.log('Attempting token refresh...');
//       prevRequest.sent = true;
//       try {
//         const { data } = await axiosInstance.get<{ accessToken: string }>('/tokens/refresh');
//         console.log('Token refresh successful');
//         prevRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//         return axiosInstance(prevRequest);
//       } catch (refreshError) {
//         console.log('Token refresh failed');
//         return Promise.reject(refreshError);
//       }
//     }
    
//     return Promise.reject(err);
//   }
// );

// // Экспорт по умолчанию
// export default axiosInstance;

// import type { AxiosError } from 'axios';
// import axios from 'axios';
// import type { StoreType } from '../redux/store';

// let store: StoreType | undefined;

// export const injectStore = (_store: StoreType): void => {
//   store = _store;
// };

// const axiosInstance = axios.create({
//   baseURL: `${import.meta.env.VITE_BASE_URL}`,
//   withCredentials: true,
// });

// // Перехватчик запроса - ИСПРАВЛЕННАЯ ВЕРСИЯ
// axiosInstance.interceptors.request.use((config) => {
//   const state = store?.getState();
//   const token = state?.auth?.accessToken;
  
//   console.log('🚀 Making request to:', config.url);
//   console.log('📝 Current access token:', token ? 'present' : 'missing');
//   console.log('📦 Store state:', state ? 'available' : 'missing');
  
//   // Всегда добавляем токен, если он есть
//   if (token && !config.headers.Authorization) {
//     config.headers.Authorization = `Bearer ${token}`;
//     console.log('✅ Added Authorization header with token');
//   } else if (!token) {
//     console.log('❌ No access token available in store');
//   }
  
//   return config;
// });

// // Перехватчик ответа
// axiosInstance.interceptors.response.use(
//   (res) => {
//     console.log('✅ Response received:', res.status, res.config.url);
//     return res;
//   },
//   async (err: AxiosError & { config: { sent?: boolean; url?: string } }) => {
//     console.log('❌ Response error:', err.response?.status, err.config?.url);
    
//     const prevRequest = err.config;
    
//     if (prevRequest.url?.endsWith('/tokens/refresh')) {
//       console.log('Refresh token endpoint failed, stopping retry');
//       return Promise.reject(err);
//     }
    
//     if (err.response?.status === 403 && !prevRequest.sent) {
//       console.log('Attempting token refresh...');
//       prevRequest.sent = true;
//       try {
//         const { data } = await axiosInstance.get<{ accessToken: string }>('/tokens/refresh');
//         console.log('Token refresh successful');
        
//         // Сохраняем новый токен в store
//         if (store) {
//           store.dispatch({ 
//             type: 'auth/updateToken', 
//             payload: data.accessToken 
//           });
//         }
        
//         prevRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//         return axiosInstance(prevRequest);
//       } catch (refreshError) {
//         console.log('Token refresh failed');
//         return Promise.reject(refreshError);
//       }
//     }
    
//     return Promise.reject(err);
//   }
// );

// export default axiosInstance;

import type { AxiosError } from 'axios';
import axios from 'axios';
import type { StoreType } from '../redux/store';

let store: StoreType | undefined;

export const injectStore = (_store: StoreType): void => {
  console.log('🛠️ Store injected into axios instance');
  store = _store;
};

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
});

// Перехватчик запроса - УЛУЧШЕННАЯ ВЕРСИЯ
axiosInstance.interceptors.request.use((config) => {
  // Получаем актуальное состояние store
  const currentState = store?.getState();
  const token = currentState?.auth?.accessToken;
  
  console.log('🚀 Making request to:', config.url);
  console.log('📝 Current access token:', token);
  console.log('📦 Full auth state:', currentState?.auth);
  
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('✅ Added Authorization header with token');
  } else if (!token) {
    console.log('❌ No access token available in store');
    console.log('🔍 Store structure:', currentState);
  }
  
  return config;
});

// Перехватчик ответа
axiosInstance.interceptors.response.use(
  (res) => {
    console.log('✅ Response received:', res.status, res.config.url);
    return res;
  },
  async (err: AxiosError & { config: { sent?: boolean; url?: string } }) => {
    console.log('❌ Response error:', err.response?.status, err.config?.url);
    
    const prevRequest = err.config;
    
    if (prevRequest.url?.endsWith('/tokens/refresh')) {
      return Promise.reject(err);
    }
    
    // Обновляем токен при 401 ошибке
    if (err.response?.status === 401 && !prevRequest.sent) {
      console.log('🔄 Attempting token refresh...');
      prevRequest.sent = true;
      try {
        const { data } = await axiosInstance.get<{ accessToken: string }>('/tokens/refresh');
        console.log('✅ Token refresh successful');
        
        // Сохраняем новый токен в store
        if (store) {
          // Диспатчим action для обновления токена
          store.dispatch({ 
            type: 'auth/updateToken', 
            payload: data.accessToken 
          });
        }
        
        prevRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(prevRequest);
      } catch (refreshError) {
        console.log('❌ Token refresh failed');
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(err);
  }
);

export default axiosInstance;