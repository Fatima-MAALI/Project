import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"
import api from "../lib/axios";
import { useUser } from "../hooks/useUser";
import toast from "react-hot-toast";
import LoadingPage from "./loading-page";

export default function RequirePatient(props) {
    const { loading, authenticated } = useVerifyAuth()
    return (
        <>
            {loading ? (
                <LoadingPage />
            ) : (
                <>
                    {authenticated ? (<>{props.children}</>) : (<Navigate to="/login" />)}
                </>
            )}
        </>
    );
}

const useVerifyAuth = () => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const { getBearer, setToken, setUser } = useUser()
    useEffect(() => {
        const f = async () => {
            try {
                setLoading(true)
                const response = await api.get("/auth/role", { headers: { Authorization: getBearer() } })
                const role = response.data.role
                if (role === "patient") setAuthenticated(true)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setToken(null)
                setUser(null)
            }
        }
        f()
    }, [])
    return { loading, authenticated }
}