import Link from 'next/link'

import { useCookies } from 'react-cookie';

import {
  Stack,
  Button 
} from '@mui/material';

import styles from '../styles/Admin.module.css'

const pages = [
  { name: 'Dashboard', link: '/admin' },
  { name: 'Projects', link: '/admin/projects' },
  { name: 'Articles', link: '/admin/articles' },
];

const AdminNavBar = ({setLogin}) => {
  
  const [cookie, setCookie, removeCookie] = useCookies(['user']);

  const doLogout = async () => {
    removeCookie('authToken');
    setLogin(false);
  };

  return (
    <div className={styles.navbar}>
      {pages.map((page) => (
        <Link key={page.name} href={page.link}><a>{page.name}</a></Link>
      ))}
      <Button variant="contained" onClick={doLogout}>Sign Out</Button>
    </div>
  )
}

export default AdminNavBar