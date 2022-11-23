import * as React from 'react'
import { useRouter } from 'next/router'

import { useCookies } from 'react-cookie'
import { API } from '../../api/base'

import {
	TextField,
	Button,
	Typography
} from '@mui/material'

import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'

import styles from '../styles/Admin.module.css'

const ProjectForm = ({ proj }) => {

	const router = useRouter();

	const [cookies, setCookie, removeCookie] = useCookies(['user']);

	const [isConfirmDel, setConfirmDel] = React.useState(false);
	const [isLoading, setLoadingStatus] = React.useState(false);
	const [isSaved, setSavedStatus] = React.useState(true);
	const [msg, setMsg] = React.useState('');

	const [project, setProject] = React.useState(proj);
	const [savedProject, setSavedProject] = React.useState(proj);

	const setProjAndCookie = (project) => {
		setProject(project);
		setCookie('project', project, { path: '/' });
	}

	const handleChange = (attribute, event) => {

		const updatedProject = { ...project, [attribute]: event.target.value };
		
		setProjAndCookie(updatedProject);

		if (JSON.stringify(updatedProject) === JSON.stringify(savedProject))
			setSavedStatus(true);
		else
			setSavedStatus(false);
	}

	const updateProject = async () => {

		try {

			setLoadingStatus(true);
			
			var response = null;

			if (project.pid)
				response = await API.put('/user/update-project', { project });
			else
				response = await API.post('/user/upload-project', { project });

			setProjAndCookie(response.data.project);
			setSavedProject(response.data.project);
			setSavedStatus(true);
			
			setLoadingStatus(false);

		} catch (error) {

			console.log('Error caught while uploading/updating project:', error.response.data);
			if (error.response && error.response.data)
				setMsg(error.response.data.message);
			
			setLoadingStatus(false);
		}
	}

	const quit = () => {
		removeCookie('project');
		router.push('/admin');
	}

	return (
		<div className={styles.form}>
			<TextField
				sx={{ width: `30%`, maxWidth: 600, marginBottom: 2 }}
				required
				id="outlined-textarea-title"
				label="Title"
				type="text"
				multiline
				value={project.title}
				onChange={(event) => handleChange('title', event)}
			/>
			<TextField
				sx={{ width: `30%`, maxWidth: 600, marginBottom: 2 }}
				id="outlined-textarea-link"
				label="Link"
				type="text"
				multiline
				value={project.link}
				onChange={(event) => handleChange('link', event)}
			/>
			<TextField
				sx={{ width: `45%`, maxWidth: 800, marginBottom: 2 }}
				id="outlined-multiline-static-description"
				label="Description"
				type="text"
				multiline
				rows={2}
				value={project.description}
				onChange={(event) => handleChange('description', event)}
			/>
			<TextField
				sx={{ width: `60%`, maxWidth: 1000, marginBottom: 2 }}
				id="outlined-multiline-static-content"
				label="Content"
				type="text"
				multiline
				rows={20}
				value={project.content}
				onChange={(event) => handleChange('content', event)}
			/>
			<Typography>{msg}</Typography>
			<div>
				<LoadingButton
					size="small"
					variant="contained"
					color={isSaved ? "primary" : "secondary"}
					onClick={updateProject}
					loading={isLoading}
					loadingPosition="start"
					startIcon={<SaveIcon />}
				>
					Save
				</LoadingButton>
				{ isConfirmDel ?
					<>
						<Button size="small" variant="contained" onClick={quit}>
							Confirm Quit
						</Button>
						<Button size="small" variant="contained" onClick={() => setConfirmDel(false)}>
							Cancel
						</Button>
					</>
				:
					<Button size="small" variant="contained" onClick={() => setConfirmDel(true)}>
						Quit
					</Button>
				}
			</div>
		</div>
	);
}

export default ProjectForm