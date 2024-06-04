import logo from "../../../assets/logo.svg"
import links from "./links";
import { Menu } from "lucide-react"
import { Link } from "react-router-dom"
import useNavbar from "./use-navbar";

export default function Navbar() {
    const { loading, role, user, signOut } = useNavbar()
    return (
        <nav className="bg-base-300">
            <div className="container mx-auto">
                <div className="navbar justify-between">
                    <Link to="/" className="text-lg gap-3">
                        <img alt="Logo" src={logo} className="w-16" />
                        <div className="flex flex-col justify-center items-start">
                            <div className="text-primary font-bold uppercase">Dentalcare</div>
                            <div className="font-semibold">CLINIC</div>
                        </div>
                    </Link>

                    <div className="dropdown dropdown-end lg:hidden">
                        <button className="btn btn-ghost">
                            <Menu />
                        </button>

                        <ul tabIndex="0" className="dropdown-content menu z-[1] bg-base-200 p-6 rounded-box shadow w-56 gap-2">
                            {loading ? <div className="loading" /> : <>
                                {role === "patient" && <Link to="/profile" className="btn btn-sm btn-primary">patient.{user.firstname}</Link>}
                                {role === "doctor" && <Link to="/doctor" className="btn btn-sm btn-primary">doctor.{user.firstname}</Link>}
                                {role === "admin" && <Link to="/admin" className="btn btn-sm btn-primary">admin.{user.firstname}</Link>}
                                {role === null ? <>
                                    <Link to="/register" className="btn btn-sm">Sign up</Link>
                                    <Link to="/login" className="btn btn-sm btn-primary">Log in</Link>
                                </> : <button className="btn btn-sm btn-primary btn-outline" onClick={() => signOut()}>sign out</button>}
                            </>}
                            {links.map((link, index) => (
                                <li key={index}><a href={link.href}>{link.label}</a></li>
                            ))}
                        </ul>
                    </div>

                    <ul className="hidden menu lg:menu-horizontal gap-2">
                        {links.map((link, index) => (
                            <li key={index}><a href={link.href}>{link.label}</a></li>
                        ))}
                        {loading ? <div className="loading" /> : <>
                            {role === "patient" && <Link to="/profile" className="btn btn-sm btn-primary">patient.{user.firstname}</Link>}
                            {role === "doctor" && <Link to="/doctor" className="btn btn-sm btn-primary">Dr.{user.firstname}</Link>}
                            {role === "admin" && <Link to="/admin" className="btn btn-sm btn-primary">admin.{user.firstname}</Link>}
                            {role === null ? <>
                                <Link to="/register" className="btn btn-sm">Sign up</Link>
                                <Link to="/login" className="btn btn-sm btn-primary">Log in</Link>
                            </> : <button className="btn btn-sm" onClick={() => signOut()}>sign out</button>}
                        </>}

                    </ul>
                </div>
            </div>
        </nav>
    );
}