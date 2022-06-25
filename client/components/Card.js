import * as React from 'react'
import Link from 'next/link'

import styles from '../styles/RandPassGen.module.css'

const Card = ({ object }) => {

  return (
    <Link href={object.link}>
      <a className={styles.card}>
        <h2>{object.title} &rarr;</h2>
        <p>{object.description}</p>
      </a>
    </Link>
  )
}

export default Card