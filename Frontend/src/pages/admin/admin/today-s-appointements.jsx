import { ArrowRight } from "lucide-react";

export default function TodayAppointements() {
    return (
        <>
            <div className="w-full flex justify-between items-center gap-3">
                <p className="font-bold text-2xl">
                    Today Appointements
                </p>
                <div className="w-12 h-12 bg-primary text-primary-content rounded-full flex justify-center items-center p-2 text-2xl">
                    5
                </div>
            </div>
            <div className="h-6" />
            <TodayAppointementsTable />
            <div className="h-6" />
            <div className="flex justify-center items-center">
                <button className="btn btn-primary btn-sm gap-3">
                    More Appointements
                    <ArrowRight />
                </button>
            </div>
        </>
    );
}


function TodayAppointementsTable() {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table text-lg">
                    <tbody>
                        {[0, 0, 0, 0, 0].map((item, index) => (
                            <tr key={index}>
                                <th>{index + 1}.</th>
                                <td><div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                                        <span className="text-lg">MO</span>
                                    </div>
                                </div> </td>
                                <td>Sofia wilson</td>
                                <td>10:30am</td>
                                <td>with Dr. katte flo</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}