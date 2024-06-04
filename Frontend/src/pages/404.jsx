import { Link } from "react-router-dom";

export default function Page404() {
    return (
        <div className="mt-96 w-full flex flex-col justify-center items-center">
            <p className="font-bold text-5xl">PAGE NOT FOUND</p>
            <Link to="/" className="link link-primary mt-4 text-lg">go home</Link>
        </div>
    );
}