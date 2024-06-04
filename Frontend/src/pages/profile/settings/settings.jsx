import { useUser } from "../../../hooks/useUser"
import api from "../../../lib/axios"
import { toast } from "react-hot-toast"
import Input from "../../../components/shared/input"
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import ChangePasswordModal from "./change-password-modal"

export default function ProfileSettingsPage() {
    const { user } = useUser()
    const form = useForm({
        initialValues: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            birthday: user.birthday,
            gender: user.gender,
            address: user.address
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            firstname: (value) => (value.length > 3 ? null : 'first name is too short'),
            lastname: (value) => (value.length > 3 ? null : 'first name is too short'),
            address: (value) => (value.length > 5 ? null : 'address is too short'),
            phone: (value) => (value.length > 8 ? null : 'phone phone is too short'),
            birthday: (value) => null,
            gender: (value) => null,
        },
    });
    const { getBearer, setUser } = useUser()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const update_handeler = async () => {
        try {
            setIsLoading(true)
            const response = await api.put('/patients', form.values, { headers: { Authorization: getBearer() } });
            setIsLoading(false)
            setUser(response.data.patient)
            toast.success("profile updated successfully")
            navigate("/profile")
        } catch (error) {
            setIsLoading(false)
            toast.error(error.response.data.message || error.response.data.error || error.response.error || "something went wrong")
        }
    }
    return (
        <>
            <p className="font-bold text-3xl">Profile Settings</p>
            <div className="h-6" />
            <ChangePasswordModal />
            <form
                onSubmit={form.onSubmit((values) => update_handeler())}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <div className="tooltip tooltip-bottom " data-tip="you cannot update your email">
                    <Input disabled {...form.getInputProps("email")} topleft="email" placeholder="enter your email" type="email" />
                </div>
                <Input {...form.getInputProps("phone")} topleft="phone" placeholder="enter your phone" type="text" />
                <Input {...form.getInputProps("firstname")} topleft="firstname" placeholder="enter your firstname" type="text" />
                <Input {...form.getInputProps("lastname")} topleft="lastname" placeholder="enter your lastname" type="text" />
                <Input {...form.getInputProps("birthday")} topleft="birthday" placeholder="enter your birthday" type="date" />
                <Input {...form.getInputProps("address")} topleft="address" placeholder="enter your address" type="text" />
                <div className="mt-4">
                    <p>Gender :</p>
                    <div className="mt-3 flex justify-start items-center gap-6">
                        <div className="flex justify-start items-center gap-2">
                            <input type="checkbox" onChange={(e) => {
                                if (e.target.checked) {
                                    form.setFieldValue("gender", "man")
                                } else {
                                    form.setFieldValue("gender", "woman")
                                }
                            }} checked={form.values.gender === "man"} className="checkbox" />
                            <p>Man</p>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                            <input type="checkbox" onChange={(e) => {
                                if (e.target.checked) {
                                    form.setFieldValue("gender", "woman")
                                } else {
                                    form.setFieldValue("gender", "man")
                                }
                            }} checked={form.values.gender === "woman"} className="checkbox" />
                            <p>Woman</p>
                        </div>
                    </div>
                </div>
                <div className="h-24" />
                <div className="w-full flex justify-end items-center">
                    <button disabled={isLoading} type="submit" className="btn btn-primary  text-lg">
                        {isLoading ? <div className="loading loading-lg" /> : "update profile"}
                    </button>
                </div>
            </form>
        </>
    );
}






