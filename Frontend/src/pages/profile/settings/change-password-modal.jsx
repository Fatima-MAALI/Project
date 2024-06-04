import { useState } from "react";
import { useForm } from "@mantine/form";
import api from "../../../lib/axios";
import { toast } from "react-hot-toast";
import { useUser } from "../../../hooks/useUser";
import Input from "../../../components/shared/input";


export default function ChangePasswordModal() {
    const [isLoading, setIsLoading] = useState(false);
    const { getBearer } = useUser()
    const form = useForm({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validate: {
            oldPassword: (value) => (value.length > 5 ? null : 'Old password is too short'),
            newPassword: (value) => (value.length > 5 ? null : 'New password is too short'),
            confirmNewPassword: (value, { newPassword }) => (value === newPassword ? null : 'doesnt match'),
        },
    });

    const changePasswordHandler = async () => {
        try {
            setIsLoading(true);
            const response = await api.put('/patients/change-password', form.values, {
                headers: { Authorization: getBearer() }, // Store your token here
            });
            setIsLoading(false);
            toast.success("Password changed successfully");
            form.reset()
            document.getElementById('change-password-modal').close();
        } catch (error) {
            setIsLoading(false);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <>
            <div className="w-full flex justify-end items-center">
                <button className="btn btn-primary" onClick={() => document.getElementById('change-password-modal').showModal()}>Change Password</button>
            </div>
            <dialog id="change-password-modal" className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <form onSubmit={form.onSubmit((values) => changePasswordHandler())}>
                        <h3 className="font-bold text-lg">Change Password</h3>
                        <div className="py-4">
                            <Input {...form.getInputProps('oldPassword')} topleft="Old Password" placeholder="Enter your old password" type="password" />
                            <div className="h-3" />
                            <Input {...form.getInputProps('newPassword')} topleft="New Password" placeholder="Enter your new password" type="password" />
                            <div className="h-3" />
                            <Input {...form.getInputProps('confirmNewPassword')} topleft="Confirm New Password" placeholder="Enter your new password" type="password" />

                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? <div className="loading loading-lg" /> : "Change Password"}
                            </button>
                            <button type="button" className="btn" onClick={() => document.getElementById('change-password-modal').close()}>Close</button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </dialog>
        </>
    );
}