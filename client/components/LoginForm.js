import * as React from 'react';

import { useCookies } from 'react-cookie';
import { API } from '../api/base.js';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../styles/Admin.module.css';

const LoginForm = ({setLogin}) => {

  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const doLogin = async () => {
  
    const res = await API.post('/user/signin', { username, password });
    
    if (res.data.authToken) {
      setCookie('authToken', res.data.authToken);
      setLogin(true);
    }

    setPassword('');
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.welcome}>Welcome back, Jose Pablo!</h1>
      <TextField
        sx={{width: `25%`, marginBottom: 2}}
        required
        id="outlined-required"
        label="Username"
        value={username}
        onChange={(event) => {setUsername(event.target.value)}}
      />
      <TextField
        sx={{width: `25%`, marginBottom: 2}}
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => {setPassword(event.target.value)}}
      />
      <Button variant="contained" onClick={doLogin}>Sign In</Button>
    </div>
  )
}

export default LoginForm