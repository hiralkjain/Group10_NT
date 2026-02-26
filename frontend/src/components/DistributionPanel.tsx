// interface Props {
//   levelDist: any;
//   loggerDist: any;
// }

// const DistributionPanel = ({ levelDist, loggerDist }: Props) => {
//   return (
//     <div className="grid md:grid-cols-2 gap-4 mb-6">
//       <div className="bg-white p-4 rounded shadow">
//         <h3 className="font-semibold mb-2">Level Distribution</h3>
//         {Object.entries(levelDist).map(([key, value]) => (
//           <p key={key}>{key}: {String(value)}</p>
//         ))}
//       </div>

//       <div className="bg-white p-4 rounded shadow">
//         <h3 className="font-semibold mb-2">Logger Distribution</h3>
//         {Object.entries(loggerDist).map(([key, value]) => (
//           <p key={key}>{key}: {String(value)}</p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DistributionPanel;

import React from "react";

interface Props {
  levelDist?: Record<string, number> | null;
  loggerDist?: Record<string, number> | null;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case "ERROR":
      return "bg-red-100 text-red-700";
    case "WARN":
      return "bg-yellow-100 text-yellow-700";
    case "INFO":
      return "bg-blue-100 text-blue-700";
    case "DEBUG":
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const renderDistribution = (data?: Record<string, number> | null) => {
  if (!data || Object.keys(data).length === 0) {
    return <p className="text-gray-500 text-sm">No data available</p>;
  }

  const total = Object.values(data).reduce((acc, val) => acc + val, 0);

  return Object.entries(data).map(([key, value]) => {
    const percentage = ((value / total) * 100).toFixed(1);

    return (
      <div key={key} className="flex justify-between items-center mb-2">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(
            key,
          )}`}
        >
          {key}
        </span>

        <div className="text-sm text-gray-700">
          {value} ({percentage}%)
        </div>
      </div>
    );
  });
};

const DistributionPanel = ({ levelDist, loggerDist }: Props) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      {/* Level Distribution */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">Level Distribution</h3>
        {renderDistribution(levelDist)}
      </div>

      {/* Logger Distribution */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">Logger Distribution</h3>
        {renderDistribution(loggerDist)}
      </div>
    </div>
  );
};

export default DistributionPanel;