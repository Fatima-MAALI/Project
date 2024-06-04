import { Check, ChevronLeft, Eye } from "lucide-react";

export default function AppointementModal(props) {
    return (
        <>
            <button onClick={() => document.getElementById(props.appointement.id).showModal()} className="btn btn-sm btn-square btn-ghost">
                <Eye />
            </button>
            <dialog id={props.appointement.id} className="modal text-start">
                <div className="modal-box w-11/12 max-w-xl">
                    <form method="dialog">
                        <button className="badge badge-outline badge-lg">
                            <ChevronLeft className="w-4 h-4" />
                            <p>Return</p>
                        </button>
                    </form>
                    <div className="h-12" />
                    <h1 className="font-bold text-2xl text-neutral">
                        Appointement Details : ({props.appointement.id})
                    </h1>
                    <div className="h-6" />
                    <div className="flex flex-col justify-start items-start gap-3">
                        <div><span className="text-neutral-500">Patient full name : </span>yara malik</div>
                        <div><span className="text-neutral-500">Phone Number : </span>+2135 55 55 55 55</div>
                        <div><span className="text-neutral-500">Date check-in : </span>08-April 2023 at 9:00 AM	</div>
                        <div><span className="text-neutral-500">Doctor assigned : </span>roberto cavalli</div>
                        <div><span className="text-neutral-500">Status : </span>
                            <div className="badge badge-lg p-3 badge-success badge-outline gap-2">
                                <p className="text-neutral">booked</p>
                                <Check className="w-5 h-5 p-1 bg-success text-success-content rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}