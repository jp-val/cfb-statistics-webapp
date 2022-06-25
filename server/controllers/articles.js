import dotenv from 'dotenv';

import UserModal from '../models/user.js';
import ArticleModal from '../models/article.js';

dotenv.config();

export const getArticles = async (req, res) => {

	try {

		const user = await UserModal.findOne({ username: process.env.USER });
		if (!user) return res.status(200).json({ message: "User ID does not exist." });
		
		const articles = [];
		for (let i = 0; i < user.articles.length; i++) {
			const article = await ArticleModal.findById(user.articles[i]);
			if (!article) continue;

			const aid = article._doc._id;
			delete article._doc._id;
			delete article._doc.__v;

			articles.push({ aid, ...article._doc });
		}

		return res.status(200).json({ articles });

	} catch (error) {

		console.log("Something went wrong while getting projects:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const getArticle = async (req, res) => {

	try {

		const { id, aid } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(200).json({ message: "User ID does not exist." });

		const isUsersArticle = user.articles.some(function (articleId) {
			return articleId.equals(aid);
		});

		if (!isUsersArticle) return res.status(200).json({ message: "Project does not belong to user." });
		
		const article = await ArticleModal.findById(aid);
		if (!article) return res.status(200).json({ message: "Project does not exist." });

		delete article._doc._id;
		delete article._doc.__v;
		return res.status(200).json({ aid, ...article._doc });

	} catch (error) {

		console.log("Something went wrong while getting project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const uploadArticle = async (req, res) => {

	try {

		const { id, article } = req.body;

		const newArticle = await ArticleModal.create(article);
		if (!newArticle) return res.status(200).json({ message: "Failed to create project." });

		await UserModal.findByIdAndUpdate(
			id,
			{ $push: { articles: newArticle._id }},
			{ new: true }
		);

		return res.status(200).json({ aid: newArticle._id, message: "Successfully uploaded project." });

	} catch (error) {

		console.log("Something went wrong while uploading project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const updateArticle = async (req, res) => {

	try {

		const { id, aid, article } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(200).json({ message: "Invalid user ID." });

		const isUsersArticle = user.articles.some(function (articleId) {
			return articleId.equals(aid);
		});

		if (!isUsersArticle) return res.status(200).json({ message: "Project does not belong to user or project does not exist." });

		await ArticleModal.findByIdAndUpdate(aid, { ...article, lastUpdate: Date.now() });

		return res.status(200).json({ message: "Updated project successfully." });

	} catch (error) {

		console.log("Something went wrong while updating project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const deleteArticle = async (req, res) => {

	try {

		const { id, aid } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(200).json({ message: "Invalid user ID." });

		const isUsersArticle = user.articles.some(function (articleId) {
			return articleId.equals(aid);
		});

		if (!isUsersArticle) return res.status(200).json({ message: "Project does not belong to user or project does not exist." });

		await UserModal.findByIdAndUpdate(
			id,
			{ $pull: { articles: aid }},
			{ new: true }
		);

		await ArticleModal.findByIdAndDelete(aid);

		return res.status(200).json({ message: "Successfully deleted project." });

	} catch (error) {

		console.log("Something went wrong while deleting project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};