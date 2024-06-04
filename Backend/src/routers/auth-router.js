import express from 'express';
import { getUserRole, login } from '../controllers/auth-controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';


const router = express.Router();

// Route for user login
router.post('/login', login);
router.get('/role', isAuthenticated, getUserRole);


export default router;
