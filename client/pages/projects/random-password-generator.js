import * as React from 'react'
import Head from 'next/head'

import {
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import styles from '../../styles/RandPassGen.module.css'

export default function RandomPasswordGenerator() {
  
  const [randomPassword, setRandomPassword] = React.useState('Password');
  const [includeCapitalLetters, setIncludeCapitalLetters] = React.useState(true);
  const [includeNumbers, setIncludeNumbers] = React.useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = React.useState(true);
  const [passwordLength, setPasswordLength] = React.useState(16);

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  const handleChange = (event) => {
    if (event.target.value === '') {
      setPasswordLength('');
    } else if (!isNumber(event.target.value)) {
      setPasswordLength('');
    } else if (event.target.value < 0) {
      // do nothing
    } else if (event.target.value > 999) {
      // do nothing
    } else {
      setPasswordLength(event.target.value);
    }
  }

  const genRandPass = () => {

    if (passwordLength === '' || passwordLength === '0') {
      setRandomPassword('Enter a valid password length.');
      return;
    }

    var characters = 'abcdefghijklmnopqrstuvwxyz';
    
    if (includeCapitalLetters) {
      characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    
    if (includeNumbers && includeCapitalLetters) {
      characters += '01234567890123456789';
    } else if (includeNumbers) {
      characters += '0123456789';
    }

    if (includeSpecialChars && includeCapitalLetters) {
      characters += '!#$%&?/!#$%&?/';
    } else if (includeSpecialChars) {
      characters += '!#$%&?/';
    }

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    setRandomPassword(password);
  };

  const copyToClipboard = async () => {
    navigator.clipboard.writeText(randomPassword);
  }

  return (
    <>
      <Head>
        <title>Random Password Generator</title>
        <meta name="Random Password Generator" content="Useless 5 minute project. Just for kicks." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1>Random Password Generator</h1>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Include capital letters (A,B,C...)."
            onChange={(event) => {setIncludeCapitalLetters(event.target.checked)}}
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Include numbers (0,1,2...)."
            onChange={(event) => {setIncludeNumbers(event.target.checked)}}
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Include special characters (!,#,$,%,&,?,/)."
            onChange={(event) => {setIncludeSpecialChars(event.target.checked)}}
          />
        </FormGroup>
        
        <Stack direction="row" spacing={2}>
          <Typography sx={{mt: 1}}>Password Length:</Typography>
          <TextField
            id="password-length"
            type="Number"
            size="small"
            value={passwordLength}
            onChange={handleChange}
            sx={{mt: 0, width: 100}}
          />
        </Stack>

        <div className={styles.grid}>
          <special className={styles.special}>{randomPassword}</special>
        </div>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={genRandPass}>Generate Random Password</Button>
          <Button variant="contained" onClick={copyToClipboard}>Copy</Button>
        </Stack>
      </div>
    </>
  )
}