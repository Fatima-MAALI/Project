import { ChevronLeft, Eye } from "lucide-react";
import AppointmentBadge from "../../../components/shared/appointment-badge";

export default function AppointementModal(props) {
    return (
        <>
            <button onClick={() => document.getElementById(props.appointement._id).showModal()} className="btn btn-ghost btn-square">
                <Eye />
            </button>
            <dialog id={props.appointement._id} className="modal text-start">
                <div className="modal-box w-11/12 max-w-xl">
                    <form method="dialog">
                        <button className="badge badge-outline badge-lg">
                            <ChevronLeft className="w-4 h-4" />
                            <p>Return</p>
                        </button>
                    </form>
                    <div className="h-12" />
                    <h1 className="font-bold text-2xl text-neutral">
                        Appointement Details :
                    </h1>
                    <div className="h-6" />
                    <div className="flex flex-col justify-start items-start gap-3">
                        <div><span className="text-neutral-500">Name : </span>{props.appointement.patient.firstname} {props.appointement.patient.lastname}</div>
                        <div><span className="text-neutral-500">Phone : </span>{props.appointement.patient.phone}</div>
                        <div><span className="text-neutral-500">date : </span>{new Date(props.appointement.date).toLocaleString()}</div>
                        <div className="flex justify-start items-center gap-3"><span className="text-neutral-500">status : </span><AppointmentBadge status={props.appointement.status} /></div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}