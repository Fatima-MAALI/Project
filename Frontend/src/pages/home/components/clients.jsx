import clients from "./clients-data";

export default function Clients() {
    return (
        <div id="comments" className="w-full max-w-xl mx-auto">
            <p className="font-bold text-4xl text-center mb-12">
                What our clients say about us!
            </p>
            <ul className="flex flex-col gap-12 justify-start items-start">
                {clients.map((client, index) => (
                    <li key={index} className="flex flex-col gap-3">
                        <div className="flex justify-start items-center gap-4">
                            <div className="avatar">
                                <div className="w-16 rounded-full">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <p className="font-semibold">{client.name}</p>
                            <p className="text-neutral font-light">{client.time}</p>
                        </div>
                        <p>{client.comment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}