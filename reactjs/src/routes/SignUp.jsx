/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import * as React from 'react';
import axios from 'axios';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { serverIP, clog } from '../config';

export default function SignUp() {
  const [controller] = useOutletContext();
  const navigate = useNavigate();
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
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    };
    handleLoadingPopup();
    axios.post(`${serverIP}/signUp`, signData).then((res) => {
      clog(res.data);
      if (res.data.success === true) {
        controller.setAlertMsg('SignUp Success');
        controller.setAlertState('success');
        controller.setOpenAlert(true);
        // location.href = '/#/Signin';
        navigate('/Signin');
      } else {
        controller.setAlertMsg('SignUp Failed,Please Check your email');
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/SignIn" style={{ color: 'Azure' }}>Already have an account? Sign in</Link>

            </Grid>
          </Grid>
        </Box>
      </Box>

    </Container>

  );
}
