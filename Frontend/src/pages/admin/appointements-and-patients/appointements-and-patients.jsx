import { Check, Eye, Search, Trash } from "lucide-react";
import AppointementModal from "./appointement-modal";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser"
import api from "../../../lib/axios"
import { toast } from "react-hot-toast"
import AppointmentBadge from "../../../components/shared/appointment-badge"

export default function AdminAppointementAndPatientsPage() {
    const [loading, setLoading] = useState(true);
    const { user, getBearer } = useUser()
    const [appointments, setAppointments] = useState([])
    useEffect(() => {
        const f = async () => {
            try {
                const response = await api.get(`/admins/appointments`, { headers: { Authorization: getBearer() } })
                setLoading(false)
                setAppointments(response.data.appointments)
            } catch (error) {
                toast.error(error.response.data.message || error.response.data.error || error.response.error || "something went wrong")
            }
        }
        f()
    }, [])
    return (
        <>
            <p className="font-bold text-start text-3xl">Appointments</p>
            <div className="h-4" />
            <p className="text-primary cursor-default">all patient appointements :</p>
            <div className="h-4" />
            <div className="flex justify-between items-center gap-6">
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <Search />
                    <input type="text" className="grow" placeholder="Search by name" />
                </label>
            </div>
            <div className="h-8" />
            {loading ? (
                <div className="w-full h-16 flex justify-center items-center">
                    <div className="loading loading-lg" />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table text-nowrap">
                        <thead className="text-lg bg-primary text-primary-content text-center">
                            <tr>
                                <th>Patient full name</th>
                                <th>Phone Number</th>
                                <th>Date check-in</th>
                                <th>Doctor assigned</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-lg text-center">
                            {appointments.map((appointement, index) => (
                                <tr key={index}>
                                    <td><span className="text-neutral-500 font-semibold">Patient : </span>{appointement.patient.firstname} {appointement.patient.lastname}</td>
                                    <td className="text-neutral-500 font-semibold">{appointement.patient.phone}</td>
                                    <td>{new Date(appointement.date).toLocaleString()}</td>
                                    <td>{appointement.doctor.firstname} {appointement.doctor.lastname}</td>
                                    <td>
                                        <AppointmentBadge status={appointement.status} />
                                    </td>
                                    <td>
                                        <div className="flex justify-center items-center">
                                            <DeleteButton id={appointement._id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}


function DeleteButton(props) {
    const [loading, setLoading] = useState(false)
    const { getBearer } = useUser()
    const delete_handeler = async () => {
        try {
            setLoading(true);
            await api.delete(`/appointments/${props.id}`, { headers: { Authorization: getBearer() } })
            toast.success("appointment deleted successfully")
            location.reload()
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
            toast.error("something went wrong")
        }
    }
    return (
        <button disabled={loading} onClick={delete_handeler} className="btn btn-ghost btn-square">
            {loading ? (<span className="loading" />) : (<Trash className="text-error" />)}
        </button>
    );
}