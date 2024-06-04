import { useUser } from "../../../hooks/useUser";
const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl8UcJiZxXc_q-Zr-1dohkW5sd8lTxvpPj-g&s"

export default function DoctorPage() {
    const { user } = useUser()
    return (
        <>
            <p className="font-bold text-3xl">
                Good Morning Dr.{user.firstname}
            </p>
            <div>
                <div className="h-12" />
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="font-bold text-xl text-primary">Personal information :</div>
                        <div className="h-6" />
                        <div><span className="text-neutral-500">First name : </span>{user.firstname}</div>
                        <div><span className="text-neutral-500">Last name : </span>{user.lastname}</div>
                        <div><span className="text-neutral-500">Phone number : </span>{user.phone}</div>
                        <div><span className="text-neutral-500">Email : </span>{user.email}</div>
                        <div><span className="text-neutral-500">Adress : </span>{user.address}</div>
                        <div className="h-12" />
                        <img className="w-full aspect-square max-w-72  rounded-box object-cover" src={url} alt={user._id} />
                    </div>
                    <div>
                        <div className="font-bold text-xl text-primary">Professional experience :</div>
                        <div className="prose">
                            <ul>
                                {user.professionalExperience.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                                {user.professionalExperience.length < 1 && <li>none</li>}
                            </ul>
                        </div>
                        <div className="h-6" />
                        <div className="font-bold text-xl text-primary"> specialization & Work experience :</div>
                        <div className="prose">
                            <ul>
                                {user.specialization.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                                {user.specialization.length < 1 && <li>none</li>}
                            </ul>
                        </div>
                        <div className="h-6" />
                        <div className="font-bold text-xl text-primary">Education :</div>
                        <div className="prose prose-sm">
                            <ul>
                                {user.workExperience.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                                {user.workExperience.length < 1 && <li>none</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
