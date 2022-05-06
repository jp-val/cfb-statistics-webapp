import express from 'express';

const router = express.Router();

import { authenticate, doNothing } from '../middleware/auth.js';
import { signup, signin, signout } from '../controllers/users.js';

import {
	getProject,
	getProjects,
	uploadProject,
	updateProject,
	deleteProject
} from '../controllers/projects.js';

// import {
// 	getArticle,
// 	getArticles,
// 	uploadArticle,
// 	updateArticle,
// 	deleteArticle
// } from '../controllers/articles.js';

router.post('/validate-token', authenticate, doNothing);

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);

router.get('/get-projects', getProjects);
router.post('/get-project', authenticate, getProject);
router.post('/upload-project', authenticate, uploadProject);
router.post('/update-project', authenticate, updateProject);
router.post('/delete-project', authenticate, deleteProject);

// router.get('/get-articles', getArticles);
// router.post('/get-article', authenticate, getArticle);
// router.post('/upload-article', authenticate, uploadArticle);
// router.post('/update-article', authenticate, updateArticle);
// router.post('/delete-article', authenticate, deleteArticle);

export default router;