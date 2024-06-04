import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import api from "../../../lib/axios";
import { toast } from "react-hot-toast"
import AppointmentBadge from "../../../components/shared/appointment-badge";

export default function AppointementHistoryPage() {
    const [loading, setLoading] = useState(true);
    const { user, getBearer } = useUser()
    const [appointments, setAppointments] = useState([])
    useEffect(() => {
        const f = async () => {
            try {
                const response = await api.get(`/appointments/patient/${user._id}`, { headers: { Authorization: getBearer() } })
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
            <p className="font-bold text-3xl">
                Appointements history :
            </p>
            <div className="h-12" />
            {loading ? (
                <div className="h-16 w-full flex justify-center items-center">
                    <div className="loading loading-lg" />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table text-center">
                        <thead>
                            <tr className="text-xl bg-primary text-primary-content">
                                <th>Appointement Doctor</th>
                                <th>Appointement Date</th>
                                <th>status</th>
                                <th>Actions</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody className="text-xl text-center">
                            {appointments.map((appointement, index) => (
                                <tr key={index}>
                                    <td className="flex justify-start items-center gap-3">
                                        {/*
                                        <div className="avatar">
                                            <div className="w-16 rounded-full border-2 border-primary">
                                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                            </div>
                                        </div>
                                        */}
                                        <p className="w-full">DR.{appointement.doctor.firstname} {appointement.doctor.lastname}</p>
                                    </td>
                                    <td>{new Date(appointement.date).toLocaleString()}</td>
                                    <td><AppointmentBadge status={appointement.status} /></td>

                                    <td>
                                        {(appointement.status !== "canceled" && appointement.stats !== "completed") ? (
                                            <CancelButton id={appointement._id} />
                                        ) : (
                                            <div className="text-center">none</div>
                                        )}
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



function CancelButton(props) {
    const [loading, setLoading] = useState(false)
    const { getBearer } = useUser()
    const cancel_handeler = async () => {
        try {
            setLoading(true);
            await api.put(`/appointments/${props.id}`, { status: "canceled" }, { headers: { Authorization: getBearer() } })
            toast.success("appointment confirmed successfully")
            location.reload()
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("error while deleting shit")
        }
    }
    return (
        <buton disabled={loading} onClick={cancel_handeler} className="btn btn-sm btn-error gap-2">
            {loading ? (<span className="loading" />) : ("cancel")}
        </buton>
    );
}