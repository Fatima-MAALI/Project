import db from '../lib/db.js';

const isPatient = async (req, res, next) => {
    const { id } = req.user;

    try {
        if (req.userRole === "patient") {
            next();
        } else {
            throw new Error("not authorized")
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export default isPatient;
