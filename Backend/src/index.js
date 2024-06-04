import Express from "express"
import cors from "cors"
import db from "./lib/db.js"
import bodyParser from 'body-parser';

import patientRouter from './routers/patient-router.js';
import doctorRouter from './routers/doctor-router.js';
import adminRouter from './routers/admin-router.js';
import appointmentRouter from './routers/appointment-router.js';
import authRouter from './routers/auth-router.js';
import bcrypt from 'bcryptjs';

import { config } from "dotenv"
config()

const app = Express()
app.use(bodyParser.json());

app.use(cors())

app.use((req, res, next) => {
    console.log(`[${req.method}] : ${req.path} ${new Date().toLocaleString()}`)
    next()
})

app.use('/api/patients', patientRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/admins', adminRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/auth', authRouter);

app.get("/", async (req, res) => {
    try {
        const newAdmin = new db.Admin({
            email: "admin@admin.dev",
            password: await bcrypt.hash("123123123", 10)
        });
        await newAdmin.save();
        res.send({ message: "created admin" })
    } catch (error) {
        res.send({ message: "dentclare clinic backend" })
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.clear()
    console.log(`server is listening on http://localhost:${PORT}`)
})