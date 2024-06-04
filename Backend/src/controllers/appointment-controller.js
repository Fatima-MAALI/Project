import db from '../lib/db.js';

const Appointment = db.Appointment;
const Patient = db.Patient;
const Doctor = db.Doctor;

// Create a new appointment
export const createAppointment = async (req, res) => {
    const { doctorId, date } = req.body;
    const patientId = req.patient._id
    try {
        const patient = await Patient.findById(patientId);
        const doctor = await Doctor.findById(doctorId);

        if (!patient || !doctor) {
            return res.status(400).json({ message: 'Invalid patient or doctor ID' });
        }

        const newAppointment = new Appointment({
            patient: patientId,
            doctor: doctorId,
            date,
            status: 'booked'
        });

        await newAppointment.save();

        res.status(201).json({ appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get appointments for a specific patient
export const getAppointmentsForPatient = async (req, res) => {
    const { patientId } = req.params;

    try {
        const appointments = await Appointment.find({ patient: patientId }).populate('doctor', 'firstname lastname');
        res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get appointments for a specific doctor
export const getAppointmentsForDoctor = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const appointments = await Appointment.find({ doctor: doctorId }).populate('patient', 'firstname lastname phone');
        res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
    const { appointmentId } = req.params;
    const { status } = req.body;

    try {
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.status = status;
        await appointment.save();

        res.status(200).json({ appointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteAppointment = async (req, res) => {
    const { appointmentId } = req.params;

    try {
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        await appointment.deleteOne()
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getUpcomingAppointmentsForDoctor = async (req, res) => {
    const doctorId = req.doctor._id; // Assuming req.user is set by the authentication middleware

    try {
        const appointments = await Appointment.find({
            doctor: doctorId,
            status: 'confirmed',
            date: { $gte: new Date() }  // Ensure the appointment date is in the future
        }).sort({ date: 1 }).populate('patient', 'firstname lastname phone');; // Sort by date in ascending order

        res.send({ appointments })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPatientsOfDoctor = async (req, res) => {
    const doctorId = req.doctor._id; // Assuming req.user is set by the authentication middleware

    try {
        const appointments = await Appointment.find({ doctor: doctorId })
            .populate('patient', '-password') // Populate patient data, excluding password
            .sort({ date: 1 });

        const patientsMap = new Map();

        appointments.forEach(appointment => {
            const patientId = appointment.patient._id.toString();
            if (!patientsMap.has(patientId)) {
                patientsMap.set(patientId, {
                    ...appointment.patient._doc,
                    hasFutureAppointment: false,
                    futureAppointmentDate: null,
                });
            }

            if (appointment.date >= new Date() && appointment.status === "confirmed") {
                const patient = patientsMap.get(patientId);
                patient.hasFutureAppointment = true;
                patient.futureAppointmentDate = appointment.date;
                patientsMap.set(patientId, patient);
            }
        });

        const patients = Array.from(patientsMap.values());

        res.send({ patients });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};