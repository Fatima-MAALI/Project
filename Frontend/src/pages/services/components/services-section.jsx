import services_page_data from "./services-data";

export default function ServicesSection() {
    return (
        <>
            <div className="grid grid-cols-12 gap-6 -mt-44">
                {services_page_data.map((service, index) => {
                    if (index % 2 === 0) return <LeftCard key={index} service={service} />
                    else return <RightCard key={index} service={service} />
                })}
            </div>
        </>
    );
}


function LeftCard(props) {
    return (
        <div className="col-span-12 md:col-span-7 card card-side bg-base-100 shadow-xl flex-row-reverse p-1">
            <figure className="lg:min-w-72"><img className="hidden lg:block" src={props.service.image} alt={props.service.name} /></figure>
            <div className="card-body">
                <p className="text-center font-bold text-2xl">
                    {props.service.title}
                </p>
                <p className="text-center font-semibold">
                    {props.service.description}
                </p>
            </div>
        </div>
    );
}

function RightCard(props) {
    return (
        <div className="col-span-12 md:col-span-7 md:col-start-6 card card-side bg-base-100 shadow-xl p-1">
            <figure className="lg:min-w-72"><img className="hidden lg:block" src={props.service.image} alt={props.service.name} /></figure>
            <div className="card-body">
                <p className="text-center font-bold text-2xl">
                    {props.service.title}
                </p>
                <p className="text-center font-semibold">
                    {props.service.description}
                </p>
            </div>
        </div>
    );
}