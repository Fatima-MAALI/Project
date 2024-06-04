import jwt from 'jsonwebtoken';
import db from '../lib/db.js';

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

const Admin = db.Admin;
const Doctor = db.Doctor;
const Patient = db.Patient;

const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        let user = await Admin.findOne({ email: decoded.email });
        if (user) {
            req.userRole = "admin"
            req.admin = user
            return next()
        }
        user = await Doctor.findOne({ email: decoded.email });
        if (user) {
            req.userRole = "doctor"
            req.doctor = user
            return next()
        }
        user = await Patient.findOne({ email: decoded.email });
        if (user) {
            req.userRole = "patient"
            req.patient = user
            return next()
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default isAuthenticated;
