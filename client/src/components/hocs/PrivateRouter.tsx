import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type PrivateRouterPropsType = {
  children?: React.ReactElement;
  redirect?: string;
  isAllowed: boolean;
};

export default function PrivateRouter({
  children,
  redirect = '/',
  isAllowed,
}: PrivateRouterPropsType): JSX.Element {
  if (!isAllowed) return <Navigate to={redirect} />;
  return children || <Outlet />;
}

// Этот код представляет собой компонент PrivateRouter в React, использующий react-router-dom для реализации приватных (защищенных) маршрутов. Он контролирует доступ к 
// определенным частям приложения в зависимости от значения пропса isAllowed.

// Разберем код построчно:

//     import React from 'react';:
//         Импортирует библиотеку React, необходимую для создания React-компонентов.

//     import { Navigate, Outlet } from 'react-router-dom';:
//         Импортирует компоненты Navigate и Outlet из библиотеки react-router-dom.
//             Navigate: Используется для программной переадресации пользователя на другой маршрут.
//             Outlet: Используется для рендеринга дочернего маршрута, соответствующего текущему URL.

//     type PrivateRouterPropsType = { ... };:
//         Определяет тип (интерфейс) PrivateRouterPropsType для пропсов (props), которые принимает компонент PrivateRouter. Это помогает обеспечить безопасность типов.
//         children?: React.ReactElement;: Определяет необязательный пропс children, который должен быть React-элементом. Этот пропс используется для рендеринга содержимого, 
// доступного только авторизованным пользователям. ? означает, что он необязательный.
//         redirect?: string;: Определяет необязательный пропс redirect, который является строкой и указывает URL, на который нужно перенаправить пользователя, если он не 
// авторизован. По умолчанию перенаправляет на корень (/).
//         isAllowed: boolean;: Определяет обязательный пропс isAllowed, который является булевым значением и определяет, разрешен ли пользователю доступ к маршруту.

//     export default function PrivateRouter({ ... }): JSX.Element { ... }:
//         Определяет функциональный React-компонент с именем PrivateRouter.
//         export default: Экспортирует компонент по умолчанию, чтобы его можно было импортировать в другие файлы.
//         ({ children, redirect = '/', isAllowed }: PrivateRouterPropsType): Деструктурирует пропсы, переданные компоненту, и присваивает им значения по умолчанию 
// (для redirect). Также указывает тип принимаемых пропсов PrivateRouterPropsType.
//         : JSX.Element: Указывает, что компонент возвращает JSX-элемент. JSX - это расширение синтаксиса JavaScript, которое позволяет писать HTML-подобный код в React.

//     if (!isAllowed) return <Navigate to={redirect} />;:
//         Это основная логика компонента. Если пропс isAllowed равен false (т.е. пользователю не разрешен доступ), компонент возвращает компонент Navigate.
//         <Navigate to={redirect} />: Компонент Navigate перенаправляет пользователя на URL, указанный в пропсе redirect.

//     return children || <Outlet />;:
//         Если пропс isAllowed равен true (т.е. пользователю разрешен доступ), компонент возвращает либо children, либо <Outlet />.
//         children || <Outlet />: Использует оператор “или” (||). Если передан пропс children, он будет отрендерен. В противном случае будет отрендерен компонент Outlet.
//             children: Позволяет вкладывать контент, который должен быть виден только авторизованным пользователям, непосредственно в компонент PrivateRouter.
//             <Outlet />: Рендерит дочерний маршрут, определенный в конфигурации react-router-dom. Это позволяет использовать PrivateRouter для защиты группы маршрутов.

// Как это работает (сценарий использования):

// Предположим, у вас есть маршрут /profile, который должен быть доступен только авторизованным пользователям. Вы можете использовать PrivateRouter следующим образом:
// jsx

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import PrivateRouter from './PrivateRouter';
// import ProfilePage from './ProfilePage';
// import LoginPage from './LoginPage';

// function App() {
//   const isLoggedIn = //  Логика проверки авторизации пользователя (например, проверка наличия токена в localStorage)

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route
//           path="/profile"
//           element={
//             <PrivateRouter isAllowed={isLoggedIn} redirect="/login">
//               <ProfilePage />
//             </PrivateRouter>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// В этом примере:

//     Если пользователь авторизован (isLoggedIn равен true), компонент ProfilePage будет отрендерен.
//     Если пользователь не авторизован (isLoggedIn равен false), компонент PrivateRouter перенаправит пользователя на страницу /login.

// Преимущества:

//     Централизованная логика авторизации: Вся логика авторизации находится в одном компоненте (PrivateRouter), что упрощает ее обслуживание и изменение.
//     Декларативный подход: Использование компонентов React и react-router-dom позволяет декларативно описывать структуру маршрутов и правила авторизации.
//     Переиспользуемость: Компонент PrivateRouter можно использовать для защиты любого маршрута в вашем приложении.
//     Безопасность типов (благодаря TypeScript): Определение типов для пропсов и возвращаемых значений помогает предотвратить ошибки и улучшает читаемость кода.

// Резюме:

// Компонент PrivateRouter является мощным инструментом для реализации приватных маршрутов в React-приложениях с использованием react-router-dom. Он позволяет 
// контролировать доступ к определенным частям приложения на основе логики авторизации и перенаправлять неавторизованных пользователей на страницу входа. 
// Использование TypeScript делает код более надежным и понятным.
