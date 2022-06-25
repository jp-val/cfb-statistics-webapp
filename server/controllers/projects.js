import dotenv from 'dotenv';

import UserModal from '../models/user.js';
import ProjectModal from '../models/project.js';

dotenv.config();

export const getProjects = async (req, res) => {

	try {

		const user = await UserModal.findOne({ username: process.env.USER });
		if (!user) return res.status(200).json({ message: "User ID does not exist." });
		
		const projects = [];
		for (let i = 0; i < user.projects.length; i++) {
			const project = await ProjectModal.findById(user.projects[i]);
			if (!project) continue;

			const pid = project._doc._id;
			delete project._doc._id;
			delete project._doc.__v;

			projects.push({ pid, ...project._doc });
		}

		return res.status(200).json({ projects });

	} catch (error) {

		console.log("Something went wrong while getting projects:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const getProject = async (req, res) => {

	try {

		const { id, pid } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(200).json({ message: "User ID does not exist." });

		const isUsersProject = user.projects.some(function (projectId) {
			return projectId.equals(pid);
		});

		if (!isUsersProject) return res.status(200).json({ message: "Project does not belong to user." });
		
		const project = await ProjectModal.findById(pid);
		if (!project) return res.status(200).json({ message: "Project does not exist." });

		delete project._doc._id;
		delete project._doc.__v;
		return res.status(200).json({ pid, ...project._doc });

	} catch (error) {

		console.log("Something went wrong while getting project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const uploadProject = async (req, res) => {

	try {

		const { id, project } = req.body;

		const newProject = await ProjectModal.create(project);
		if (!newProject) return res.status(200).json({ message: "Failed to create project." });

		await UserModal.findByIdAndUpdate(
			id,
			{ $push: { projects: newProject._id }},
			{ new: true }
		);

		return res.status(200).json({ pid: newProject._id, message: "Successfully uploaded project." });

	} catch (error) {

		console.log("Something went wrong while uploading project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const updateProject = async (req, res) => {

	try {

		const { id, pid, project } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(200).json({ message: "Invalid user ID." });

		const isUsersProject = user.projects.some(function (projectId) {
			return projectId.equals(pid);
		});

		if (!isUsersProject) return res.status(200).json({ message: "Project does not belong to user or project does not exist." });

		await ProjectModal.findByIdAndUpdate(pid, { ...project, lastUpdate: Date.now() });

		return res.status(200).json({ message: "Updated project successfully." });

	} catch (error) {

		console.log("Something went wrong while updating project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const deleteProject = async (req, res) => {

	try {

		const { id, pid } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(200).json({ message: "Invalid user ID." });

		const isUsersProject = user.projects.some(function (projectId) {
			return projectId.equals(pid);
		});

		if (!isUsersProject) return res.status(200).json({ message: "Project does not belong to user or project does not exist." });

		await UserModal.findByIdAndUpdate(
			id,
			{ $pull: { projects: pid }},
			{ new: true }
		);

		await ProjectModal.findByIdAndDelete(pid);

		return res.status(200).json({ message: "Successfully deleted project." });

	} catch (error) {

		console.log("Something went wrong while deleting project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};