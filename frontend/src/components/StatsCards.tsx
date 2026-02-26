interface Props {
  total: number;
  matched: number;
}

const StatsCards = ({ total, matched }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-gray-500">Total Logs</h3>
        <p className="text-2xl font-bold">{total}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-gray-500">Matched Logs</h3>
        <p className="text-2xl font-bold text-blue-600">{matched}</p>
      </div>
    </div>
  );
};

export default StatsCards;