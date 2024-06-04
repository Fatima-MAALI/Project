import { Check, X } from "lucide-react";
import PatientModal from "./patient-modal";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser"
import api from "../../../lib/axios"
import { toast } from "react-hot-toast"

export default function PatientDetailsPage() {
    const [loading, setLoading] = useState(true);
    const { user, getBearer } = useUser()
    const [patients, setPatients] = useState([])
    useEffect(() => {
        const f = async () => {
            try {
                const response = await api.get(`/appointments/patients`, { headers: { Authorization: getBearer() } })
                setLoading(false)
                setPatients(response.data.patients)
            } catch (error) {
                toast.error(error.response.data.message || error.response.data.error || error.response.error || "something went wrong")
            }
        }
        f()
    }, [])
    return (
        <>
            <p className="font-bold text-3xl">
                Patients details
            </p>
            <div className="h-6" />
            <div className="text-primary cursor-default">All your patients details : </div>
            <div className="h-3" />
            {loading ? (
                <div className="w-full h-16 flex justify-center items-center">
                    <div className="loading loading-lg" />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                        {patients.map((patient, index) => (
                            <div key={index} className="card card-bordered bg-primary p-3 flex flex-col justify-between items-center gap-3">
                                <div className="card card-bordered bg-base-100 rounded-box p-3 w-full">
                                    <div className="flex justify-center items-center">
                                        <div className="avatar placeholder">
                                            <div className="bg-neutral text-neutral-content rounded-full w-12 border-2 border-primary">
                                                <span className="capitalize">{patient.firstname.at(0)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-center font-bold"><span className="text-neutral-500">Patient</span> {patient.firstname} {patient.lastname}</p>
                                    <p className="text-center text-xs font-semibold"><span className="text-neutral-500">Email : </span> {patient.email}</p>
                                    <p className="text-center text-xs font-semibold"><span className="text-neutral-500">phone : </span> {patient.phone}</p>
                                    <div className="w-full card card-bordered bg-base-200 p-3 mt-6">
                                        <div className="flex flex-col justify-center items-start gap-3">
                                            <div className="w-full font-bold text-center text-neutral-500">
                                                Appointments booking :
                                            </div>
                                            <div className="w-full text-sm flex justify-between items-center">
                                                <p>has futter appointements </p>
                                                {patient.hasFutureAppointment ? (
                                                    <Check className="text-success-content bg-success rounded-full p-1" />
                                                ) : (
                                                    <X className="text-error-content bg-error rounded-full p-1" />
                                                )}
                                            </div>
                                            {patient.hasFutureAppointment ? (
                                                <div className="w-full text-sm flex justify-between items-center">
                                                    <p>date</p>
                                                    <p>{new Date(patient.futureAppointmentDate).toLocaleString()}</p>
                                                </div>
                                            ) : (
                                                <div />
                                            )}
                                        </div>

                                    </div>
                                </div>
                                <PatientModal patient={patient} />
                            </div>
                        ))}
                    </div>
                    {patients.length < 1 && <div className="w-full h-16 flex justify-center items-center text-center font-semibold text-2xl">empty</div>}
                </>
            )}
        </>
    );
}