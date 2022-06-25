import * as React from 'react';

import { useCookies } from 'react-cookie';
import { API, getUserIp } from '../api/base.js';

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import styles from '../styles/Admin.module.css';

const LoginForm = ({ setLogin }) => {

  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [msg, setMsg] = React.useState('');

  const doLogin = async () => {

    if (username === '' || password === '') {
      setMsg('Invalid input.');
      return;
    }

    const ip = await getUserIp();
  
    const res = await API.post('/user/signin', { ip, username, password });
    // console.log(res.data);

    if (res.data.authToken) {
      setCookie('authToken', res.data.authToken);
      setLogin(true);
    } else if (res.data.message) {
      setMsg(res.data.message);
    } else {
      setMsg('Something went really wrong ...');
    }
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.welcome}>Welcome back, Jose Pablo!</h1>
      <TextField
        sx={{width: `25%`, marginBottom: 2}}
        id="outlined-required"
        label="Username"
        value={username}
        onChange={(event) => {setUsername(event.target.value)}}
      />
      <FormControl sx={{width: `25%`, marginBottom: 2}}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(event) => {setPassword(event.target.value)}}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {setShowPassword(!showPassword)}}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Typography sx={{marginBottom: 1}} color="red">{msg}</Typography>
      <Button variant="contained" onClick={doLogin}>Sign In</Button>
    </div>
  )
}

export default LoginForm