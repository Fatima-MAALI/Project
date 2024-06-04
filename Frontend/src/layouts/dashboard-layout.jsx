import { Outlet } from "react-router-dom";
import { DashboardNav, Sidebar } from "../components/global";

export default function DashboardLayout(props) {
    return (
        <div className="w-full min-h-screen grid grid-cols-12 bg-base-300">
            <Sidebar links={props.links} settings={props.settings} />
            <div className="col-span-12 lg:col-span-10">
                <DashboardNav />
                <div className="w-full max-w-7xl mx-auto px-3 ">
                    <div className="w-full bg-base-100 p-6 rounded-box mb-12">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}