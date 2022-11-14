import ProfessorModal from '../models/professor.js';

import { calcNewRating } from '../other/elo.js';

export const newProfessor = async (req, res) => {

	try {

		const { name } = req.body;

		const professor = new ProfessorModal({ name });
		await professor.save();

		return res.status(200).json({ professor });

	} catch (error) {

		console.log("Internal server error while adding new professor:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
}

export const getRandomMatchup = async (req, res) => {

	try {

		const professor1 = await ProfessorModal.aggregate([{ $sample: { size: 1 } }]);
		let professor2 = await ProfessorModal.aggregate([{ $sample: { size: 1 } }]);
		
		while (professor2.id === professor1.id)
			professor2 = await ProfessorModal.aggregate([{ $sample: { size: 1 } }]);

		return res.status(200).json({ professor1, professor2 });

	} catch (error) {

		console.log("Internal server error while getting random matchup: ", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
}

export const getRandomProfessor = async (req, res) => {

	try {

		const { currentProfessor } = req.body;

		let professor = await ProfessorModal.aggregate([{ $sample: { size: 1 } }]);

		while (currentProfessor._id === professor._id)
			professor = ProfessorModal.aggregate([{ $sample: { size: 1 } }]);

		return res.status(200).json({ professor });

	} catch (error) {

		console.log("Internal server error while getting random professor:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
}

export const updateProfessorRatings = async (req, res) => {

	try {

		const { winner, loser } = req.body;

		const currentWinnerData = await ProfessorModal.findById(winner._id);
		const currentLoserData = await ProfessorModal.findById(loser._id);

		const newWinnerRating = calcNewRating(currentWinnerData.rating, currentLoserData.rating, 1.0);
		const newLoserRating = calcNewRating(currentLoserData.rating, currentWinnerData.rating, 0.0);

		const winnerUpdated = await ProfessorModal.findByIdAndUpdate(
			winner._id,
			{ rating: newWinnerRating, wins: currentWinnerData.wins + 1 },
			{ new: true }
		);

		const loserUpdated = await ProfessorModal.findByIdAndUpdate(
			loser._id,
			{ rating: newLoserRating, losses: currentLoserData.losses + 1 },
			{ new: true }
		);

		return res.status(200).json({ winner: winnerUpdated, loser: loserUpdated });

	} catch (error) {

		console.log("Internal server error while updating ratings:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
}

export const updateProfessorProfile = async (req, res) => {

	try {

		const { professor } = req.body;

		const updatedProfessor = await ProfessorModal.findByIdAndUpdate(
			professor._id,
			{ ...professor },
			{ new: true }
		);

		return res.status(200).json({ professor: updatedProfessor });

	} catch (error) {

		console.log("Internal server error while updating professor profile:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
}

export const getProfessorRankings = async (req, res) => {

	try {

		const ranking = await ProfessorModal.find({ isActive: true });
		
		ranking.sort((a, b) => {
			return a.rating - b.rating;
		});

		return res.status(200).json({ ranking });

	} catch (error) {

		console.log("Internal server error while getting professor rankings:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
}