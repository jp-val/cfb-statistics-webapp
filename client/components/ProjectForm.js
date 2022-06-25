import * as React from 'react';

import { useCookies } from 'react-cookie';
import { API, getUserIp } from '../api/base';

import {
  Stack,
  TextField,
  Button, 
  Typography
} from '@mui/material';

import styles from '../styles/Admin.module.css';

const ProjectForm = () => {

  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const [pid, setPid] = React.useState(cookie.pid);
  const [title, setTitle] = React.useState(cookie.title || '');
  const [link, setLink] = React.useState(cookie.link || '');
  const [description, setDescription] = React.useState(cookie.description || '');
  const [content, setContent] = React.useState(cookie.content || '');
  const [msg, setMsg] = React.useState('');

  const updateProject = async () => {

    const ip = await getUserIp();

    console.log('pid:', pid);
    console.log('title:', cookie.title);

    if (!pid) {
      
      const body = {
        ip, authToken: cookie.authToken, 
        project: { title, link, description, content }
      };

      const res = await API.post('/user/upload-project', body);
      
      if (res.data.pid) {
        setPid(res.data.pid);
        setCookie('pid', res.data.pid, { path: '/admin' });
      }

      setMsg(res.data.message);

    } else {

      console.log('updated, pid:', pid);
      
      const body = {
        ip, authToken: cookie.authToken, pid,
        project: { title, link, description, content }
      };

      const res = await API.post('/user/update-project', body);
      setMsg(res.data.message);
    }
  }

  const quit = () => {

    removeCookie('pid', { path: '/admin' });
    removeCookie('title', { path: '/admin' });
    removeCookie('link', { path: '/admin' });
    removeCookie('description', { path: '/admin' });
    removeCookie('content', { path: '/admin' });
  }

  return (
    <div className={styles.form}>
      <TextField
        sx={{width: `30%`, maxWidth: 600, marginBottom: 2}}
        required
        id="outlined-textarea-title"
        label="Title"
        type="text"
        multiline
        value={title}
        onChange={(event) => {setTitle(event.target.value); setCookie('title', event.target.value, { path: '/admin' })}}
      />
      <TextField
        sx={{width: `30%`, maxWidth: 600, marginBottom: 2}}
        id="outlined-textarea-link"
        label="Link"
        type="text"
        multiline
        value={link}
        onChange={(event) => {setLink(event.target.value); setCookie('link', event.target.value, { path: '/admin' })}}
      />
      <TextField
        sx={{width: `45%`, maxWidth: 800, marginBottom: 2}}
        id="outlined-multiline-static-description"
        label="Description"
        type="text"
        multiline
        rows={2}
        value={description}
        onChange={(event) => {setDescription(event.target.value); setCookie('description', event.target.value, { path: '/admin' })}}
      />
      <TextField
        sx={{width: `60%`, maxWidth: 1000, marginBottom: 2}}
        id="outlined-multiline-static-content"
        label="Content"
        type="text"
        multiline
        rows={20}
        value={content}
        onChange={(event) => {setContent(event.target.value); setCookie('content', event.target.value, { path: '/admin' }); setMsg('')}}
      />
      <Typography>{msg}</Typography>
      <div>
        <Button variant="contained" onClick={updateProject}>Save</Button>
        <Button variant="contained" href="/admin/projects" onClick={quit}>Quit</Button>
      </div>
    </div>
  )
}

export default ProjectForm