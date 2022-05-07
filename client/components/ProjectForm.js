import * as React from 'react';
import { useCookies } from 'react-cookie';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import styles from '../styles/Admin.module.css'

const ProjectForm = ({setLogin}) => {

  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [content, setContent] = React.useState('');

  function generateString(length) {

    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const addProject = async () => {
    console.log('adding project ...');
  };

  const doLogout = async () => {
    setLogin(false);
    removeCookie('authToken');
  };

  return (
    <div className={styles.form}>
      <h1>New Project</h1>
      <Button variant="contained" onClick={doLogout}>Sign Out</Button>
      <TextField
        sx={{width: `30%`, marginBottom: 2}}
        required
        id="outlined-textarea"
        label="Title"
        multiline
        value={title}
        onChange={(event) => {setTitle(event.target.value)}}
      />
      <TextField
        sx={{width: `45%`, marginBottom: 2}}
        required
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={2}
        value={description}
        onChange={(event) => {setDescription(event.target.value)}}
      />
      <TextField
        sx={{width: `60%`, marginBottom: 2}}
        required
        id="outlined-multiline-static"
        label="Content"
        multiline
        rows={25}
        value={content}
        onChange={(event) => {setContent(event.target.value)}}
      />
      <Button variant="contained" onClick={addProject}>Submit</Button>
    </div>
  )
}

export default ProjectForm