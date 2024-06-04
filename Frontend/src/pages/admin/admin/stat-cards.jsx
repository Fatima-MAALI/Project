import { List, MoveDownRight, MoveUpRight, Users, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser"
import { toast } from "react-hot-toast"
import api from "../../../lib/axios"

export default function StatsCards() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const { getBearer } = useUser()

    useEffect(() => {
        const f = async () => {
            try {
                setLoading(true)
                const response = await api.get(`/admins/stats`, { headers: { Authorization: getBearer() } })
                setLoading(false)
                setStats(response.data)
            } catch (error) {
                toast.error(error.response.data.message || error.response.data.error || error.response.error || "something went wrong")
            }
        }
        f()
    }, [])

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {loading ? [0, 0, 0, 0].map((item, index) => (
                    <div className="skeleton aspect-video">
                    </div>
                )) : (
                    <>
                        <StatCard
                            title={"New patients this week:"}
                            icon={<Users2 />}
                            number={stats.newPatientsThisWeek.number}
                            up={stats.newPatientsThisWeek.up}
                            percentageChange={stats.newPatientsThisWeek.percentageChange}
                        />
                        <StatCard
                            title={"Appointments per day:"}
                            icon={<List />}
                            number={stats.appointmentsToday.number}
                            up={stats.appointmentsToday.up}
                            percentageChange={stats.appointmentsToday.percentageChange}
                        />
                        <StatCardNoProgress
                            title={"number of patients:"}
                            icon={<Users2 />}
                            number={stats.totalPatients}
                        />
                        <StatCardNoProgress
                            title={"number of doctors:"}
                            icon={<Users2 />}
                            number={stats.totalDoctors}
                        />
                    </>
                )}
            </div>
        </>
    );
}


function StatCard(props) {
    return (
        <>
            <div className="card card-bordered bg-base-300 p-5">
                <div className="w-full flex justify-between items-center">
                    <p className="text-neutral-500 text-sm">{props.title}</p>
                    {props.icon}
                </div>
                <div className="h-6" />
                <p className="font-bold text-3xl text-neutral">{props.number}</p>
                <div className="h-3" />
                {props.up ? (
                    <div className="flex justify-start items-center gap-3">
                        <MoveUpRight className="w-6 h-6 bg-success text-success-content p-1 rounded-full" />
                        <p className="text-success text-sm">+{props.percentageChange}%</p>
                    </div>
                ) : (
                    <div className="flex justify-start items-center gap-3">
                        <MoveDownRight className="w-6 h-6 bg-error text-error-content p-1 rounded-full" />
                        <p className="text-error text-sm">{props.percentageChange}%</p>
                    </div>
                )}
            </div>
        </>
    );
}



function StatCardNoProgress(props) {
    return (
        <>
            <div className="card card-bordered bg-base-300 p-5">
                <div className="w-full flex justify-between items-center">
                    <p className="text-neutral-500 text-sm">{props.title}</p>
                    {props.icon}
                </div>
                <div className="h-6" />
                <p className="font-bold text-3xl text-neutral">{props.number}</p>
            </div>
        </>
    );
}