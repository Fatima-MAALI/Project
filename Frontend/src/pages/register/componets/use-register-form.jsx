import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import api from "../../../lib/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"
import { useState } from "react";
import axios from "axios";
import { useUser } from "../../../hooks/useUser";

const useRegisterForm = () => {
    const navigate = useNavigate()
    const { setUser, setToken } = useUser();

    const form = useForm({
        initialValues: {
            firstname: "patient1",
            lastname: "patient11",
            email: "patient1@patient.dev",
            mobile: "07 88 88 88 88",
            password: "123123123",
            confirm_password: "123123123",
            birthday: "",
            gender: "man",
            role: "patient",
            address: "amizour"
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length > 5 ? null : 'password is too short'),
            firstname: (value) => (value.length > 3 ? null : 'first name is too short'),
            lastname: (value) => (value.length > 3 ? null : 'first name is too short'),
            address: (value) => (value.length > 5 ? null : 'address is too short'),
            mobile: (value) => (value.length > 8 ? null : 'mobile phone is too short'),
            confirm_password: (value, { password }) => (value === password) ? null : "passwords don't match",
            birthday: (value) => null,
            gender: (value) => null,
            role: (value) => null,
        },
    });

    const [isLoading, setIsLoading] = useState(false)
    const register = async () => {
        if (form.values.role === "patient") {
            try {
                setIsLoading(true)
                const response = await api.post("/patients/register", {
                    firstname: form.values.firstname,
                    lastname: form.values.lastname,
                    email: form.values.email,
                    phone: form.values.mobile,
                    gender: form.values.gender,
                    birthday: form.values.birthday,
                    password: form.values.password,
                    address: form.values.address,
                })
                const token = response.data.token;
                const user = response.data.user;
                setToken(token)
                setUser(user)
                toast.success("register success")
                setIsLoading(false)
                navigate("/profile")
            } catch (error) {
                setIsLoading(false)
                toast.error(error.response.data.message || error.response.data.error)
            }
        } else {
            try {
                setIsLoading(true)
                const response = await api.post("/doctors/register", {
                    firstname: form.values.firstname,
                    lastname: form.values.lastname,
                    email: form.values.email,
                    phone: form.values.mobile,
                    gender: form.values.gender,
                    birthday: form.values.birthday,
                    password: form.values.password,
                    address: form.values.address,
                    professionalExperience: [],
                    specialization: [],
                    workExperience: [],
                    education: []
                })
                const token = response.data.token;
                const user = response.data.doctor;
                console.log(response.data)
                setToken(token)
                setUser(user)
                toast.success("register success")
                setIsLoading(false)
                navigate("/doctor")
            } catch (error) {
                console.log(error)
                setIsLoading(false)
                console.log(error)
                toast.error(error.response.data.message || error.response.data.error)
            }
        }
    };


    return { form, register, isLoading }

}

export default useRegisterForm