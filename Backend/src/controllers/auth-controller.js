import bcrypt from 'bcryptjs';
import db from '../lib/db.js';
import { generateToken } from '../utils/jwt.js';

const Admin = db.Admin;
const Doctor = db.Doctor;
const Patient = db.Patient;

// Login function for all user types
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [admin, doctor, patient] = await Promise.all([
            Admin.findOne({ email }),
            Doctor.findOne({ email }),
            Patient.findOne({ email }),
        ])

        // Try to find the user in the Admin collection
        let user = admin
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            const token = generateToken(user._id, email, 'admin');
            return res.status(200).json({ token, userRole: 'admin', user });
        }

        // Try to find the user in the Doctor collection
        user = doctor
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            const token = generateToken(user._id, email, 'doctor');
            return res.status(200).json({ token, userRole: 'doctor', user });
        }
        // Try to find the user in the Patient collection
        user = patient
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            const token = generateToken(user._id, email, 'patient');
            return res.status(200).json({ token, userRole: 'patient', user });
        }

        // If no user is found
        res.status(400).json({ message: 'Invalid email or password' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserRole = (req, res) => {
    res.status(200).json({ role: req.userRole });
};