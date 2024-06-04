import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import api from "../../../lib/axios";
import toast from "react-hot-toast";

export default function useNavbar() {
    const { user, getBearer, setToken, setUser, signOut } = useUser()
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState(null);

    useEffect(() => {
        const f = async () => {
            try {
                setLoading(true)
                const response = await api.get("/auth/role", { headers: { Authorization: getBearer() } })
                // toast.success(response.data.role)
                setRole(response.data.role)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setToken(null)
                setUser(null)
                toast.error(error.data.message)
            }
        }
        f()
    }, [])

    return { loading, role, user, signOut };
}