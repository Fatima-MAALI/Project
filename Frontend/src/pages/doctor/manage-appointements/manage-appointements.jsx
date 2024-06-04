import { Check, Eye, Search, Trash, X } from "lucide-react";
import AppointementModal from "./appointement-modal";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import api from "../../../lib/axios";
import toast from "react-hot-toast";
import AppointmentBadge from "../../../components/shared/appointment-badge";

export default function ManageAppontementsPage() {
    const [loading, setLoading] = useState(true);
    const { user, getBearer } = useUser()
    const [appointments, setAppointments] = useState([])
    useEffect(() => {
        const f = async () => {
            try {
                const response = await api.get(`/appointments/doctor/${user._id}`, { headers: { Authorization: getBearer() } })
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
            <p className="font-bold text-start text-3xl">Manage Appointments</p>
            <div className="h-8" />
            <div className="flex justify-between items-center gap-6">
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <Search />
                    <input type="text" className="grow" placeholder="Search by name" />
                </label>
            </div>
            <div className="h-8" />
            {loading ? <div className="h-16 flex justify-center items-center"><div className="loading loading-lg" /></div> : (
                <div className="overflow-x-auto">
                    <table className="table text-center">
                        <thead>
                            <tr className="text-md text-neutral">
                                <th>name</th>
                                <th>phone number</th>
                                <th>date</th>
                                <th>status</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-md text-nowrap">
                            {appointments.map((appointement, index) => (
                                <tr key={index}>
                                    <td>{appointement.patient.firstname} {appointement.patient.lastname}</td>
                                    <td>{appointement.patient.phone}</td>
                                    <td>{new Date(appointement.date).toLocaleString()}</td>
                                    <td>
                                        <AppointmentBadge status={appointement.status} />
                                    </td>
                                    <td>
                                        <div className="w-full h-full flex justify-between items-center gap-6">
                                            <div className="h-full flex justify-start items-center gap-3">
                                                {appointement.status === "booked" && (
                                                    <>
                                                        <CancelButton id={appointement._id} />
                                                        <ConfirmButton id={appointement._id} />
                                                    </>
                                                )}
                                            </div>
                                            <div className="h-full flex justify-end items-center gap-1">
                                                <DeleteButton id={appointement._id} />
                                                <AppointementModal appointement={appointement} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {appointments.length < 1 && <div className="w-full h-16 flex justify-center items-center text-center font-semibold text-2xl">empty</div>}
                </div >
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
        <button onClick={cancel_handeler} disabled={loading} className="btn btn-sm btn-error gap-2">
            {loading ? <div className="loading" /> : <X />}
            cancel
        </button>
    );
}

function ConfirmButton(props) {
    const [loading, setLoading] = useState(false)
    const { getBearer } = useUser()
    const confirm_handeler = async () => {
        try {
            setLoading(true);
            await api.put(`/appointments/${props.id}`, { status: "confirmed" }, { headers: { Authorization: getBearer() } })
            toast.success("appointment confirmed successfully")
            location.reload()
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("error while deleting shit")
        }
    }

    return (
        <button onClick={confirm_handeler} disabled={loading} className="btn btn-sm btn-success gap-2">
            {loading ? <div className="loading" /> : <Check />}
            confirm
        </button>
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