import express from 'express';
import { registerAdmin, loginAdmin, getAdminStats, getAllAppointments, getAllDoctors, deleteDoctor, getAllContacts, toggleContactSeen } from '../controllers/admin-controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

// Route for admin registration
router.post('/register', registerAdmin);

// Route for admin login
router.post('/login', loginAdmin);

router.get('/stats', isAuthenticated, isAdmin, getAdminStats);

router.get('/appointments', isAuthenticated, isAdmin, getAllAppointments);

router.get('/doctors', isAuthenticated, isAdmin, getAllDoctors);

router.delete('/doctor/:doctorId', isAuthenticated, isAdmin, deleteDoctor);

router.get('/contacts', isAuthenticated, isAdmin, getAllContacts);

router.put('/contact/seen', isAuthenticated, isAdmin, toggleContactSeen);


// Example of a protected route that only authenticated admins can access
router.get('/profile', isAuthenticated, isAdmin, (req, res) => {
    res.json({ admin: req.admin });
});

export default router;
