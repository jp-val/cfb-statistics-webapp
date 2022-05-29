import * as React from 'react'
import Link from 'next/link'

import styles from '../styles/RandPassGen.module.css'

const Card = ({ object }) => {

  return (
      <a href={object.link} className={styles.card}>
        <h2>{object.title} &rarr;</h2>
        <p>{object.description}</p>
      </a>
  )
}

export default Card