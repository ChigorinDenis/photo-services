import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountMenu from './AccountMenu';
import { Link } from 'react-router-dom';
import { openDialog } from '../reducers/uiReducer';



export default function ButtonAppBar() {
  const auth = useSelector(state => state.auth);
  const basket = useSelector(state => state.basket);
  const dispatch = useDispatch();

  const menuId = 'primary-search-account-menu';
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleMenuClose = () => {
    setAnchorEl(null);  
  };
  const isMenuOpen = Boolean(anchorEl);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Фото | <sub>салон</sub>
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              color="inherit"
            > 
              {basket.length > 0 ?
                (<Badge 
                  badgeContent={basket.length}
                  color="error"
                  onClick={() => {
                    dispatch(openDialog('basket'))
                  }}
                >
                  <ShoppingCartIcon 
                  />
                </Badge>):
                <ShoppingCartIcon
                  onClick={() => {
                    dispatch(openDialog('basket'))
                  }
                }                
                />
              }
              </IconButton>
            {auth.isAuth ? (<IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>) : (
            
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                as={Link} 
                to='/login'
              >
                <LoginIcon />
              </IconButton>
            
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <AccountMenu
        open={isMenuOpen}
        handleClose={handleMenuClose}
        anchorEl={anchorEl}
      />
    </Box>
  );
}