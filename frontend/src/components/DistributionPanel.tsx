interface Props {
  levelDist: any;
  loggerDist: any;
}

const DistributionPanel = ({ levelDist, loggerDist }: Props) => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Level Distribution</h3>
        {Object.entries(levelDist).map(([key, value]) => (
          <p key={key}>{key}: {String(value)}</p>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Logger Distribution</h3>
        {Object.entries(loggerDist).map(([key, value]) => (
          <p key={key}>{key}: {String(value)}</p>
        ))}
      </div>
    </div>
  );
};

export default DistributionPanel;