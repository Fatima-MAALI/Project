import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import api from "../../../lib/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"
import { useState } from "react";
import axios from "axios";
import { useUser } from "../../../hooks/useUser";

const useLoginForm = () => {
    const navigate = useNavigate()
    const { setUser, setToken } = useUser();

    const form = useForm({
        initialValues: {
            email: 'patient1@patient.dev',
            password: '123123123',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length > 5 ? null : 'password is too short')
        },
    });

    const [isLoading, setIsLoading] = useState(false)
    const login = async () => {
        try {
            setIsLoading(true)
            const response = await api.post('/auth/login', {
                email: form.values.email,
                password: form.values.password
            });
            const token = response.data.token;
            const user = response.data.user;
            setToken(token)
            setUser(user)
            toast.success("login success")
            setIsLoading(false)
            if (response.data.userRole === "admin") navigate("/admin")
            if (response.data.userRole === "doctor") navigate("/doctor")
            if (response.data.userRole === "patient") navigate("/profile")
        } catch (error) {
            setIsLoading(false)
            toast.error(error.response.data.message || error.response.data.error || error.response.error || "something went wrong")
        }
    };

    return { form, login, isLoading }

}

export default useLoginForm