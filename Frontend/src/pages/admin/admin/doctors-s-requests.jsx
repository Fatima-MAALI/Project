import { Eye } from "lucide-react";

export default function DoctorsRequests() {
    return (
        <>
            <div className="w-full flex justify-between items-center gap-3">
                <p className="font-bold text-2xl">
                    Doctors requests
                </p>
                <div className="w-12 h-12 bg-error text-error-content rounded-full flex justify-center items-center p-2 text-2xl">
                    5
                </div>
            </div>
            <div className="h-6" />
            <DoctorsRequestsTable />
        </>
    );
}


function DoctorsRequestsTable() {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th></th>
                            <th>Doctors Name</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[0, 0, 0, 0, 0].map((item, index) => (
                            <tr className="text-center" key={index}>
                                <td>
                                    <div className="avatar placeholder">
                                        <div className="bg-error text-error-content rounded-full w-12">
                                            <span className="text-md">MO</span>
                                        </div>
                                    </div>
                                </td>
                                <td>Jhon Parker</td>
                                <td>14/5</td>
                                <td>
                                    <div className="flex justify-center items-center">
                                        <button className="btn btn-square btn-sm btn-ghost">
                                            <Eye />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}