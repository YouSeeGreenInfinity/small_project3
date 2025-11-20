import { AppBar, Box, Button, Link, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { Link as NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'; // ✅ ДОБАВЛЕН ИМПОРТ
import { logoutThunk } from '../../redux/slices/auth/authThunks';

export default function Navbar(): JSX.Element {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();

  // ✅ ДЕТАЛЬНАЯ ОТЛАДКА
  console.log('🔐 Navbar - full auth state:', useAppSelector((store) => store.auth));
  console.log('🔐 Navbar - user object:', user);
  console.log('🔐 Navbar - user status:', user?.status);
  console.log('🔐 Navbar - username:', (user as any)?.username);

  // ✅ БЕЗОПАСНЫЙ ДОСТУП
  const userStatus = user?.status || 'guest';
  const username = (user as any)?.username || '';

  const links = [
    { to: '/counter', name: 'Counter' },
    ...(userStatus === 'logged'
      ? [
          { to: '/posts', name: 'My Posts' },
          { to: '/cats', name: 'My Cats' },
          { to: '/stats', name: 'Statistics' },
          { to: '/admin', name: 'Admin' },
        ]
      : [
          { to: '/signup', name: 'Sign Up' },
          { to: '/login', name: 'Login' },
        ]),
  ];

  return (
    <Box sx={{ flexGrow: 1, typography: 'body1' }}>
      <AppBar position="static" sx={{ background: '#008080' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography>Hello, {userStatus === 'logged' ? username : 'guest'}</Typography>
          </Box>
          <Box>
            {links.map((link) => (
              <Link
                component={NavLink}
                key={link.name}
                to={link.to}
                sx={{ color: 'white', mr: 2, textDecoration: 'none' }}
              >
                {link.name}
              </Link>
            ))}
            {userStatus === 'logged' && (
              <Button variant="text" color="inherit" onClick={() => void dispatch(logoutThunk())}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}