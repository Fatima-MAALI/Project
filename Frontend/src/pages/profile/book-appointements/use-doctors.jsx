import { useEffect, useState } from "react";
import api from "../../../lib/axios"
import { toast } from "react-hot-toast"
import { useUser } from "../../../hooks/useUser"

export default function useDoctors() {
    const [loading, setLoading] = useState(true);
    const [doctors, setDoctors] = useState([])
    const { getBearer } = useUser();

    useEffect(() => {
        const f = async () => {
            try {
                setLoading(true)
                const response = await api.get("/doctors/doctors", { headers: { Authorization: getBearer() } })
                const data = response.data
                setDoctors(data.doctors)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
                toast.error("something went wrong")
            }
        }
        f()
    }, [])

    return { loading, doctors }
}