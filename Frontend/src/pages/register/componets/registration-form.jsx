import { ChevronLeft } from "lucide-react";
import Input from "../../../components/shared/input";
import { Link } from "react-router-dom"
import useRegisterForm from "./use-register-form";

export default function RegistrationForm() {
    const { form, register, isLoading } = useRegisterForm()
    return (
        <form
            onSubmit={form.onSubmit((values) => register())}
            className="w-full px-4 md:px-24"
        >
            <div className="absolute lg:hidden top-0 left-0 m-4">
                <Link to="/" className="btn btn-square">
                    <ChevronLeft />
                </Link>
            </div>
            <p className="mt-16 md:mt-0 text-center font-bold text-2xl lg:text-4xl">REGISTRATION</p>
            <p className="mt-2 text-center font-semibold text-md lg:text-xl">Sign up into your account</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 w-full ">
                <Input {...form.getInputProps('firstname')} topleft="First Name :" placeholder="enter your first name" type="text" />
                <Input  {...form.getInputProps('lastname')} topleft="Last Name :" placeholder="enter your last name" type="text    " />
                <Input  {...form.getInputProps('email')} topleft="Email id :" placeholder="info@xyz.com" type="email" />
                <Input  {...form.getInputProps('mobile')} topleft="Mobile NO :" placeholder="+2135 55 55 55 55" type="phone" />
                <Input  {...form.getInputProps('password')} topleft="Password : " placeholder="*********" type="password" />
                <Input  {...form.getInputProps('confirm_password')} topleft="Confirm Password : " placeholder="*********" type="password" />
                <Input  {...form.getInputProps('birthday')} topleft="Birthday : " placeholder="xx/xx/xxxx" type="date" />
                <Input  {...form.getInputProps('address')} topleft="Address : " placeholder="enter your addresse" type="text" />
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
                <div className="mt-4">
                    <p>Account type :</p>
                    <div className="mt-3 flex justify-start items-center gap-6">
                        <div className="flex justify-start items-center gap-2">
                            <input type="checkbox" onChange={(e) => {
                                if (e.target.checked) {
                                    form.setFieldValue("role", "patient")
                                } else {
                                    form.setFieldValue("role", "doctor")
                                }
                            }} checked={form.values.role === "patient"} className="checkbox" />
                            <p>Patient</p>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                            <input type="checkbox" onChange={(e) => {
                                if (e.target.checked) {
                                    form.setFieldValue("role", "doctor")
                                } else {
                                    form.setFieldValue("role", "patient")
                                }
                            }} checked={form.values.role === "doctor"} className="checkbox" />
                            <p>Doctor</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3 w-full flex flex-col gap-3 justify-center items-center">
                <button disabled={isLoading} type="submit" className="btn btn-primary  text-lg px-12 gap-3 mt-12">
                    {isLoading && <span className="loading" />}
                    Sign up
                </button>
                <p className="text-center text-lg font-semibold">
                    Already have an account ? <Link to="/login" className="link link-primary"> Log in</Link>
                </p>
            </div>
        </form>
    );
}