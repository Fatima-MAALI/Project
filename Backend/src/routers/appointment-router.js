import express from 'express';
import { createAppointment, getAppointmentsForPatient, getAppointmentsForDoctor, updateAppointmentStatus, deleteAppointment, getUpcomingAppointmentsForDoctor, getPatientsOfDoctor } from '../controllers/appointment-controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import isPatient from '../middleware/isPatient.js';
import isDoctor from '../middleware/isDoctor.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

// Route for creating an appointment
router.post('/', isAuthenticated, createAppointment);

// Route for getting appointments for a specific patient
router.get('/patient/:patientId', isAuthenticated, isPatient, getAppointmentsForPatient);

router.get('/patient/:patientId', isAuthenticated, isPatient, getAppointmentsForPatient);

// Route for getting appointments for a specific doctor
router.get('/doctor/:doctorId', isAuthenticated, isDoctor, getAppointmentsForDoctor);

// Route for updating appointment status
router.put('/:appointmentId', isAuthenticated, updateAppointmentStatus);

router.delete('/:appointmentId', isAuthenticated, deleteAppointment);

router.get('/upcoming', isAuthenticated, isDoctor, getUpcomingAppointmentsForDoctor);

router.get('/patients', isAuthenticated, isDoctor, getPatientsOfDoctor);


export default router;
