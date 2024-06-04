import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import api from "../../lib/axios";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactsPage() {
    const [loading, setLoading] = useState(true);
    const { getBearer } = useUser()
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        const f = async () => {
            try {
                const response = await api.get(`/admins/contacts`, { headers: { Authorization: getBearer() } })
                setLoading(false)
                setContacts(response.data.contacts)
            } catch (error) {
                toast.error(error.response.data.message || error.response.data.error || error.response.error || "something went wrong")
            }
        }
        f()
    }, [])
    return (
        <>

            <p className="font-bold text-start text-3xl">Contacts</p>

            <div className="h-8" />

            {loading ? <div className="h-16 flex justify-center items-center"><div className="loading loading-lg" /></div> : (
                <div className="overflow-x-auto">
                    <table className="table text-center">
                        <thead>
                            <tr className="text-lg bg-primary text-primary-content">
                                <th>name</th>
                                <th>email</th>
                                <th>message</th>
                                <th>status</th>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody className="text-lg text-nowrap">
                            {contacts.map((contact, index) => (
                                <tr key={index}>
                                    <td>{contact.firstname} {contact.lastname}</td>
                                    <td>{contact.email}</td>
                                    <td className="text-wrap max-w-96">{contact.message}</td>
                                    <td>
                                        {contact.seen ? (
                                            <div className="badge badge-success">seen</div>
                                        ) : (
                                            <div className="badge badge-warning">new</div>
                                        )}
                                    </td>
                                    <SeenButton id={contact._id} seen={contact.seen} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {contacts.length < 1 && <div className="w-full h-16 flex justify-center items-center text-center font-semibold text-2xl">empty</div>}
                </div >
            )}
        </>
    );
}


function SeenButton(props) {

    const [loading, setLoading] = useState(false)
    const { getBearer } = useUser()
    const delete_handeler = async () => {
        try {
            setLoading(true);
            await api.put(`/admins/contact/seen`, { contactId: props.id }, { headers: { Authorization: getBearer() } })
            toast.success("appointment deleted successfully")
            location.reload()
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
            toast.error("something went wrong")
        }
    }
    return (
        <td>
            <button onClick={delete_handeler} disabled={loading} className="btn btn-square btn-sm">
                {loading ? <div className="loading" /> : <>{props.seen ? <EyeOff /> : <Eye />}</>}
            </button>
        </td>
    );
}