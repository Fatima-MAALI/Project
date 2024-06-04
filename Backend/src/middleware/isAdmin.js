import db from '../lib/db.js';

const isAdmin = async (req, res, next) => {
    const { id } = req.user;

    try {
        if (req.userRole === "admin") {
            next();
        } else {
            throw new Error("not authorized")
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export default isAdmin;
