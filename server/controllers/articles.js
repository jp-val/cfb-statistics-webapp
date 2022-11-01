import dotenv from 'dotenv';

import UserModal from '../models/user.js';
import ArticleModal from '../models/article.js';

dotenv.config();

export const uploadArticle = async (req, res) => {

	try {

		const { id } = res.locals;
		const { article } = req.body;

		const newArticle = await ArticleModal.create(article);
		if (!newArticle) return res.status(500).json({ message: "Failed to upload project." });

		await UserModal.findByIdAndUpdate(id, { $push: { articles: newArticle._id }});

		const aid = newArticle._doc._id;
		delete newArticle._doc._id;
		delete newArticle._doc.__v;

		return res.status(200).json({ article: { aid, ...newArticle }});

	} catch (error) {

		console.log("Internal server error while uploading article:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const updateArticle = async (req, res) => {

	try {
		const { id } = res.locals;
		const { article } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(400).json({ message: "Invalid user ID." });

		const isUsersArticle = user.articles.some(function (articleId) {
			return articleId.equals(article.aid);
		});

		if (!isUsersArticle) return res.status(403).json({ message: "Project does not belong to user or project does not exist." });
		const updatedArticle = await ArticleModal.findByIdAndUpdate(
			article.aid,
			{ ...article, lastUpdate: Date.now() },
			{ new: true }
		);

		if (!updatedArticle) return res.status(500).json({ message: "Failed to updated project." });

		const aid = updatedArticle._doc._id;
		delete updatedArticle._doc._id;
		delete updatedArticle._doc.__v;

		return res.status(200).json({ article: { aid, ...updatedArticle }});

	} catch (error) {

		console.log("Internal server error while updating article:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const deleteArticle = async (req, res) => {

	try {

		const { id } = res.locals;
		const { aid } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(400).json({ message: "Invalid user ID." });

		const isUsersArticle = user.articles.some(function (articleId) {
			return articleId.equals(aid);
		});

		if (!isUsersArticle) return res.status(403).json({ message: "Article does not belong to user or article does not exist." });
		await UserModal.findByIdAndUpdate(id, { $pull: { articles: aid }});
		
		const article = await ArticleModal.findByIdAndDelete(aid);
		if (!article) return res.status(500).json({ message: "Failed to delete article." });

		delete article._doc._id;
		delete article._doc.__v;

		return res.status(200).json({ article: { aid, ...article._doc }});

	} catch (error) {

		console.log("Internal server error while deleting article:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const getArticle = async (req, res) => {

	try {

		const { id } = res.locals;
		const { aid } = req.data;

		const user = await UserModal.findById(id);
		if (!user) return res.status(400).json({ message: "User ID does not exist." });

		const isUsersArticle = user.articles.some(function (articleId) {
			return articleId.equals(aid);
		});

		if (!isUsersArticle) return res.status(403).json({ message: "Project does not belong to user." });
		
		const article = await ArticleModal.findById(aid);
		if (!article) return res.status(404).json({ message: "Project does not exist." });

		delete article._doc._id;
		delete article._doc.__v;

		return res.status(200).json({ article: { aid, ...article._doc }});

	} catch (error) {

		console.log("Internal server error while getting article:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const getUserArticles = async (req, res) => {

	try {

		const { id } = res.locals;

		const user = await UserModal.findById(id);
		if (!user) return res.status(400).json({ message: "User ID does not exist." });
		
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

		console.log("Internal server error while getting user's articles:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const getPublicArticles = async (req, res) => {

	try {

		const user = await UserModal.findOne({ username: process.env.USER });
		if (!user) return res.status(400).json({ message: "User does not exist." });
		
		const articles = [];
		for (let i = 0; i < user.articles.length; i++) {
			const article = await ArticleModal.findById(user.articles[i]);
			if (!article) continue;
			if (!article.isPublic) continue;

			// const aid = article._doc._id;
			delete article._doc._id;
			delete article._doc.__v;
			delete article._doc.isPublic;

			articles.push({ ...article._doc });
		}

		return res.status(200).json({ articles });

	} catch (error) {

		console.log("Internal server error while getting public articles:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};