// import React, { useEffect } from 'react';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import PrivateRouter from './components/hocs/PrivateRouter';
// import AdminPage from './components/pages/AdminPage';
// import AuthPage from './components/pages/AuthPage';
// import CatsPage from './components/pages/CatsPage';
// import CounterPage from './components/pages/CounterPage';
// import ErrorPage from './components/pages/ErrorPage';
// import IndexPage from './components/pages/IndexPage';
// import PostsPage from './components/pages/PostsPage';
// import StatisticsPage from './components/pages/StatisticsPage';
// import Root from './components/ui/Root';
// import { useAppDispatch, useAppSelector } from './redux/hooks';
// import { checkUserThunk } from './redux/slices/auth/authThunks';
// import getCatsThunk from './redux/slices/cats/catsThunks';
// import { getPostsThunk } from './redux/slices/posts/postsThunks';

// function App(): JSX.Element {
//   const dispatch = useAppDispatch();
//   const user = useAppSelector((store) => store.auth.user);

//   useEffect(() => {
//     void dispatch(checkUserThunk());
//     void dispatch(getCatsThunk());
//     void dispatch(getPostsThunk());
//   }, []);

//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <Root />,
//       errorElement: <ErrorPage />,
//       children: [
//         { path: '/', element: <IndexPage /> },
//         {
//           path: '/admin',
//           element: (
//             <PrivateRouter isAllowed={user.status === 'logged' && user.username === 'admin'}>
//               <AdminPage />
//             </PrivateRouter>
//           ),
//         },
//         {
//           element: <PrivateRouter isAllowed={user.status === 'logged'} redirect="/login" />,
//           children: [
//             {
//               path: '/posts',
//               element: <PostsPage />,
//             },
//             { path: '/cats', element: <CatsPage /> },
//             { path: '/stats', element: <StatisticsPage /> },
//           ],
//         },

//         {
//           path: '/counter',
//           element: <CounterPage />,
//         },
//         {
//           element: <PrivateRouter isAllowed={user.status === 'guest'} />,
//           children: [
//             {
//               path: '/signup',
//               element: <AuthPage />,
//             },
//             {
//               path: '/login',
//               element: <AuthPage />,
//             },
//           ],
//         },
//       ],
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;

// import React, { useEffect } from 'react';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import { CircularProgress, Box } from '@mui/material';
// import PrivateRouter from './components/hocs/PrivateRouter';
// import AdminPage from './components/pages/AdminPage';
// import AuthPage from './components/pages/AuthPage';
// import CatsPage from './components/pages/CatsPage';
// import CounterPage from './components/pages/CounterPage';
// import ErrorPage from './components/pages/ErrorPage';
// import IndexPage from './components/pages/IndexPage';
// import PostsPage from './components/pages/PostsPage';
// import StatisticsPage from './components/pages/StatisticsPage';
// import Root from './components/ui/Root';
// import { useAppDispatch, useAppSelector } from './redux/hooks';
// import { checkUserThunk } from './redux/slices/auth/authThunks';
// import getCatsThunk from './redux/slices/cats/catsThunks';
// import { getPostsThunk } from './redux/slices/posts/postsThunks';
// import { getUserLikesThunk } from './redux/slices/like/likeThunks';

// function App(): JSX.Element {
//   const dispatch = useAppDispatch();
//   const user = useAppSelector((store) => store.auth.user);
//   const authLoading = useAppSelector((store) => store.auth.loading);

//   useEffect(() => {
//     const initializeApp = async () => {
//       try {
//         // Проверяем авторизацию пользователя
//         await dispatch(checkUserThunk()).unwrap();

//         // Параллельно загружаем остальные данные
//         await Promise.all([dispatch(getCatsThunk()), dispatch(getPostsThunk())]);
//       } catch (error) {
//         console.error('App initialization error:', error);
//       }
//     };

//     void initializeApp();
//   }, [dispatch]);

//   useEffect(() => {
//     // Загружаем лайки только после успешной проверки авторизации
//     if (user.status === 'logged') {
//       void dispatch(getUserLikesThunk());
//     }
//   }, [dispatch, user.status]);

//   // Показываем лоадер во время инициализации приложения
//   if (authLoading && user.status === 'pending') {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//         <CircularProgress size={60} />
//       </Box>
//     );
//   }

//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <Root />,
//       errorElement: <ErrorPage />,
//       children: [
//         { path: '/', element: <IndexPage /> },
//         {
//           path: '/admin',
//           element: (
//             <PrivateRouter isAllowed={user.status === 'logged' && user.username === 'admin'}>
//               <AdminPage />
//             </PrivateRouter>
//           ),
//         },
//         {
//           element: <PrivateRouter isAllowed={user.status === 'logged'} redirect="/login" />,
//           children: [
//             {
//               path: '/posts',
//               element: <PostsPage />,
//             },
//             { path: '/cats', element: <CatsPage /> },
//             { path: '/stats', element: <StatisticsPage /> },
//           ],
//         },
//         {
//           path: '/counter',
//           element: <CounterPage />,
//         },
//         {
//           element: <PrivateRouter isAllowed={user.status === 'guest'} />,
//           children: [
//             {
//               path: '/signup',
//               element: <AuthPage />,
//             },
//             {
//               path: '/login',
//               element: <AuthPage />,
//             },
//           ],
//         },
//       ],
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;

// Этот код представляет собой основной компонент App React-приложения, который использует react-router-dom для определения структуры маршрутизации и Redux Toolkit
// (предположительно) для управления состоянием приложения и авторизацией. Разберем код детально:

// 1. function App(): JSX.Element { ... }:

//     Определяет функциональный React-компонент с именем App.
//     : JSX.Element указывает, что компонент возвращает JSX-элемент.

// 2. const dispatch = useAppDispatch();:

//     Предполагается, что useAppDispatch — это кастомный хук, предоставляемый Redux Toolkit (или вашей собственной оберткой над useDispatch из react-redux).
//     Он возвращает функцию dispatch, которая используется для отправки действий (actions) в Redux store. Эти действия изменяют состояние приложения.

// 3. const user = useAppSelector((store) => store.auth.user);:

//     useAppSelector — это еще один кастомный хук, основанный на useSelector из react-redux. Он позволяет получать данные из Redux store.
//     (store) => store.auth.user — это селектор, который выбирает часть состояния приложения, относящуюся к аутентификации (store.auth.user). Предполагается, что
//     у вас есть слайс Redux под названием auth (например, authSlice), который содержит информацию о текущем пользователе.
//     user теперь содержит объект, представляющий текущего пользователя, и включает такие поля, как status (вероятно, ‘logged’, ‘guest’ или что-то подобное) и username.

// 4. useEffect(() => { ... }, []);:

//     Использует хук useEffect для выполнения побочных эффектов после рендеринга компонента.
//     [] в качестве второго аргумента (useEffect(() => { ... }, []);) означает, что эффект будет выполнен только один раз при монтировании компонента
//     (аналогично componentDidMount в классовых компонентах).
//     void dispatch(checkUserThunk());
//         checkUserThunk() — это асинхронный thunk (функция, которая возвращает другую функцию), созданный с помощью createAsyncThunk из Redux Toolkit.
//         Он, вероятно, выполняет проверку состояния аутентификации пользователя (например, проверяет наличие токена в localStorage или делает запрос к серверу).
//         Результат этой проверки сохраняется в Redux store.
//         dispatch(checkUserThunk()) — отправляет thunk в Redux store.
//         void используется, чтобы подавить предупреждение о том, что значение, возвращаемое dispatch, не используется.
//     void dispatch(getCatsThunk()); и void dispatch(getPostsThunk());
//         Аналогично checkUserThunk(), getCatsThunk() и getPostsThunk() — это thunk, которые, вероятно, выполняют запросы к серверу для получения данных
//         о “cats” и “posts” и сохраняют их в Redux store. Эти данные, вероятно, используются для отображения контента на страницах приложения.

// 5. const router = createBrowserRouter([ ... ]);:

//     Использует хук createBrowserRouter из react-router-dom для создания конфигурации маршрутизации.
//     createBrowserRouter принимает массив объектов, где каждый объект определяет маршрут.
//     path: '/', element: <Root />, errorElement: <ErrorPage />, children: [ ... ]:
//         path: '/' Определяет корневой маршрут (/).
//         element: <Root /> Указывает, что при переходе на корневой маршрут должен быть отрендерен компонент Root. Root может быть компонентом-контейнером,
//         который предоставляет общую структуру для всего приложения.
//         errorElement: <ErrorPage /> Указывает, что компонент ErrorPage должен быть отрендерен, если произойдет ошибка при загрузке данных для маршрута.
//         children: [ ... ] Определяет дочерние маршруты, которые являются вложенными в корневой маршрут.
//     { path: '/', element: <IndexPage /> }:
//         Определяет маршрут /, который рендерит компонент IndexPage. Поскольку это дочерний маршрут корневого маршрута (/), он будет отображаться внутри Root.
//     { path: '/admin', element: ( <PrivateRouter isAllowed={user.status === 'logged' && user.username === 'admin'}> <AdminPage /> </PrivateRouter> ), },:
//         Определяет маршрут /admin, который защищен компонентом PrivateRouter.
//         isAllowed={user.status === 'logged' && user.username === 'admin'}: Доступ к этому маршруту разрешен только в том случае, если пользователь залогинен
//         (user.status === 'logged') и его имя пользователя — “admin” (user.username === 'admin').
//         Если пользователь имеет необходимые права, будет отрендерен компонент AdminPage.
//     { element: <PrivateRouter isAllowed={user.status === 'logged'} redirect="/login" />, children: [ ... ] }:
//         Определяет группу маршрутов, защищенных компонентом PrivateRouter.
//         isAllowed={user.status === 'logged'}: Доступ к этим маршрутам разрешен только залогиненным пользователям.
//         redirect="/login": Если пользователь не залогинен, он будет перенаправлен на страницу /login.
//         children: [ ... ]: Определяет дочерние маршруты, которые входят в эту защищенную группу.
//             { path: '/posts', element: <PostsPage /> }
//             { path: '/cats', element: <CatsPage /> }
//             { path: '/stats', element: <StatisticsPage /> }
//     { path: '/counter', element: <CounterPage /> },:
//         Определяет маршрут /counter, который рендерит компонент CounterPage. Этот маршрут, кажется, не защищен и доступен всем.
//     { element: <PrivateRouter isAllowed={user.status === 'guest'} />, children: [ ... ] }:
//         Определяет группу маршрутов, защищенных компонентом PrivateRouter.
//         isAllowed={user.status === 'guest'}: Доступ к этим маршрутам разрешен только гостям (незарегистрированным пользователям). Это немного необычно, но
//         может использоваться, например, для отображения разных форм регистрации/логина в зависимости от того, зарегистрирован ли пользователь уже.
//         children: [ ... ]: Определяет дочерние маршруты, которые входят в эту защищенную группу.
//             { path: '/signup', element: <AuthPage /> }
//             { path: '/login', element: <AuthPage /> }

// 6. return <RouterProvider router={router} />;:

//     Использует компонент RouterProvider из react-router-dom для предоставления конфигурации маршрутизации вашему приложению.
//     router={router}: Передает объект router, созданный с помощью createBrowserRouter, в компонент RouterProvider.

// Общий принцип работы:

//     Инициализация: При монтировании компонента App, хук useEffect отправляет асинхронные thunk для проверки состояния пользователя и получения данных.
//     Маршрутизация: Компонент RouterProvider использует конфигурацию маршрутизации, определенную в createBrowserRouter, для отображения правильного контента
//     в зависимости от URL.
//     Защита маршрутов: Компонент PrivateRouter используется для защиты определенных маршрутов, перенаправляя неавторизованных пользователей или отображая
//     разные компоненты в зависимости от состояния аутентификации пользователя, полученного из Redux store.
//     Redux: Состояние приложения (включая информацию о пользователе) управляется с помощью Redux Toolkit, позволяя компонентам получать доступ к данным и
//     отправлять действия для изменения состояния.

// Предположения:

//     Используется Redux Toolkit для управления состоянием.
//     Есть Redux slice auth с полем user, содержащим информацию о пользователе.
//     checkUserThunk, getCatsThunk и getPostsThunk — это асинхронные thunk, которые получают данные и обновляют состояние Redux.
//     PrivateRouter — это компонент, который перенаправляет пользователей в зависимости от их статуса аутентификации (как описано в предыдущем ответе).

// Этот код демонстрирует хорошо структурированное React-приложение, использующее современные инструменты и практики для управления состоянием, маршрутизацией
// и безопасностью. Он использует преимущества TypeScript для обеспечения безопасности типов и предотвращения ошибок.

// ОБРАТИ ВНИМАНИЕ ЕЩЁ РАЗ НА USEMEMO!!!! КАК ЕГО МОЖНО ИСПОЛЬЗОВАТЬ!!!!!!!НАКОНЕЦ УДАЛОСЬ ЕГО ТАК ИСПОЛЬЗОВАТЬ!!!!!
import React, { useEffect, useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import PrivateRouter from './components/hocs/PrivateRouter';
import AdminPage from './components/pages/AdminPage';
import AuthPage from './components/pages/AuthPage';
import CatsPage from './components/pages/CatsPage';
import CounterPage from './components/pages/CounterPage';
import ErrorPage from './components/pages/ErrorPage';
import IndexPage from './components/pages/IndexPage';
import PostsPage from './components/pages/PostsPage';
import StatisticsPage from './components/pages/StatisticsPage';
import Root from './components/ui/Root';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserThunk } from './redux/slices/auth/authThunks';
import getCatsThunk from './redux/slices/cats/catsThunks';
import { getPostsThunk } from './redux/slices/posts/postsThunks';
import { getUserLikesThunk } from './redux/slices/like/likeThunks';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.user);
  const authLoading = useAppSelector((store) => store.auth.loading);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Проверяем авторизацию пользователя
        await dispatch(checkUserThunk()).unwrap();

        // Параллельно загружаем остальные данные
        await Promise.all([dispatch(getCatsThunk()), dispatch(getPostsThunk())]);
      } catch (error) {
        console.error('App initialization error:', error);
      }
    };

    void initializeApp();
  }, [dispatch]);

  useEffect(() => {
    // ✅ ИСПРАВЛЕНО: безопасная проверка user и его статуса
    if (user && user.status === 'logged') {
      void dispatch(getUserLikesThunk());
    }
  }, [dispatch, user]); // ✅ Изменили зависимость на user

   // ✅ ИСПРАВЛЕНО: безопасное получение статуса пользователя
  const userStatus = user?.status || 'guest';
  const isAdmin = userStatus === 'logged' && user?.username === 'admin';

  // ✅ ИСПРАВЛЕН СИНТАКСИС: useMemo правильно обернут
  const router = useMemo(() => {
    console.log('🔄 Recreating router, isAdmin:', isAdmin);
    console.log('👤 User status:', userStatus);
    console.log('👤 Username:', user?.username);
    
    return createBrowserRouter([
      {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
          { path: '/', element: <IndexPage /> },
          {
            path: '/admin',
            element: (
              <PrivateRouter isAllowed={isAdmin}>
                <AdminPage />
              </PrivateRouter>
            ),
          },
          {
            element: <PrivateRouter isAllowed={userStatus === 'logged'} redirect="/login" />,
            children: [
              {
                path: '/posts',
                element: <PostsPage />,
              },
              { path: '/cats', element: <CatsPage /> },
              { path: '/stats', element: <StatisticsPage /> },
            ],
          },
          {
            path: '/counter',
            element: <CounterPage />,
          },
          {
            path: '/index_page',
            element: <IndexPage />,
          },
          {
            element: <PrivateRouter isAllowed={userStatus === 'guest'} />,
            children: [
              {
                path: '/signup',
                element: <AuthPage />,
              },
              {
                path: '/login',
                element: <AuthPage />,
              },
            ],
          },
        ],
      },
    ]);
  }, [isAdmin, userStatus, user?.username]); // ✅ Добавлены зависимости

  const isLoading = authLoading || (user?.status === 'pending');
  
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;