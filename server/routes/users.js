import express from 'express';

const router = express.Router();

import { authenticate, finish } from '../middleware/auth.js';
import { signup, signin, signout } from '../controllers/users.js';

import {
	uploadProject,
	updateProject,
	deleteProject,
	getProject,
	getUserProjects,
	getPublicProjects,
} from '../controllers/projects.js';

import {
	uploadArticle,
	updateArticle,
	deleteArticle,
	getArticle,
	getUserArticles,
	getPublicArticles,
} from '../controllers/articles.js';

router.get('/validate-access', authenticate, finish);

router.post('/signup', signup);
router.post('/signin', signin);
router.delete('/signout', signout);

router.post('/upload-project', authenticate, uploadProject);
router.put('/update-project', authenticate, updateProject);
router.patch('/delete-project', authenticate, deleteProject);

router.get('/get-project', authenticate, getProject);
router.get('/get-projects', authenticate, getUserProjects);
router.get('/get-public-projects', getPublicProjects);

router.post('/upload-article', authenticate, uploadArticle);
router.put('/update-article', authenticate, updateArticle);
router.patch('/delete-article', authenticate, deleteArticle);

router.get('/get-article', authenticate, getArticle);
router.get('/get-articles', authenticate, getUserArticles);
router.get('/get-public-articles', getPublicArticles);

export default router