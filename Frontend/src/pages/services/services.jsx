import Hero from "./components/hero";
import ServicesSection from "./components/services-section"
import { ContactBar, Navbar, Footer } from "../../components/global";

export default function ServicesPage() {
    return (
        <>
            <ContactBar />
            <Navbar />
            <Hero />
            <div className="h-44" />
            <div className="bg-primary p-6">
                <div className="container mx-auto px-3">
                    <ServicesSection />
                </div>
            </div>
            <Footer />

        </>
    );
}