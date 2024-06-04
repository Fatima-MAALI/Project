import { Search } from "lucide-react";
import DoctorCard from "./doctor-card";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import api from "../../../lib/axios";
import toast from "react-hot-toast";

export default function AdminDoctorsPage() {
    const [loading, setLoading] = useState(true);
    const { user, getBearer } = useUser()
    const [doctors, setDoctors] = useState([])
    useEffect(() => {
        const f = async () => {
            try {
                const response = await api.get(`/admins/doctors`, { headers: { Authorization: getBearer() } })
                setLoading(false)
                setDoctors(response.data.doctors)
            } catch (error) {
                toast.error(error.response.data.message || error.response.data.error || error.response.error || "something went wrong")
            }
        }
        f()
    }, [])
    return (
        <>
            <p className="font-bold text-3xl">
                Doctors
            </p>
            <div className="h-4" />
            <p className="text-primary">
                All the doctors clinic :
            </p>
            <div className="h-4" />
            <div className="flex justify-between items-center gap-6">
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <Search />
                    <input type="text" className="grow" placeholder="Search by name" />
                </label>
            </div>
            <div className="h-8" />
            {loading ? (
                <div className="w-full h-16 flex justify-center items-center">
                    <div className="loading loading-lg" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {doctors.map((doctor, index) => (
                        <DoctorCard key={index} doctor={doctor} />
                    ))}
                </div>
            )}
        </>
    );
}




