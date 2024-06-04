import DoctorsRequests from "./doctors-s-requests";
import StatsCards from "./stat-cards";
import TodayAppointements from "./today-s-appointements";

export default function AdminPage() {
    return (
        <>
            <p className="font-bold text-3xl">Overview</p>
            <div className="h-6" />
            <StatsCards />
            <div className="h-6" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-7 card card-bordered bg-base-300 p-6">
                    <TodayAppointements />
                </div>
                <div className="col-span-12 md:col-span-5 card card-bordered bg-base-300 p-6">
                    <DoctorsRequests />
                </div>
            </div>
        </>
    );
}