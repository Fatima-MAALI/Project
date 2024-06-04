import { Eye, Trash } from "lucide-react";
import DoctorModal from "./doctor-modal";
import { useState } from "react";
import { useUser } from "../../../hooks/useUser";
import api from "../../../lib/axios";
import toast from "react-hot-toast";

export default function DoctorCard(props) {
    const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl8UcJiZxXc_q-Zr-1dohkW5sd8lTxvpPj-g&s"
    return (
        <div className="card card-bordered bg-neutral-200 p-4 grid grid-cols-12 gap-4">
            <div className="hidden sm:block col-span-3">
                <div className="aspect-square">
                    <img alt="something" className="aspect-square object-cover rounded-box" src={url} />
                </div>
            </div>
            <div className="col-span-12 sm:col-span-9">
                <p className="text-lg font-bold">
                    Dr.{props.doctor.firstname} {props.doctor.lastname}
                </p>
                <div className="h-3" />
                <p className="text-neutral-500">Join in date : {new Date(props.doctor.createdAt).toLocaleString()}</p>
                <p><span className="text-neutral-500">Phone number </span> {props.doctor.phone}</p>
                <p><span className="text-neutral-500">Email ID </span> {props.doctor.email}</p>
                <div className="mt-2 w-full flex justify-between items-center gap-4">
                    <div className="link link-primary">
                        see doctors' appointements
                    </div>
                    <div className="flex justify-end items-center gap-4">
                        <DoctorModal doctor={props.doctor} />
                        <DeleteButton id={props.doctor._id} />
                    </div>
                </div>
            </div>
        </div>
    );
}




function DeleteButton(props) {
    const [loading, setLoading] = useState(false)
    const { getBearer } = useUser()
    const delete_handeler = async () => {
        try {
            setLoading(true);
            await api.delete(`/admins/doctor/${props.id}`, { headers: { Authorization: getBearer() } })
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
        <button disabled={loading} onClick={delete_handeler} className="btn btn-sm btn-ghost btn-square">
            {loading ? (<span className="loading" />) : (<Trash className="text-error" />)}
        </button>
    );
}