import { ChevronLeft } from "lucide-react";

const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl8UcJiZxXc_q-Zr-1dohkW5sd8lTxvpPj-g&s"
function DoctorModal2(props) {
    return (
        <>
            <div onClick={() => document.getElementById(props.doctor.id).showModal()} className="cursor-pointer flex justify-start items-center gap-4">
                <div className="avatar">
                    <div className="w-20 rounded-full border-4 border-primary">
                        <img src={url} alt={props.doctor.name} />
                    </div>
                </div>
                <p className="font-semibold text-2xl text-start">{props.doctor.name}</p>
            </div>
            <dialog id={props.doctor.id} className="modal">
                <div className="modal-box w-11/12 max-w-7xl">
                    <form method="dialog">
                        <button className="badge badge-outline badge-lg">
                            <ChevronLeft className="w-4 h-4" />
                            <p>Return</p>
                        </button>
                    </form>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button className="btn">Close</button>
                </form>
            </dialog>
        </>
    );
}





export default function DoctorModal(props) {
    return (
        <>
            <div onClick={() => document.getElementById(props.doctor._id).showModal()} className="cursor-pointer flex justify-start items-center gap-4">
                <div className="avatar">
                    <div className="w-20 rounded-full border-4 border-primary">
                        <img src={url} alt={props.doctor._id} />
                    </div>
                </div>
                <p className="font-semibold text-2xl text-start">{props.doctor.firstname} {props.doctor.lastname}</p>
            </div>
            <dialog id={props.doctor._id} className="modal">
                <div className="modal-box w-11/12 max-w-7xl">
                    <form method="dialog">
                        <button className="badge badge-outline badge-lg">
                            <ChevronLeft className="w-5 h-5" />
                            <p>Return</p>
                        </button>
                    </form>
                    <DoctorDetails doctor={props.doctor} />

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}



function DoctorDetails(props) {
    return (
        <div>
            <p className="font-bold text-3xl text-center">
                {props.doctor.firstname} {props.doctor.lastname}
            </p>
            <div className="h-12" />
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="font-bold text-xl text-primary">Personal information :</div>
                    <div className="h-6" />
                    <div><span className="text-neutral-500">First name : </span>{props.doctor.firstname}</div>
                    <div><span className="text-neutral-500">Last name : </span>{props.doctor.lastname}</div>
                    <div><span className="text-neutral-500">Phone number : </span>{props.doctor.phone}</div>
                    <div><span className="text-neutral-500">Email : </span>{props.doctor.email}</div>
                    <div><span className="text-neutral-500">Adress : </span>{props.doctor.address}</div>
                    <div className="h-12" />
                    <img className="w-full aspect-square max-w-72  rounded-box object-cover" src={url} alt={props.doctor.name} />
                </div>
                <div>
                    <div className="font-bold text-xl text-primary">Professional experience :</div>
                    <div className="prose">
                        <ul>
                            {props.doctor.professionalExperience.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                            {props.doctor.professionalExperience.length < 1 && <li>none</li>}
                        </ul>
                    </div>
                    <div className="h-6" />
                    <div className="font-bold text-xl text-primary"> specialization & Work experience :</div>
                    <div className="prose">
                        <ul>
                            {props.doctor.specialization.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                            {props.doctor.specialization.length < 1 && <li>none</li>}
                        </ul>
                    </div>
                    <div className="h-6" />
                    <div className="font-bold text-xl text-primary">Education :</div>
                    <div className="prose prose-sm">
                        <ul>
                            {props.doctor.education.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                            {props.doctor.education.length < 1 && <li>none</li>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}