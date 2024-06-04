import { ChevronLeft } from "lucide-react";
import Input from "../../../components/shared/input"
import { useForm } from "@mantine/form"
import api from "../../../lib/axios";
import { useUser } from "../../../hooks/useUser";
import { useState } from "react";
import toast from "react-hot-toast";
export default function BookingModal(props) {
    const [loading, setLoading] = useState(false);
    const { getBearer } = useUser()
    const form = useForm({
        initialValues: {
            date: Date.now()
        },
        validate: {
            date: (value) => (new Date(value) > Date.now() ? null : "appointement should be in the future")
        }
    })

    const handle_submit = async () => {
        try {
            await api.post("/appointments", { doctorId: props.doctor._id, date: form.values.date }, { headers: { Authorization: getBearer() } })
            toast.success("success")
            location.reload()
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message || error.response.data.error || error.response.error || "something went wrong")
        }
    }

    return (
        <>
            <button onClick={() => document.getElementById(props.doctor._id + "booking").showModal()} className="btn btn-sm btn-primary">book now</button>
            <dialog id={props.doctor._id + "booking"} className="modal">
                <div className="modal-box w-11/12 max-w-4xl bg-primary text-primary-content">
                    <form method="dialog">
                        <button className="badge badge-lg">
                            <ChevronLeft className="w-5 h-5" />
                            <p>Return</p>
                        </button>
                    </form>
                    <p className="text-center font-bold text-3xl">New Booking </p>
                    <div className="h-2" />
                    <p className="text-center text-xl">With <span className="font-bold">{props.doctor.firstname} {props.doctor.lastname}</span></p>
                    <div className="h-4" />
                    <form
                        onSubmit={form.onSubmit((values) => handle_submit())}
                        className="w-full max-w-lg mx-auto card card-bordered bg-base-100 p-6 text-neutral"
                    >
                        <p className="font-bold text-xl text-center">Book an appointement</p>
                        <div className="h-4" />
                        <p className="font-semibold text-center text-neutral-600 mx-8">
                            Simply fill out the form below, and we'll take care of the rest!
                        </p>
                        <div className="h-8" />
                        <Input {...form.getInputProps('date')} type="datetime-local" topleft="Select Date" />
                        <div className="h-12" />
                        <div className="w-full flex justify-center items-center">
                            <button disabled={loading} type="submit" className="btn btn-primary btn-sm px-6">
                                {loading ? <div className="loading" /> : "Approve"}
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}