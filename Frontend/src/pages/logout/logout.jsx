import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";

export default function LogoutPage() {
    const { signOut } = useUser();
    useEffect(() => {
        signOut()
        location.reload()
    }, [])
    return (
        <></>
    );
}