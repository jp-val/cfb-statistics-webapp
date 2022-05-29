import * as React from 'react';

import {
  Stack,
  TextField,
  Button 
} from '@mui/material';

import styles from '../styles/Admin.module.css';

const ProjectForm = () => {

  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [content, setContent] = React.useState('');

  const updateProject = async () => {
    console.log('adding project ...');
  };

  return (
    <div className={styles.form}>
      <TextField
        sx={{width: `30%`, maxWidth: 600, marginBottom: 2}}
        required
        id="outlined-textarea-title"
        label="Title"
        multiline
        value={title}
        onChange={(event) => {setTitle(event.target.value)}}
      />
      <TextField
        sx={{width: `30%`, maxWidth: 600, marginBottom: 2}}
        id="outlined-textarea-link"
        label="Link"
        value={link}
        onChange={(event) => {setLink(event.target.value)}}
      />
      <TextField
        sx={{width: `45%`, maxWidth: 800, marginBottom: 2}}
        id="outlined-multiline-static-description"
        label="Description"
        multiline
        rows={2}
        value={description}
        onChange={(event) => {setDescription(event.target.value)}}
      />
      <TextField
        sx={{width: `60%`, maxWidth: 1000, marginBottom: 2}}
        id="outlined-multiline-static-content"
        label="Content"
        multiline
        rows={20}
        value={content}
        onChange={(event) => {setContent(event.target.value)}}
      />
      <Button variant="contained" onClick={updateProject}>Save and Continue</Button>
    </div>
  )
}

export default ProjectForm