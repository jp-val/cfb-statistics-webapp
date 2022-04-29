import DenseTable from '../components/Table'
import styles from '../styles/Home.module.css'

// export default function Home({articles}) {
//   return (
//     <div className={styles.container}>
//       {articles.map((article) => (
//         <h3>{article.title}</h3>
//       ))}
//     </div>
//   )
// }

export default function Home({ranking}) {
  
  return (
    <div className={styles.rankings}>
      <DenseTable {...ranking} />
      <DenseTable {...ranking} />
      <DenseTable {...ranking} />
      <DenseTable {...ranking} />
      <DenseTable {...ranking} />
    </div>
  )
}

// export const getStaticProps = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
//   const articles = await res.json()
//   console.log(articles)
//   return {
//     props: {
//       articles
//     }
//   }
// }

export const getStaticProps = async () => {
	
  const res = await fetch(`http://localhost:3000/api/hello`)
	const ranking = await res.json()
	console.log(ranking)
	
  return { props: { ranking } }
}