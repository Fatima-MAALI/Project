import { Facebook, Instagram, PhoneCall } from "lucide-react"

export default function ContactBar() {
    return (
        <nav id="home" className="bg-[#38A0C1] py-1">
            <div className="container mx-auto px-4 flex justify-between items-center text-white">
                <PhoneNumber />
                <SocialMedia />
            </div>
        </nav>
    );
}


function PhoneNumber() {
    return (
        <div className="flex justify-start items-center gap-2">
            <PhoneCall />
            <p>+2135-55-55-55-55</p>
        </div>
    );
}

function SocialMedia() {
    return (
        <div className="flex justify-end items-center gap-6">
            <a className="cursor-pointer">
                <Facebook />
            </a>
            <a className="cursor-pointer">
                <Instagram />
            </a>
        </div>
    );
}