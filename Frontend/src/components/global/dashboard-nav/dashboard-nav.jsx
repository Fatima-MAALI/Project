import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg"
import UserMenu from "./user-menu";

export default function DashboardNav() {
    return (
        <nav className="w-full py-2 px-12 bg-base-100 mb-12 flex justify-between items-center">
            <Link to="/" className="flex lg:invisible text-lg  gap-3">
                <img alt="Logo" src={logo} className="w-16" />
                <div className="flex flex-col justify-center items-start">
                    <div className="text-primary font-bold uppercase">Dentalcare</div>
                    <div className="font-semibold">CLINIC</div>
                </div>
            </Link>
            <UserMenu />
        </nav>
    );
}