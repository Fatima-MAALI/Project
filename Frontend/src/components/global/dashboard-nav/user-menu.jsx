import { useUser } from "../../../hooks/useUser";

export default function UserMenu() {
    const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl8UcJiZxXc_q-Zr-1dohkW5sd8lTxvpPj-g&s"
    const { user } = useUser();
    return (
        <>
            <div className="hidden md:flex max-w-64 overflow-hidden card border-success border card-side bg-base-100 shadow-xl rounded-full">
                <figure className="aspect-square rounded-full h-16"><img src={url} alt="Movie" /></figure>
                <div className="my-2 ml-3 mr-3 text-neutral-500 flex justify-start items-center">
                    <p>Hello <span className="text-primary">{user.firstname}</span></p>
                </div>
            </div>
            <div className="avatar md:hidden">
                <div className="w-16 border border-success rounded-full">
                    <img src={url} />
                </div>
            </div>
        </>
    );
}