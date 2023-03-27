/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import * as React from 'react';
import axios from 'axios';
import { Link, useOutletContext } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { serverIP, clog } from '../config';

export default function SignIn() {
  const [controller] = useOutletContext();
  // const navigate = useNavigate();
  const handleLoadingPopup = () => {
    controller.setOpenLoading(true);
  };
  const handleLoadingPopdown = () => {
    controller.setOpenLoading(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!document.querySelector('#email').checkValidity()) {
      controller.setAlertMsg('please re-check your email');
      controller.setAlertState('error');
      controller.setOpenAlert(true);
      return;
    }
    const data = new FormData(event.currentTarget);
    const signData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    handleLoadingPopup();
    axios.post(`${serverIP}/signIn`, signData, { withCredentials: true }).then((res) => {
      clog(res.data);
      if (res.data.success === true) {
        controller.setAlertMsg('Login Success');
        controller.setAlertState('success');
        controller.setOpenAlert(true);
        // because of Header re-render
        location.href = '/';
        // navigate('/');
      } else {
        controller.setAlertMsg('Login Failed,Please Re-Check your email&password');
        controller.setAlertState('error');
        controller.setOpenAlert(true);
      }
    }).catch((err) => {
      controller.setAlertMsg(err.toString());
      controller.setAlertState('error');
      controller.setOpenAlert(true);
    }).finally(() => {
      handleLoadingPopdown();
    });
  };

  return (

    <Container component="main" maxWidth="xs">
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="/" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link to="/SignUp" style={{ color: 'Azure' }}>Dont have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>

  );
}
