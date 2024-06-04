import { Check } from "lucide-react";
import qualities from "../../../assets/qualities.png"

export default function Qualities() {
    return (
        <div id="about-us" className="grid grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1 flex justify-end">
                <img className="aspect-square max-w-xl rounded-box" src={qualities} alt="qualities" />
            </div>
            <div className="col-span-2 md:col-span-1">
                <p className="mt-8 font-bold text-4xl text-start max-w-xl">
                    Where expertise meets compassion, and your smile is our priority.
                </p>
                <p className="mt-6 text-start text-xl max-w-lg">
                    We use only best quality materials on the market in order to provide the best products to our patients
                </p>
                <div className="h-8" />
                <div className="prose-lg">
                    <ul>
                        <li className="flex justify-start items-center gap-3">
                            <Check />
                            Top quality dental team
                        </li>
                        <li className="flex justify-start items-center gap-3">
                            <Check />
                            State of the artc dental treatement
                        </li>
                        <li className="flex justify-start items-center gap-3">
                            <Check />
                            Discount on all dental treatement
                        </li>
                        <li className="flex justify-start items-center gap-3">
                            <Check />
                            Enrollment is quick and easy
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}