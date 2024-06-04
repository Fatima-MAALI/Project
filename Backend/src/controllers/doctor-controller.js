import bcrypt from 'bcryptjs';
import db from '../lib/db.js';
import { generateToken } from '../utils/jwt.js';

const Doctor = db.Doctor;

// Register a new doctor
export const registerDoctor = async (req, res) => {
    const { firstname, lastname, email, phone, gender, birthday, password, address, professionalExperience, specialization, workExperience, education } = req.body;
    try {
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({
            firstname,
            lastname,
            email,
            phone,
            gender,
            birthday,
            password: hashedPassword,
            address,
            professionalExperience,
            specialization,
            workExperience,
            education
        });

        await newDoctor.save();
        const token = generateToken(newDoctor._id, email);

        res.status(201).json({ token, doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login an existing doctor
export const loginDoctor = async (req, res) => {
    const { email, password } = req.body;

    try {
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(doctor._id, email);
        res.status(200).json({ token, user: doctor, userRole: "doctor" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.send({ doctors });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}