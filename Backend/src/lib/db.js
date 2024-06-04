import mongoose from 'mongoose';
import { config } from "dotenv";
config();


const mongoURI = process.env.MONGO_URL || "mongodb+srv://LxYB8swYcib6A5w1:tzApTVT7ykDFLNE3v@cluster0.0vu9qtq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the Patient schema and model
const patientSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'] },
    phone: { type: String, required: true },
    gender: { type: String, enum: ['man', 'woman'], required: true },
    birthday: { type: Date, required: true },
    password: { type: String, required: true },
    address: { type: String },
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);

// Define the Doctor schema and model
const doctorSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'] },
    phone: { type: String, required: true },
    gender: { type: String, enum: ['man', 'woman'], required: true },
    birthday: { type: Date, required: true },
    password: { type: String, required: true },
    address: { type: String },
    professionalExperience: { type: [String] },
    specialization: { type: [String] },
    workExperience: { type: [String] },
    education: { type: [String] },
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);

// Define the Appointment schema and model
const appointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['booked', 'confirmed', 'completed', 'canceled'], required: true },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Define the Admin schema and model
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'] },
    password: { type: String, required: true },
}, { timestamps: true });
const Admin = mongoose.model('Admin', adminSchema);

const contactSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'] },
    message: { type: String, required: true },
    seen: { type: Boolean, required: true }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

// Export the db object containing the models
const db = {
    Patient,
    Doctor,
    Appointment,
    Admin,
    Contact
};

export default db;