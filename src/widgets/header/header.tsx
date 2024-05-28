import React from 'react';
import { useStore } from 'effector-react';
import { Link, NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { PAGES, PATHS } from 'shared/config';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from 'shared/ui/kit';
import {
  AdminPanelSettingsRoundedIcon,
  LogoutRoundedIcon,
  PersonOutlineOutlinedIcon,
  PersonRoundedIcon,
  SettingsRoundedIcon,
} from 'shared/ui/icons';
import LogoImg from 'shared/assets/images/logo_b.png';

import { Sidebar, SideBarOpenButton } from 'features/sidebar';
import { LoginButton } from 'features/session/login';
import { RegistrationButton } from 'features/session/registration';
import { sessionModel } from 'entities/session';
// import { CreateCourseForm } from 'features/course/create';

export const Header = () => {
  const user = useStore(sessionModel.$user);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ pt: '16px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component={Link} to={'/'} sx={{ flex: '0 1 25%' }}>
            <Box
              sx={{
                display: 'inline-block',
                width: 150,
                height: '100%',
              }}
              component="img"
              alt="Logo"
              src={LogoImg}
            />
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '16px' }}>
            {PAGES.map((page) => (
              <Button
                key={page.root}
                component={HashLink}
                to={page.root}
                smooth
                variant="text"
                sx={{
                  my: 2,
                  display: 'block',
                  '&.active': {
                    backgroundColor: 'rgba(51, 51, 51, 0.14)',
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <SideBarOpenButton />
            <Sidebar />
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              flex: '0 1 25%',
              gap: '20px',
            }}
          >
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Button
                    component={Link}
                    to={PATHS.admin.courses}
                    sx={{
                      m: 0,
                      display: 'inline-block',
                    }}
                    variant="contained"
                  >
                    Адмін панель
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    to={PATHS.profile.courses}
                    sx={{
                      m: 0,
                      display: 'inline-block',
                    }}
                    variant="contained"
                  >
                    Мої курси
                  </Button>
                )}
                <Tooltip title="Open profile">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{
                      width: 42,
                      height: 42,
                    }}
                  >
                    <PersonOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{
                    mt: '45px',
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <List
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      py: '17px',
                      px: '25px',
                    }}
                  >
                    {user.role === 'admin' && (
                      <ListItem disablePadding>
                        <ListItemButton
                          component={Link}
                          to={PATHS.admin.courses}
                          onClick={handleCloseUserMenu}
                          sx={{ borderBottom: '3px solid #FFFFFF' }}
                        >
                          <ListItemIcon>
                            <AdminPanelSettingsRoundedIcon color="secondary" />
                          </ListItemIcon>
                          <Typography
                            variant="h6"
                            color="secondary"
                            sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 600 }}
                          >
                            Адмін панель
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                    )}
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link}
                        to={PATHS.profile.courses}
                        onClick={handleCloseUserMenu}
                        sx={{ borderBottom: '3px solid #FFFFFF' }}
                      >
                        <ListItemIcon>
                          <PersonRoundedIcon color="secondary" />
                        </ListItemIcon>
                        <Typography
                          variant="h6"
                          color="secondary"
                          sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 600 }}
                        >
                          Мої курси
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link}
                        to={PATHS.profile.settings.info}
                        onClick={handleCloseUserMenu}
                        sx={{ borderBottom: '3px solid #FFFFFF' }}
                      >
                        <ListItemIcon>
                          <SettingsRoundedIcon color="secondary" />
                        </ListItemIcon>
                        <Typography
                          variant="h6"
                          color="secondary"
                          sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 600 }}
                        >
                          Налаштування
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          sessionModel.logoutRequested();
                          handleCloseUserMenu();
                        }}
                        sx={{ borderBottom: '3px solid #FFFFFF' }}
                      >
                        <ListItemIcon>
                          <LogoutRoundedIcon color="secondary" />
                        </ListItemIcon>
                        <Typography
                          variant="h6"
                          color="secondary"
                          sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 600 }}
                        >
                          Вихід
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Menu>
              </>
            ) : (
              <>
                <LoginButton />
                <RegistrationButton />
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
