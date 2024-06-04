import { Link } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";

export default function ProfilePage() {
    const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl8UcJiZxXc_q-Zr-1dohkW5sd8lTxvpPj-g&s"
    const { user } = useUser();
    return (
        <>
            <div className="text-center text-4xl font-bold">
                My Profile
            </div>
            <div className="h-12" />
            <div className="w-full mx-3 p-5 card card-bordered bg-base-300">
                <div className="flex justify-end items-center">
                    <Link to="/profile/settings" className="cursor-pointer badge badge-outline bg-base-100 hover:bg-neutral-content">Edit profile</Link>
                </div>
                <div className="h-8" />
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-4">
                        <img src={url} alt="profile picture" className="w-full aspect-square rounded-box object-cover" />
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <div className="mt-6 text-3xl font-bold text-start">
                            {user.firstname} {user.lastname}
                        </div>
                        <div className="h-16" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="pl-5 flex flex-col justify-start items-start gap-3 text-lg font-semibold">
                                <div className="text-neutral"><span className="text-neutral-500">Email : </span> {user.email}</div>
                                <div className="text-neutral"><span className="text-neutral-500">Mobile : </span> {user.phone}</div>
                                <div className="text-neutral"><span className="text-neutral-500">Adress : </span> {user.address}</div>
                            </div>
                            <div className="pl-5 flex flex-col justify-start items-start gap-3 text-lg font-semibold">
                                <div className="text-neutral"><span className="text-neutral-500">Gender : </span> {user.gender}</div>
                                <div className="text-neutral"><span className="text-neutral-500">Birthday : </span> {new Date(user.birthday).toDateString()}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}