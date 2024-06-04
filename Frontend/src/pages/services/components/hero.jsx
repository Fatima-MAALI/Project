import serviceBG from "../../../assets/serices-bg.jpg"

export default function Hero() {
    return (
        <div className="hero w-full aspect-[2.5]" style={{ backgroundImage: `url(${serviceBG})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-3xl">
                    <h1 className="mb-5 text-5xl font-bold">Dentaclare Services</h1>
                    <p className="mb-5 text-xl font-bold leading-relaxed">At DentalCare clinic, we offer a comprehensive range of services designed to enhance the health, beauty, and functionality of your smile. Our experienced team is committed to providing top-quality care in a comfortable and welcoming environment, We have the expertise and technology to help you achieve your dental goals Schedule your appointment today and take the first step toward a healthier, more confident smile!</p>
                </div>
            </div>
        </div>
    );
}