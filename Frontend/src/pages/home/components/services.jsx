import { Hand } from "lucide-react";
import servicesImage from "../../../assets/services.png"
import services from "./services-data";
export default function Services() {
    return (
        <div id="services" className="bg-primary text-primary-content rounded-box p-6">
            <div className="container mx-auto grid grid-cols-2 gap-8">
                <div className="col-span-2 lg:col-span-1 py-24">
                    <p className="font-bold text-4xl leading-relaxed">
                        Elevating Smiles, Tailored<br />
                        Services: Your Path To<br />
                        Comprehensive Dental well-being
                    </p>
                    <div className="h-8" />
                    <div className="w-full flex flex-wrap md:flex-nowrap justify-start items-center gap-8">
                        <Service service={services[0]} />
                        <Service service={services[1]} />
                    </div>
                    <div className="mt-6 w-full flex flex-wrap md:flex-nowrap justify-start items-center gap-8">
                        <Service service={services[2]} />
                        <Service service={services[3]} />
                    </div>
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <img alt="services" src={servicesImage} className="rounded-box object-fill" />
                </div>
            </div>
        </div>
    );
}


function Service(props) {
    return (
        <div className="flex justify-start items-start gap-3">
            <props.service.icon className="w-16 h-16 bg-success text-success-content rounded-full p-3" />
            <div className="flex flex-col justify-start items-start text-start">
                <p className="text-success font-bold text-xl ">{props.service.title}</p>
                <p className="text-lg">{props.service.description}</p>
            </div>
        </div>
    );
}