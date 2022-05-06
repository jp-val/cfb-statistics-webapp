import ProjectModal from '../models/project.js';

export const getProjects = async (req, res) => {

	try {

		const { id } = req.body;
		return res.status(200).json({ message: "Sign out successful." });

	} catch (error) {

		console.log("Something went wrong while getting projects:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const getProject = async (req, res) => {

	try {

		const { id, project } = req.body;
		return res.status(200).json({ message: "Sign out successful." });

	} catch (error) {

		console.log("Something went wrong while getting project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const uploadProject = async (req, res) => {

	try {

		const { id, project } = req.body;
		return res.status(200).json({ message: "Sign out successful." });

	} catch (error) {

		console.log("Something went wrong while uploading project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const updateProject = async (req, res) => {

	try {

		const { id, project } = req.body;
		return res.status(200).json({ message: "Sign out successful." });

	} catch (error) {

		console.log("Something went wrong while updating project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const deleteProject = async (req, res) => {

	try {

		const { id, project } = req.body;
		return res.status(200).json({ message: "Sign out successful." });

	} catch (error) {

		console.log("Something went wrong while deleting project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};