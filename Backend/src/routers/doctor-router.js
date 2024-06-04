import express from 'express';
import { registerDoctor, loginDoctor, getAllDoctors } from '../controllers/doctor-controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import isDoctor from '../middleware/isDoctor.js';

const router = express.Router();

// Route for doctor registration
router.post('/register', registerDoctor);

// Route for doctor login
router.post('/login', loginDoctor);

router.get('/doctors', isAuthenticated, getAllDoctors);


// Example of a protected route that only authenticated doctors can access
router.get('/profile', isAuthenticated, isDoctor, (req, res) => {
    res.json({ doctor: req.doctor });
});

export default router;
