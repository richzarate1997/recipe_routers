import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar, Box, Button,
  Checkbox, Container,
  FormControlLabel, Grid,
  TextField, Tooltip,
  Typography
} from '@mui/material';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginErrors from '../LoginErrors';
import AuthContext from '../../contexts/AuthContext';
import { authenticate } from '../../service/authApi';


function Login({ purpose, isRegister }) {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const passwordInputType = showPassword ? 'text' : 'password';
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleChange = (event) => {
    const nextCredentials = { ...credentials };
    nextCredentials[event.target.name] = event.target.value;
    setCredentials(nextCredentials);
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isRegistration = location.pathname === '/register';
    authenticate(credentials, isRegistration)
      .then(user => {
        auth.onAuthenticated(user);
        navigate(-1);
      })
      .catch(error => setErrors(error));
  };

  return (
    <Container component='main' maxWidth='xs' sx={{ minHeight: '71vh' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#612D33' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>
          {purpose}
        </Typography>
        <Box component='form' sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Email Address'
            name='username'
            autoComplete='email'
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type={passwordInputType}
            id='password'
            autoComplete='current-password'
            onChange={handleChange}
          />
          <FormControlLabel
            label='Show password'
            control={
              <Checkbox
                value='remember'
                color='primary'
                checked={showPassword}
                onChange={handleShowPasswordChange}
              />
            }
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            {purpose}
          </Button>
          <Grid container>
            {isRegister ? null : (
              <Grid item xs>
                <Tooltip title='Well that sucks!'>
                  <Typography variant='body2'>
                    Forgot password?
                  </Typography>
                </Tooltip>
              </Grid>
            )}
            <Grid item>
              <Link to={isRegister ? '/login' : '/register'}>
                <Typography variant='body2'>
                  {isRegister ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <LoginErrors errs={errors} />
    </Container>
  )
}

export default Login;