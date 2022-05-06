import ProjectModal from '../models/project.js';

export const getArticles = async (req, res) => {

	try {

		const { id } = req.body;
		return res.status(200).json({ message: "Sign out successful." });

	} catch (error) {

		console.log("Something went wrong while getting projects:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const getArticle = async (req, res) => {

	try {

		const { id, project } = req.body;
		return res.status(200).json({ message: "Sign out successful." });

	} catch (error) {

		console.log("Something went wrong while getting project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const uploadArticle = async (req, res) => {

	try {

		const { id, project } = req.body;
		return res.status(200).json({ message: "Sign out successful." });

	} catch (error) {

		console.log("Something went wrong while uploading project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const updateArticle = async (req, res) => {

	try {

		const { id, project } = req.body;
		return res.status(200).json({ message: "Sign out successful." });

	} catch (error) {

		console.log("Something went wrong while updating project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const deleteArticle = async (req, res) => {

	try {

		const { id, project } = req.body;
		return res.status(200).json({ message: "Sign out successful." });

	} catch (error) {

		console.log("Something went wrong while deleting project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};