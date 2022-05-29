import Link from 'next/link'

import {
  Button,
} from '@mui/material';

import styles from '../styles/Admin.module.css';

export const getServerSideProps = async () => {
  
}

const AdminDashboard = () => {

  return (
    <div>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <div className={styles.form}>
        <div className={styles.container1}>
          <Link href="/admin/new-project">
            <Button variant="contained">New Project</Button>
          </Link>
        </div>
        <div className={styles.container2}>
          <Link href="/admin/new-article">
            <Button variant="contained">New Article</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard