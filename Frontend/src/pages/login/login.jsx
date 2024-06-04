import { Link } from "react-router-dom"
import logo from "../../assets/logo-white.svg"
import LoginForm from "./components/login-form"
import bgLogin from "../../assets/bg-login.png"

export default function LoginPage() {
    return (
        <div className="w-full h-screen grid grid-cols-12 bg-primary">
            <aside style={{ backgroundImage: `url(${bgLogin})`, backgroundSize: "cover", filter: "grayscale(35%)" }} className="hidden lg:block col-span-5  h-full py-4 px-16">
                <div className="w-full flex justify-start items-start">
                    <Link to="/" className="text-lg gap-3 flex">
                        <img alt="Logo" src={logo} className="w-16" />
                        <div className="flex flex-col justify-center items-start text-neutral-content">
                            <div className="font-bold text-2xl uppercase text-neutral-content">Dentalcare</div>
                            <div>CLINIC</div>
                        </div>
                    </Link>
                </div>
                <div className="mt-44 text-center font-semibold text-4xl leading-relaxed text-neutral-content">
                    Thank you for choosing us to take care of your smile!
                </div>
            </aside>
            <div className="col-span-12 lg:col-span-7 h-full flex justify-center items-center">
                <LoginForm />
            </div>
        </div>
    );
}