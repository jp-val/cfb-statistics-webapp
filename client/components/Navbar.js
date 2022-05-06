import Link from 'next/link'
import styles from '../styles/Home.module.css'

const pages = [ 
	{ name: 'Home', link: '/' },
  { name: 'Projects', link: '/projects' },
  { name: 'Articles', link: '/articles' },
  { name: 'About', link: '/about' },
];

const Navbar = () => {

	return (
    <div>
      <div className={styles.logo}>
        <h1>JOSE PABLO</h1>
      </div>
      <div className={styles.navbar}>
        {pages.map((page) => (
          <Link href={page.link}><a>{page.name}</a></Link>
        ))}
      </div>
    </div>
	)
}

export default Navbar