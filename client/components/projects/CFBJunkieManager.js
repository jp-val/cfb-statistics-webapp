import * as React from 'react';
import { CFBJunkie } from '../../api/base';

import {
	Button,
	TextField
} from '@mui/material';

import styles from '../../styles/Admin.module.css';

const CFBJunkieManager = ({ rankings }) => {

	const [scrapeRankName, setScrapeRankName] = React.useState('ap-poll');
	const [rankingsList, setRankList] = React.useState(rankings);
	const [ranking, setRanking] = React.useState(null);
	const [indexEdit, setIndexEdit] = React.useState(null);
	const [teamNameEdit, setTeamNameEdit] = React.useState('');
	const [showConfirmDelete, setConfirmDelete] = React.useState(false);
	const [isLoading, setLoading] = React.useState(false);

	var rankingIndex = 0;

	const setRankingv2 = (newRanking) => {
		setConfirmDelete(false);
		setRanking(newRanking);
	}

	const handleChange = (attribute, event) => {
		setRankingv2({ ...ranking, [attribute]: event.target.value });
	}

	const scrapeRanking = async () => {
		
		try {

			const response = await CFBJunkie.post('/scrape-ranking/' + scrapeRankName);
			setRankingv2(response.data.ranking);

		} catch (error) {

			console.log('Error while scraping ranking:', error);
		}
	}

	const uploadRanking = async () => {
		
		try {

			await CFBJunkie.post('/upload-ranking', { ...ranking });
			const response = await CFBJunkie.get('/season-rankings');
			setRankList(response.data.rankings);
			setRankingv2(null);

		} catch (error) {

			console.log('Error while uploading ranking:', error);
		}
	}

	const updateRanking = async () => {

		try {

			await CFBJunkie.put('/update-ranking', { ...ranking });
			const response = await CFBJunkie.get('/season-rankings');
			setRankList(response.data.rankings);
			setRankingv2(null);

		} catch (error) {

			console.log('Error while uploading ranking:', error);
		}
	}

	const deleteRanking = async () => {
		
		try {

			if (!ranking.id) return;

			await CFBJunkie.delete('/delete-ranking/' + ranking.id);
			setRankingv2(null);

			const response = await CFBJunkie.get('/season-rankings');
			setRankList(response.data.rankings);

		} catch (error) {
			
			console.log('Error while deleting ranking:', error);
		}
	}

	const handleNewTeamName = (index) => {

		const newRanking = Array.from(ranking['ranking']);
		newRanking[index] = teamNameEdit;

		setRankingv2({ ...ranking, ranking: newRanking });
		setIndexEdit(null);
	}

	const handleTeamNameEdit = (index, teamName) => {
		
		setIndexEdit(index);
		setTeamNameEdit(teamName);
	}

	const editableRanking = (index, teamName) => {

		return (
			<div className={styles.rankingElement} key={index + teamName}>
				{ index === indexEdit ?
					<div>
						<Button
							size="small"
							variant="contained"
							onClick={() => handleNewTeamName(index)}
						>Set</Button>
						<Button
							size="small"
							variant="contained"
							onClick={() => setIndexEdit(null)}
						>Cancel</Button>
						<TextField
							sx={{ width: 250 }}
							size="small"
							id="outlined-textarea-ranking-names-indexes"
							label={"Ranking #" + (index+1)}
							type="text"
							value={teamNameEdit}
							onChange={(e) => setTeamNameEdit(e.target.value)}
						/>
					</div>
				:
					<div>
						<Button
							size="small"
							variant="contained"
							onClick={() => handleTeamNameEdit(index, teamName)}
						>Edit</Button>
						<span>{(index+1) + '. ' + teamName}</span>
					</div>
				}
			</div>
		)
	}

  return (
    <div>

			<h1>CFB Junkies</h1>
			
			<div className={styles.leftTrifold}>
				<h1>Season Rankings</h1>
				<div className={styles.seasonRankingsList}>
					<table>
						<tbody>
						{ rankingsList.map((ranking) => (
							<tr className={styles.aRanking} key={ranking.id} onClick={() => setRankingv2(ranking)}>
								<td><span>{ranking.name}</span></td>
								<td><span>{ranking.season}</span></td>
								<td><span>{ranking.week}</span></td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
			</div>

			<div className={styles.centerTrifold}>
				<h1>Scraping Controls</h1>
				<TextField
					sx={{ width: 200, marginBottom: 2 }}
					size="small"
					id="outlined-textarea-scrape-name"
					label="Ranking to Scrape"
					type="text"
					value={scrapeRankName}
					onChange={(e) => setScrapeRankName(e.target.value)}
				/>
				<Button onClick={scrapeRanking} size='small' variant="contained">
					Scrape Ranking
				</Button>

				<h1>Ranking Details</h1>
				{ ranking ?
					<>
						<TextField
							sx={{ width: 200, marginBottom: 2 }}
							size='small'
							id='outlined-textarea-rank-name'
							label='Name'
							type='text'
							value={ranking.name}
							onChange={(event) => handleChange('name', event)}
						/>
						<TextField
							sx={{ width: 150, marginBottom: 2 }}
							size='small'
							id='outlined-textarea-rank-season'
							label='Season'
							type='number'
							value={ranking.season}
							onChange={(e) => handleChange('season', e)}
						/>
						<TextField
							sx={{ width: 100, marginBottom: 2 }}
							size='small'
							id='outlined-textarea-rank-week'
							label='Week'
							type='number'
							value={ranking.week}
							onChange={(e) => handleChange('week', e)}
						/>
						<Button
							sx={{ marginBottom: 2 }}
							onClick={ranking.id ? updateRanking : uploadRanking}
							size='small'
							color={ranking.id ? 'secondary' : 'success'}
							variant='contained'
						>{ ranking.id ? 'Update' : 'Upload'} Ranking</Button>
						{ showConfirmDelete ?
							<>
								<Button
									sx={{ marginBottom: 2 }}
									onClick={deleteRanking}
									size='small'
									color='error'
									variant='contained'
									disabled={ranking.id ? false : true}
								>Confirm Delete Ranking</Button>
								<Button
									sx={{ marginBottom: 2 }}
									onClick={() => setConfirmDelete(false)}
									size='small'
									color='error'
									variant='contained'
								>Cancel</Button>
							</>
							:
							<Button
								sx={{ marginBottom: 2 }}
								onClick={() => setConfirmDelete(true)}
								size='small'
								color='error'
								variant='contained'
								disabled={ranking.id ? false : true}
							>Delete Ranking</Button>
						}
						<Button
							onClick={() => setRankingv2(null)}
							size='small'
							color='primary'
							variant='contained'
						>Clear</Button>
					</>
				:
					<span>No ranking has been selected.</span>
				}
			</div>

			<div className={styles.rightTrifold}>
				<h1>Ranking</h1>
				<div className={styles.rankingList}>
					{ ranking ?
						<>
							{
								ranking.ranking.map((team) => (
									editableRanking(rankingIndex++, team)
								))
							}
						</>
					:
						null
					}
				</div>
    	</div>
		</div>
  );
}

export default CFBJunkieManager