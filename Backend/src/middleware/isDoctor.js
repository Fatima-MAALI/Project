import db from '../lib/db.js';

const isDoctor = async (req, res, next) => {
    const { id } = req.user;

    try {
        if (req.userRole === "doctor") {
            next();
        } else {
            throw new Error("not authorized")
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export default isDoctor;
