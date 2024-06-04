import { ChevronLeft } from "lucide-react";

export default function PatientModal(props) {
    return (
        <>
            <button className="btn btn-sm rounded-badge" onClick={() => document.getElementById(props.patient._id).showModal()}>see while profile</button>
            <dialog id={props.patient._id} className="modal">
                <div className="modal-box w-11/12 max-w-7xl">
                    <form method="dialog">
                        <button className="badge badge-outline badge-lg">
                            <ChevronLeft className="w-4 h-4" />
                            <p>Return</p>
                        </button>
                    </form>
                    <div className="h-4" />
                    <PatientDetails patient={props.patient} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}



function PatientDetails(props) {
    return (
        <>
            <p className="text-center font-bold text-2xl">
                <span className="text-neutral-500">Patient : </span>{props.patient.firstname} {props.patient.lastname}
            </p>
            <div className="h-6" />
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 md:col-span-2 mx-8 xs:mx-16 md:mx-0">
                    <div className="avatar placeholder w-full">
                        <div className="bg-neutral text-neutral-content rounded-full w-full">
                            <span className="text-3xl capitalize">{props.patient.firstname.at(0)}</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-5 md:mt-16 flex flex-col gap-4 font-semibold text-lg">
                    <div><span className="text-neutral-500">First name : </span>{props.patient.firstname}</div>
                    <div><span className="text-neutral-500">Last name : </span>{props.patient.lastname}</div>
                    <div><span className="text-neutral-500">Mobile : </span>{props.patient.phone}</div>
                    <div><span className="text-neutral-500">Email : </span>{props.patient.email}</div>
                    <div><span className="text-neutral-500">Adress : </span>{props.patient.address}</div>
                </div>
                <div className="col-span-12 md:col-span-5 md:mt-16 flex flex-col gap-4 font-semibold text-lg">
                    <div><span className="text-neutral-500">Gender : </span>{props.patient.gender}</div>
                    <div><span className="text-neutral-500">Birthday : </span>{new Date(props.patient.birthday).toLocaleString()}</div>
                </div>
            </div>
            <div className="h-16" />
            <div className="flex justify-center items-center">
                <form method="dialog">
                    <button className="badge badge-outline badge-lg">
                        <p>Close</p>
                    </button>
                </form>
            </div>
        </>
    );
}