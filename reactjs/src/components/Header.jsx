import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LinkIcon from '@mui/icons-material/Link';
import {
  AppBar, Toolbar, Typography, IconButton, Box, MenuItem, Button,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
// import cookie from 'cookie';
import { serverIP, clog } from '../config';

function Title(mg) {
  return (
    <Box display="flex" flexGrow="1">
      <Box margin={mg} display="flex">
        <LinkIcon sx={{ display: { xs: 'none', md: 'flex' }, marginBlock: 'auto', mr: 1 }} />
        <Typography
          variant="h6"
          color="primary"
          sx={{
            display: {
              marginBlock: 'auto', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem',
            },
          }}
        >
          <Link to="/">URL SHORTENER</Link>
        </Typography>
      </Box>

    </Box>
  );
}

function Header() {
  // const cookies = cookie.parse(document.cookie);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [username, setUserName] = React.useState('');
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  let pages = ['Main', 'Support', 'SignUp', 'SignIn'];
  let user;
  if (username !== 'Wrong authorization' && username !== '') {
    pages = ['Main', 'Support', 'Management', 'Logout'];
    user = (
      <Typography
        variant="h6"
        sx={{
          display: {
            marginBlock: 'auto', fontWeight: 700, lineHeight: '100%', marginRight: '0.5rem',
          },
        }}
      >
        {`Hi, ${username}`}
      </Typography>
    );
  }
  React.useEffect(() => {
    axios.get(`${serverIP}/api/getUser`).then((res) => {
      setUserName(res.data.username);
      clog(res.data.username);
    }).catch((err) => {
      clog(err);
      document.location.href = `${serverIP}/logout`;
    });
  }, []);
  return (
    <AppBar position="static" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
      <Toolbar>
        {/* md(>900px) display Full Logo&Title */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' }, width: '100%',
          }}

        >
          {Title('')}
          {user}
          <Box display="flex" alignItems="center" justifyContent="center">

            {pages.map((page) => (
              <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} key={page}>
                <Link to={`/${page}`} key={page}>{(page).toUpperCase()}</Link>
              </Button>
            ))}

          </Box>

        </Box>

        {/* if xs(<900px) display hamburger */}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" key={page}>
                    <Link to={`/${page}`} key={page}>{(page).toUpperCase()}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {Title('auto')}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
