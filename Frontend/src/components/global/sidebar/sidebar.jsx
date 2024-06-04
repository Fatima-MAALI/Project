import { Link, useResolvedPath } from "react-router-dom";
import logo from "../../../assets/logo-white.svg"
import { Settings } from "lucide-react";

export default function Sidebar(props) {
    const { pathname } = useResolvedPath()

    return (
        <aside className="hidden lg:block col-span-2 bg-[#38A0C1] h-full py-4">
            <div className="w-full flex justify-start items-start px-16">
                <Link to="/" className="text-lg gap-3 flex">
                    <img alt="Logo" src={logo} className="w-16" />
                    <div className="flex flex-col justify-center items-start text-primary-content">
                        <div className="font-bold text-2xl uppercase text-primary-content">Dentalcare</div>
                        <div>CLINIC</div>
                    </div>
                </Link>
            </div>
            <div className="mt-32 text-primary-content">
                {props.links.map((link, index) => {
                    if (link.href === pathname) {
                        return <div className="font-semibold text-xl py-4 pl-12 bg-[#034F66]" key={index}>
                            <Link className="flex justify-start items-center gap-3" to={link.href}>
                                {link.icon}
                                <p>{link.label}</p>
                            </Link>
                        </div>
                    } else {
                        return <div className="font-semibold text-xl py-4 pl-12 hover:bg-neutral-600" key={index}>
                            <Link className="flex justify-start items-center gap-3" to={link.href}>
                                {link.icon}
                                <p>{link.label}</p>
                            </Link>
                        </div>
                    }
                }
                )}
                {props.settings && <> {pathname === props.settings ? (
                    <div className="font-semibold text-xl py-4 pl-4 bg-[#034F66]">
                        <Link className="flex justify-start items-center gap-2" to={props.settings}>
                            <Settings />
                            <div>Settings</div>
                        </Link>
                    </div>
                ) : (
                    <div className="font-semibold text-xl py-4 pl-4 hover:bg-neutral-600">
                        <Link className="flex justify-start items-center gap-2" to={props.settings}>
                            <Settings />
                            <div>Settings</div>
                        </Link>
                    </div>
                )}</>}


            </div>
        </aside>
    );
}