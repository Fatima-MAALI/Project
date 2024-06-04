import { Link } from "react-router-dom";
import Input from "../../../components/shared/input"
import { ChevronLeft } from "lucide-react"
import { useForm } from '@mantine/form';
import useLoginForm from "./use-login-form";

export default function LoginForm() {
    const { form, isLoading, login } = useLoginForm()

    return (
        <form
            onSubmit={form.onSubmit((values) => login())}
            className="lg:w-full lg:max-w-xl mx-auto bg-white px-24 pt-24 py-32 rounded-box"
        >
            <div className="absolute lg:hidden top-0 left-0 m-4">
                <Link to="/" className="btn btn-square">
                    <ChevronLeft />
                </Link>
            </div>
            <p className="font-bold text-4xl text-center">
                Login
            </p>
            <p className="mt-3 text-center font-semibold">
                login into your account
            </p>
            <div className="h-8" />
            <Input {...form.getInputProps('email')} topleft="Email id :" placeholder="info@xyz.com" type="email" />
            <Input {...form.getInputProps('password')} topleft="Password : " placeholder="*********" type="password" />
            <div className="w-full flex justify-end items-center">
                <Link to="/" className="link link-primary">forgot password?</Link>
            </div>
            <button disabled={isLoading} type="submit" className="mt-6 btn btn-primary w-full text-xl gap-2">
                {isLoading && <span className="loading loading-sm" />}
                Login
            </button>
            <p className="mt-5 text-xl font-semibold text-center text-neutral-content">
                Don't have an account ? <span className="link link-primary"><Link to="/register">Sign up</Link></span>
            </p>
        </form>
    );
}