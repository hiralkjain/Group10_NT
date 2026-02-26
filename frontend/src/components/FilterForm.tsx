import { useState } from "react";

interface Props {
  onFilter: (filters: any) => void;
}

const FilterForm = ({ onFilter }: Props) => {
  const [levels, setLevels] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [logger, setLogger] = useState("");
  const [lastMinutes, setLastMinutes] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onFilter({
      levels: levels.length > 0 ? levels : undefined,
      message_keyword: keyword || undefined,
      logger_contains: logger || undefined,
      last_minutes: lastMinutes || undefined,
    });
  };

  const toggleLevel = (level: string) => {
    setLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level]
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div>
          <label className="font-semibold">Levels</label>
          <div className="flex gap-2 mt-2">
            {["INFO", "WARN", "ERROR", "DEBUG"].map((level) => (
              <button
                type="button"
                key={level}
                onClick={() => toggleLevel(level)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  levels.includes(level)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-semibold">Keyword</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="mt-2 w-full p-2 border rounded"
            placeholder="Search message..."
          />
        </div>

        <div>
          <label className="font-semibold">Logger</label>
          <input
            type="text"
            value={logger}
            onChange={(e) => setLogger(e.target.value)}
            className="mt-2 w-full p-2 border rounded"
            placeholder="MeshDataService"
          />
        </div>

        <div>
          <label className="font-semibold">Last Minutes</label>
          <input
            type="number"
            value={lastMinutes}
            onChange={(e) => setLastMinutes(Number(e.target.value))}
            className="mt-2 w-full p-2 border rounded"
            placeholder="10"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default FilterForm;