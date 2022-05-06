import * as React from 'react';
import { useCookies } from 'react-cookie';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../styles/Admin.module.css';

const LoginForm = ({setLogin}) => {

  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const doLogin = async () => {
  
    console.log('doing login');
    
    const res = await fetch(`http://localhost:3000/api/signin`, {

      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    const retval = await res.json();
    console.log('whats up bro', retval);
    
    if (retval.authToken) {
      setLogin(true);
      setCookie("authToken", retval.authToken);
    }

    // setUsername("");
    // setPassword("");
  
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