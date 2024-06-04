import bcrypt from 'bcryptjs';
import db from '../lib/db.js';
import { generateToken } from '../utils/jwt.js';
import moment from 'moment';

const Admin = db.Admin;

// Register a new admin
export const registerAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });

        await newAdmin.save();
        const token = generateToken(newAdmin._id, email);

        res.status(201).json({ token, admin: newAdmin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login an existing admin
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(admin._id, email);
        res.status(200).json({ token, admin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const Patient = db.Patient;
const Appointment = db.Appointment;
const Doctor = db.Doctor;

export const getAdminStats = async (req, res) => {
    try {
        // Calculate the start and end of the current and previous week
        const startOfWeek = moment().startOf('week').toDate();
        const endOfWeek = moment().endOf('week').toDate();
        const startOfLastWeek = moment().subtract(1, 'weeks').startOf('week').toDate();
        const endOfLastWeek = moment().subtract(1, 'weeks').endOf('week').toDate();

        // Calculate the start and end of the current and previous day
        const startOfDay = moment().startOf('day').toDate();
        const endOfDay = moment().endOf('day').toDate();
        const startOfYesterday = moment().subtract(1, 'days').startOf('day').toDate();
        const endOfYesterday = moment().subtract(1, 'days').endOf('day').toDate();

        // New patients this week
        const currentWeekPatients = await Patient.countDocuments({
            createdAt: { $gte: startOfWeek, $lte: endOfWeek }
        });
        const lastWeekPatients = await Patient.countDocuments({
            createdAt: { $gte: startOfLastWeek, $lte: endOfLastWeek }
        });

        const patientDifference = currentWeekPatients - lastWeekPatients;
        const patientUp = patientDifference >= 0;
        const patientPercentageChange = lastWeekPatients > 0 ? ((patientDifference / lastWeekPatients) * 100).toFixed(2) : 100;

        // Number of appointments today
        const currentDayAppointments = await Appointment.countDocuments({
            date: { $gte: startOfDay, $lte: endOfDay }
        });
        const yesterdayAppointments = await Appointment.countDocuments({
            date: { $gte: startOfYesterday, $lte: endOfYesterday }
        });

        const appointmentDifference = currentDayAppointments - yesterdayAppointments;
        const appointmentUp = appointmentDifference >= 0;
        const appointmentPercentageChange = yesterdayAppointments > 0 ? ((appointmentDifference / yesterdayAppointments) * 100).toFixed(2) : 100;

        // Total number of users
        const totalPatients = await Patient.countDocuments({});
        const totalDoctors = await Doctor.countDocuments({});
        const totalUsers = totalPatients + totalDoctors;

        res.send({
            newPatientsThisWeek: {
                number: currentWeekPatients,
                up: patientUp,
                percentageChange: patientPercentageChange
            },
            appointmentsToday: {
                number: currentDayAppointments,
                up: appointmentUp,
                percentageChange: appointmentPercentageChange
            },
            totalPatients,
            totalDoctors
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('doctor', 'firstname lastname phone')
            .populate('patient', 'firstname lastname phone');

        res.send({ appointments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().select('-password'); // Exclude password field
        res.send({ doctors });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteDoctor = async (req, res) => {
    const { doctorId } = req.params;
    try {
        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        await doctor.deleteOne();
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const Contact = db.Contact;

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.send({ contacts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const toggleContactSeen = async (req, res) => {
    const { contactId } = req.body;

    try {
        const contact = await Contact.findById(contactId);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        contact.seen = !contact.seen;
        await contact.save();

        res.send({ message: 'Contact seen status updated successfully', contact });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
