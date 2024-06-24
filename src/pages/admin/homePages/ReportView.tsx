import { useLocation } from "react-router-dom";

function ReportView() {
    const location = useLocation();
    const { report } = location.state || {};

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:w-3/4">
            {report && report.length > 0 ? (
                report.map((report, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
                        <h2 className="text-xl font-semibold mb-2">Report #{index + 1}</h2>
                        <p className="text-gray-700 mb-2"><strong>Note:</strong> {report.note}</p>
                        <p className="text-gray-700 mb-2"><strong>Reported:</strong> {report.report ? 'Yes' : 'No'}</p>
                        <p className="text-gray-700 mb-2"><strong>User ID:</strong> {report.user}</p>
                        <p className="text-gray-700 mb-2"><strong>Blog ID:</strong> {report.blog}</p>
                    </div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center h-64">
                    <p className="text-2xl text-gray-700">No Data Available</p>
                </div>
            )}
        </div>
    );
}

export default ReportView;
