import { ChevronRight } from "lucide-react";
import heroBG from "../../../assets/hero-bg.png"
import { useUser } from "../../../hooks/useUser";
import { Link } from "react-router-dom";
export default function Hero() {
    const { user } = useUser();
    return (
        <div className="hero w-full aspect-[2.5]" style={{ backgroundImage: `url(${heroBG})` }}>
            <div className="hero-overlay bg-opacity-60">
                <div className="w-full max-w-3xl mx-auto mt-24 text-primary-content px-3">
                    <div className="card h-28 p-6 max-w-sm text-center blur relative">
                        <div className="absolute w-full h-full">
                            overlay
                        </div>
                    </div>
                    <p className="mb-5 text-5xl font-extrabold">DentalCare Clinic</p>
                    <h1 className="mb-5 text-xl">Creating Brighter Smiles Every Day with</h1>
                    <Link to={user ? "/profile/book-appointements" : "/login"} className="btn btn-primary gap-2">
                        Book Now
                        <ChevronRight />
                    </Link>
                    <p className="my-6">Dedicated to Excellence in Dental Health and Patient Satisfaction</p>
                </div>
            </div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">

                </div>
            </div>
        </div>
    );
}