import Navbar from './Navbar'
import styles from '../styles/Home.module.css'

const Layout = ({children}) => {
	return (
		<>
			<Navbar />
			<div className={styles.container}>
				<main className={styles.main}>
					{children}
				</main>
			</div>
		</>
	)
}

export default Layout