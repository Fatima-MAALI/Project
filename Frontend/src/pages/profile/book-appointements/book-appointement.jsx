import { Search } from "lucide-react";
import DoctorCard from "./doctor-card";
import useDoctors from "./use-doctors";

export default function BookAppointementPage() {
    const { doctors, loading } = useDoctors()

    return (
        <>

            <div className="flex justify-between items-center gap-6">
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <Search />
                    <input type="text" className="grow" placeholder="Search by doctor" />
                </label>
            </div>

            <div className="h-12" />

            <div className="font-bold text-3xl">Our Doctors</div>
            <div className="h-6" />


            {loading ? (
                <div className="h-32 w-full flex justify-center items-center">
                    <div className="loading loading-lg" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {doctors.map((doctor, index) => (
                        <DoctorCard key={index} doctor={doctor} />
                    ))}
                </div >
            )
            }

        </>
    );
}
