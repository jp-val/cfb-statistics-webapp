import dotenv from 'dotenv';

import UserModal from '../models/user.js';
import ProjectModal from '../models/project.js';

dotenv.config();

export const uploadProject = async (req, res) => {

	try {

		const { id } = res.locals;
		const { project } = req.body;

		const newProject = await ProjectModal.create(project);
		if (!newProject) return res.status(500).json({ message: "Failed to create project." });

		await UserModal.findByIdAndUpdate(id, { $push: { projects: newProject._id }});

		const pid = newProject._doc._id;
		delete newProject._doc._id;
		delete newProject._doc.__v;

		return res.status(200).json({ project: { pid, ...newProject._doc }});

	} catch (error) {

		console.log("Internal server error while uploading project:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const updateProject = async (req, res) => {

	try {

		const { id } = res.locals;
		const { project } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(400).json({ message: "Invalid user ID." });

		const isUsersProject = user.projects.some(function (projectId) {
			return projectId.equals(project.pid);
		});

		if (!isUsersProject) return res.status(403).json({ message: "Project does not belong to user or project does not exist." });
		const updatedProject = await ProjectModal.findByIdAndUpdate(
			project.pid,
			{ ...project, lastUpdate: Date.now() },
			{ new: true }
		);

		if (!updatedProject) return res.status(500).json({ message: "Failed to update project." })

		const pid = updatedProject._doc._id;
		delete updatedProject._doc._id;
		delete updatedProject._doc.__v;

		return res.status(200).json({ project: { pid, ...updatedProject._doc }});

	} catch (error) {

		console.log("Internal server error while updating project:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const deleteProject = async (req, res) => {

	try {

		const { id } = res.locals;
		const { pid } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(400).json({ message: "Invalid user ID." });

		const isUsersProject = user.projects.some(function (projectId) {
			return projectId.equals(pid);
		});

		if (!isUsersProject) return res.status(403).json({ message: "Project does not belong to user or project does not exist." });
		await UserModal.findByIdAndUpdate(id, { $pull: { projects: pid }});

		const project = await ProjectModal.findByIdAndDelete(pid);
		if (!project) return res.status(500).json({ message: "Failed to delete project." })

		delete project._doc._id;
		delete project._doc.__v;

		return res.status(200).json({ project: { pid, ...project._doc }});

	} catch (error) {

		console.log("Internal server error while deleting project:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const getProject = async (req, res) => {

	try {

		const { id } = res.locals;
		const { pid } = req.data;

		const user = await UserModal.findById(id);
		if (!user) return res.status(400).json({ message: "User ID does not exist." });

		const isUsersProject = user.projects.some(function (projectId) {
			return projectId.equals(pid);
		});

		if (!isUsersProject) return res.status(403).json({ message: "Project does not belong to user." });
		
		const project = await ProjectModal.findById(pid);
		if (!project) return res.status(404).json({ message: "Project does not exist." });

		delete project._doc._id;
		delete project._doc.__v;

		return res.status(200).json({ project: { pid, ...project._doc }});

	} catch (error) {

		console.log("Internal server error while getting project:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const getUserProjects = async (req, res) => {

	try {

		const { id } = res.locals;

		const user = await UserModal.findById(id);
		if (!user) return res.status(400).json({ message: "User ID does not exist." });
		
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

		console.log("Internal server error while getting user's projects:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const getPublicProjects = async (req, res) => {

	try {

		const user = await UserModal.findOne({ username: process.env.USER });
		if (!user) return res.status(400).json({ message: "User does not exist." });
		
		const projects = [];
		for (let i = 0; i < user.projects.length; i++) {
			const project = await ProjectModal.findById(user.projects[i]);
			if (!project) continue;
			if (!project.isPublic) continue;

			delete project._doc._id;
			delete project._doc.__v;
			delete project._doc.isPublic;
			
			projects.push({ ...project._doc });
		}

		return res.status(200).json({ projects });

	} catch (error) {

		console.log("Internal server error while getting public projects:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};