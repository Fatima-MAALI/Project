import logo from "../../assets/logo-white.svg"
import { Link } from "react-router-dom"
import RegistrationForm from "./componets/registration-form";
import { ChevronLeft } from "lucide-react";

export default function RegisterPage() {
    return (
        <div className="w-full h-screen grid grid-cols-12">
            <aside className="hidden lg:block col-span-4 bg-primary h-full py-4 px-16">
                <div className="w-full flex justify-start items-start">
                    <Link to="/" className="text-lg gap-3 flex">
                        <img alt="Logo" src={logo} className="w-16" />
                        <div className="flex flex-col justify-center items-start text-primary-content">
                            <div className="font-bold text-2xl uppercase text-primary-content">Dentalcare</div>
                            <div>CLINIC</div>
                        </div>
                    </Link>
                </div>
                <div className="mt-44 text-center font-semibold text-4xl leading-relaxed text-primary-content">
                    Join us for a smile- worthy journey towards optimal dental health! Sign up now to become a valued member of our dental family
                </div>
            </aside>
            <div className="col-span-12 lg:col-span-8 h-full flex justify-center items-center ">
                <RegistrationForm />
            </div>
        </div>
    );
}