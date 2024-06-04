import Features from "./components/features";
import Qualities from "./components/qualities";
import Hero from "./components/hero";
import Services from "./components/services";
import Doctors from "./components/doctors";
import Clients from "./components/clients";
import { ContactBar, Navbar, Footer } from "../../components/global";
import ContactUs from "./components/contact-us";

export default function HomePage() {
    return (
        <>
            <ContactBar />
            <Navbar />
            <Hero />
            <div className="container mx-auto px-3 mt-12 lg:-mt-16">
                <Features />
                <div className="h-16" />
                <Qualities />
                <div className="h-16" />
                <Services />
                <div className="h-16" />
                <h1 className="font-bold text-4xl text-center leading-relaxed">
                    Crafting Smiles, Building Confidence:<br />
                    Meet The Expertise<br />
                    Behind Your Dental Wellness!<br />
                </h1>
                <div className="h-16" />
                <Doctors />
                <div className="h-16" />
                <Clients />
                <div className="h-16" />
                <ContactUs />
            </div>
            <Footer />

        </>
    );
}