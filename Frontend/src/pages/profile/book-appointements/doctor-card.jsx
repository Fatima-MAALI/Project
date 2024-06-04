import BookingModal from "./booking-modal";
import DoctorModal from "./doctor-modal";

export default function DoctorCard(props) {
    return (
        <div className="card card-bordered bg-base-300 p-6 grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div>
                <DoctorModal doctor={props.doctor} />
                <div className="h-8" />
                <div className="font-bold text-lg">
                    <div>profession</div>
                    <div>Phone no : <span className="font-light text-neutral-500">{props.doctor.phone}</span></div>
                    <div>{props.doctor.email}</div>
                </div>
            </div>
            <div className="h-full flex flex-col justify-between items-start">
                <div className="w-full h-full flex justify-end items-end">
                    <BookingModal doctor={props.doctor} />
                </div>
            </div>
        </div>
    );
}