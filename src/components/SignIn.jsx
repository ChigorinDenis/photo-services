import * as React from 'react';
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { logIn } from '../reducers/authReducer';
import routes from '../routes';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuth }  = useSelector(state => state.auth);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user ={
      username: data.get('username'),
      password: data.get('password'),
    };
    const url = routes('login');

    try {
      const response = await axios.post(url, user);
      const userResponse = await response.data;
      if (userResponse.id) {
        dispatch(logIn(userResponse))
      }
    } catch (error) {
      console.log(error)
    }
  };

  if (isAuth) {
    const roles = user.roles.map((role) => role.name);

    if (roles.length === 0) {
      navigate('/');
    }
    if (roles.includes('ADMIN')) {
      navigate('/admin');
    }
    if (roles.includes('PHOTOGRAPHER')) {
      navigate('/photographer');
    }
    
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ????????
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="?????? ????????????????????????"
              name="username"
              autoComplete="username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="????????????"
              type="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="?????????????????? ????????"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color='secondary'
              sx={{ mt: 3, mb: 2 }}
            >
              ??????????
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ???????????? ?????????????
                </Link>
              </Grid>
              <Grid item>
                <Link 
                  href="#" 
                  variant="body2"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/registration')
                  }}
                >
                  {"?????? ?????? ????????????????? ??????????????????????"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}