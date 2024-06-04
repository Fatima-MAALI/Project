import bcrypt from 'bcryptjs';
import db from '../lib/db.js';
import { generateToken } from '../utils/jwt.js';

const Patient = db.Patient;

// Register a new patient
export const registerPatient = async (req, res) => {
    const { firstname, lastname, email, phone, gender, birthday, password, address } = req.body;
    try {
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            console.log(2)
            return res.status(400).json({ message: 'Patient already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newPatient = new Patient({
            firstname,
            lastname,
            email,
            phone,
            gender,
            birthday,
            password: hashedPassword,
            address
        });

        await newPatient.save();
        const token = generateToken(newPatient._id, email);

        res.status(201).json({ token, user: newPatient, userRole: "patient" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login an existing patient
export const loginPatient = async (req, res) => {
    const { email, password } = req.body;

    try {
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(patient._id, email);
        res.status(200).json({ token, patient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const updatePatient = async (req, res) => {
    const { firstname, lastname, phone, birthday, address, gender } = req.body;
    const patientId = req.patient._id
    try {
        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Update patient fields
        if (firstname) patient.firstname = firstname;
        if (lastname) patient.lastname = lastname;
        if (phone) patient.phone = phone;
        if (birthday) patient.birthday = birthday;
        if (address) patient.address = address;
        if (gender) patient.gender = gender;

        await patient.save();

        res.status(200).json({ message: 'Patient updated successfully', patient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const Contact = db.Contact;

export const createContact = async (req, res) => {
    const { firstname, lastname, email, message } = req.body;

    try {
        const newContact = new Contact({ firstname, lastname, email, message, seen: false });
        await newContact.save();

        res.status(201).json({ message: 'Contact created successfully', contact: newContact });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const patientId = req.patient._id;
        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, patient.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        patient.password = hashedPassword;
        await patient.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};