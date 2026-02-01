export default function StatCard({ label , value}) {
    return (
        <div className="p-4 bg-white shadow rounded">
            <h3 className="text-gray-500">{label}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}