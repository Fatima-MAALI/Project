import { MapPin } from "lucide-react";
import Input from "../../../components/shared/input"
import { useForm } from "@mantine/form"
import { useState } from "react";
import api from "../../../lib/axios"
import { toast } from "react-hot-toast"
import { useUser } from "../../../hooks/useUser"

export default function ContactUs() {
    const form = useForm({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            message: "",
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            firstname: (value) => (value.length > 3 ? null : 'firstname is too short'),
            lastname: (value) => (value.length > 3 ? null : 'lastname is too short'),
            message: (value) => (value.length > 10 ? null : 'message is too short')
        }
    })
    const { getBearer } = useUser()
    const [loading, setLoading] = useState(false);
    const submit_handeler = async () => {
        try {
            setLoading(true)
            const response = await api.post("/patients/contact", form.values, { headers: { Authorization: getBearer() } })
            toast.success("contact sent succesfully, we will reply to you soon")
            form.reset()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message || error.response.data.error || error.response.error || "something went wrong")
        }
    }
    return (
        <>
            <div id="contact-us" className="w-full bg-base-300 rounded-box py-16">
                <div className="w-full max-w-7xl mx-auto  p-6 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <p className="font-bold text-5xl">Welcome to our<br />community!</p>
                        <div className="h-8" />
                        <p className="text-blue-400">Start your new journey with us and join our community</p>
                        <div className="h-16" />
                        <p className="font-bold text-3xl">
                            Get in touch<br />
                            We want to share our location<br />
                            to find us easily.
                        </p>
                        <div className="h-12" />
                        <div className="card bg-base-100 card-bordered p-6 grid grid-cols-12">
                            <div className="col-span-2">
                                <MapPin className="w-full h-full aspect-square" />
                            </div>
                            <div className="col-span-9 h-full w-full flex flex-col justify-center items-start">
                                <p className="text-xl font-bold">Office Address</p>
                                <p className="text-sm text-neutral-500">74A High Road, Wanstead, London, E11 7RJ</p>
                            </div>
                        </div>
                    </div>

                    <div className="py-8">
                        <form
                            onSubmit={form.onSubmit((values) => submit_handeler())}
                            className="card card-bordered bg-base-100 px-6 py-16"
                        >
                            <div className="font-bold text-center text-3xl">Contact Us</div>
                            <div className="h-6" />
                            <div className="grid grid-cols-2 gap-4">
                                <Input {...form.getInputProps("firstname")} type="text" topleft="first name" placeholder="enter your first name" />
                                <Input {...form.getInputProps("lastname")} type="text" topleft="last name" placeholder="enter your last name" />
                            </div>
                            <div className="h-8" />
                            <Input {...form.getInputProps("email")} type="email" topleft="email" placeholder="abc@xyz.com" />
                            <div className="h-6" />
                            <textarea {...form.getInputProps("message")} placeholder="enter your message" type="text" className="bg-base-200  textarea textarea-lg textarea-bordered w-full" />
                            <div className="mt-1 text-error text-xs">{form.errors.message}</div>
                            <div className="h-8" />
                            <div className="flex justify-center items-center">
                                <button disabled={loading} type="submit" className="btn btn-primary text-lg">
                                    {loading ? <div className="loading" /> : "Contact Us"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}