import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Navbar = () => {
	return (
		<AppBar position="static">
		<Container>

		</Container>
		<Container sx={{padding: 2}} maxWidth="xl">
			<div>
			<Link href='/'><a>Home</a></Link>
			<Link href='/about'><a>About</a></Link>
			</div>
		</Container>
	  </AppBar>
	)
}

export default Navbar