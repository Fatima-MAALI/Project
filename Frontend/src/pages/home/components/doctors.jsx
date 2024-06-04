import doctors from "./doctors-data";

export default function Doctors() {
    return (
        <>
            <div id="doctors" className="grid grid-cols-4 gap-8 mb-24">
                {doctors.map((doctor, index) => (
                    <DoctorCard doctor={doctor} highlight={index % 2} key={index} />
                ))}
            </div>
        </>
    );
}



function DoctorCard(props) {
    return (
        <>
            <div className="col-span-4 md:col-span-2 xl:col-span-1 flex flex-col bg-base-200 rounded-box shadow-lg">
                <div style={{ backgroundImage: `url(${props.doctor.image})`, backgroundSize: "cover" }} className={`bg-center rounded-t-box w-full h-96 object-contain`}></div>
                {props.highlight ? (
                    <div className="flex flex-col items-center gap-2 p-4">
                        <h2 className="font-bold text-xl">{props.doctor.name}</h2>
                        <span className="text-sm">{props.doctor.expert}</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 p-4 bg-primary rounded-b-box text-primary-content">
                        <h2 className="font-bold text-xl">{props.doctor.name}</h2>
                        <span className="text-sm">{props.doctor.expert}</span>
                    </div>
                )}
            </div>
        </>
    );
}

