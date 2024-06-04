import { Check } from "lucide-react";

export default function AppointmentBadge(props) {
    if (props.status === "confirmed") {
        return (
            <div className="badge badge-lg p-3 badge-success gap-2">
                <p className="text-neutral">confirmed</p>
            </div>
        )
    }
    if (props.status === "completed") {
        return (
            <div className="badge badge-lg p-3 badge-success badge-outline gap-2">
                <p className="text-neutral">completed</p>
                <Check className="w-5 h-5 p-1 bg-success text-success-content rounded-full" />
            </div>
        )
    }
    if (props.status === "booked") {
        return (
            <div className="badge badge-lg p-3 badge-warning gap-2">
                <p className="text-neutral">booked</p>
            </div>
        )
    }
    if (props.status === "canceled") {
        return (
            <div className="badge badge-lg p-3 badge-error gap-2">
                <p className="text-neutral">canceled</p>
            </div>
        )
    }
}

<div className="badge badge-lg p-3 badge-success badge-outline gap-2">
    <p className="text-neutral">booked</p>
    <Check className="w-5 h-5 p-1 bg-success text-success-content rounded-full" />
</div>