import * as React from "react";

import styles from "../../styles/Rankings.module.css";

export default function RankingTable({ name, ranking }) {
  
	var rank = 1;

  return (
    <table className={styles.table}>
			<tbody>
				<tr className={styles.header}>
					<th colSpan={3}>{name}</th>
				</tr>
				{ ranking.map((team) => (
						<tr className={styles.row} key={rank + team}>
							<td><span>{rank++}</span></td>
							<td>
								<img
									className={styles.logo}
									alt=""
									src={"/cfb-logos/" + team.toLowerCase() + ".png"}
								/>
							</td>
							<td>
								<span>{team}</span>
							</td>
						</tr>
					))
				}
			</tbody>
		</table>
  );
}