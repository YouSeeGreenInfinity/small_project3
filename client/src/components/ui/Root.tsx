// import { Container } from '@mui/material';
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import { useAppSelector } from '../../redux/hooks';
// import Loader from '../hocs/Loader';
// import ErrorSnackbar from './ErrorSnackbar';
// import Navbar from './Navbar';

// export default function Root(): JSX.Element {
//   const user = useAppSelector((store) => store.auth.user);
//   return (
//     <Container>
//       <Loader isLoading={user.status === 'pending'}>
//         <>
//           <Navbar />
//           <Outlet />
//           <ErrorSnackbar />
//         </>
//       </Loader>
//     </Container>
//   );
// }


import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import Loader from '../hocs/Loader';
import ErrorSnackbar from './ErrorSnackbar';
import Navbar from './Navbar';

export default function Root(): JSX.Element {
  const user = useAppSelector((store) => store.auth.user);
  
  // ✅ ИСПРАВЛЕНО: безопасный доступ к статусу пользователя
  const isLoading = user?.status === 'pending';
  
  return (
    <Container>
      <Loader isLoading={isLoading}>
        <>
          <Navbar />
          <Outlet />
          <ErrorSnackbar />
        </>
      </Loader>
    </Container>
  );
}
