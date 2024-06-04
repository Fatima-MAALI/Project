import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser"
import api from "../../../lib/axios"
import { toast } from "react-hot-toast"

export default function UpcomingAppointementsPage() {
    const [loading, setLoading] = useState(true);
    const { user, getBearer } = useUser()
    const [appointments, setAppointments] = useState([])
    useEffect(() => {
        const f = async () => {
            try {
                const response = await api.get(`/appointments/upcoming`, { headers: { Authorization: getBearer() } })
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
            <p className="font-bold text-start text-3xl">Upcoming appointements</p>
            <div className="h-8" />
            {loading ? (
                <div className="w-full h-16 flex justify-center items-center">
                    <div className="loading loading-lg" />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table text-center">
                        <thead>
                            <tr className="font-bold text-center text-neutral">
                                <th>Patient</th>
                                <th>Phone Number</th>
                                <th>Appointment Date & Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className=" text-center text-nowrap">
                            {appointments.map((appointment, index) => (
                                <tr key={index}>
                                    <td>Patient : {appointment.patient.firstname} {appointment.patient.lastname}</td>
                                    <td>{appointment.patient.phone}</td>
                                    <td>{new Date(appointment.date).toDateString()}</td>
                                    <td>
                                        <div className="h-full flex justify-center items-center gap-3">
                                            <CancelButton id={appointment._id} />
                                            <CompleteButton id={appointment._id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {appointments.length < 1 && <div className="w-full h-16 flex justify-center items-center text-center font-semibold text-2xl">empty</div>}
                </div>
            )}
        </>
    );
}


function CancelButton(props) {
    const [loading, setLoading] = useState(false)
    const { getBearer } = useUser()
    const cancel_handeler = async () => {
        try {
            setLoading(true);
            await api.put(`/appointments/${props.id}`, { status: "canceled" }, { headers: { Authorization: getBearer() } })
            toast.success("appointment canceled successfully")
            location.reload()
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("something went wrong")
        }
    }
    return (
        <button onClick={cancel_handeler} disabled={loading} className="btn btn-sm btn-error">
            {loading ? <div className="loading" /> : "cancel"}
        </button>
    );
}

function CompleteButton(props) {
    const [loading, setLoading] = useState(false)
    const { getBearer } = useUser()
    const confirm_handeler = async () => {
        try {
            setLoading(true);
            await api.put(`/appointments/${props.id}`, { status: "completed" }, { headers: { Authorization: getBearer() } })
            toast.success("appointment confirmed successfully")
            location.reload()
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("error while deleting shit")
        }
    }

    return (
        <button onClick={confirm_handeler} disabled={loading} className="btn btn-sm btn-success">
            {loading ? <div className="loading" /> : "complete"}
        </button>
    );
}

