import features from "./features-data";

export default function Features() {
    return (
        <div className="w-full grid grid-cols-3 gap-8">

            {features.map((feature, index) => (
                <div key={index} className="col-span-3 md:col-span-1 flex flex-col gap-6 bg-base-200 rounded-box p-6 max-w-xl">
                    <div className="mt-2 flex justify-center items-center">
                        <feature.icon className="w-16 h-16 bg-primary text-primary-content rounded-full p-3" />
                    </div>

                    <p className="mt-2 font-bold text-2xl text-center">
                        {feature.title}
                    </p>
                    <p className="mt-2 text-center">
                        {feature.description}
                    </p>
                    <div className="h-16" />
                </div>
            ))}
        </div>
    );
}