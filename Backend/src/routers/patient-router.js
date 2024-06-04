import express from 'express';

import { registerPatient, loginPatient, updatePatient, createContact, changePassword } from '../controllers/patient-controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import isPatient from '../middleware/isPatient.js';

const router = express.Router();

// Route for patient registration
router.post('/register', registerPatient);

// Route for patient login
router.post('/login', loginPatient);


router.put('/', isAuthenticated, updatePatient);

router.post('/contact', createContact);

router.put('/change-password', isAuthenticated, isPatient, changePassword);


// Example of a protected route that only authenticated patients can access
router.get('/profile', isAuthenticated, isPatient, (req, res) => {
    res.json({ patient: req.patient });
});

export default router