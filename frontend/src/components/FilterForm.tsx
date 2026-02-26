import { useState } from "react";

interface Props {
  onFilter: (filters: any) => void;
}

const FilterForm = ({ onFilter }: Props) => {
  const [levels, setLevels] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [logger, setLogger] = useState("");
  const [lastMinutes, setLastMinutes] = useState<number | "">("");
  const [fromDate, setFromDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toDate, setToDate] = useState("");
  const [toTime, setToTime] = useState("");

  const isDateSelected = (!!fromDate && !!fromTime) || (!!toDate && !!toTime);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let start_datetime = undefined;
    let end_datetime = undefined;

    if (fromDate && fromTime) {
      start_datetime = `${fromDate}T${fromTime}:00`;
    }

    if (toDate && toTime) {
      end_datetime = `${toDate}T${toTime}:00`;
    }

    onFilter({
      levels: levels.length > 0 ? levels : undefined,
      message_keyword: keyword || undefined,
      logger_contains: logger || undefined,
      last_minutes: isDateSelected ? undefined : lastMinutes || undefined,
      start_datetime,
      end_datetime,
    });
  };

  const toggleLevel = (level: string) => {
    setLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
    );
  };

  const handleClear = () => {
    setLevels([]);
    setKeyword("");
    setLogger("");
    setLastMinutes("");
    setFromDate("");
    setFromTime("");
    setToDate("");
    setToTime("");
    onFilter({});
  };

  // Helper for level colors matching your dashboard
  const getLevelClass = (level: string, active: boolean) => {
    if (!active) return "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200";
    switch (level) {
      case "ERROR": return "bg-red-600 text-white border-red-700";
      case "WARN":  return "bg-yellow-500 text-white border-yellow-600";
      case "INFO":  return "bg-green-600 text-white border-green-700";
      default:      return "bg-blue-600 text-white border-blue-700";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6"
    >
      {/* ROW 1: Date and Service Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        
        {/* From Date/Time */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-gray-700">From</label>
          <div className="flex flex-col lg:flex-row gap-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* To Date/Time */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-gray-700">To</label>
          <div className="flex flex-col lg:flex-row gap-2">
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Levels Section */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-gray-700">Levels</label>
          <div className="flex gap-2 flex-wrap pt-1">
            {["INFO", "WARN", "ERROR", "DEBUG"].map((level) => (
              <button
                type="button"
                key={level}
                onClick={() => toggleLevel(level)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${getLevelClass(level, levels.includes(level))}`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Logger/Service Name */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-gray-700">Logger / Service</label>
          <input
            type="text"
            value={logger}
            onChange={(e) => setLogger(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. MeshDataService"
          />
        </div>
      </div>

      {/* ROW 2: Search and Relative Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-gray-50">
        
        {/* Keyword Search */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-gray-700">Keyword Search</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Search message for 'timeout', 'DB error', etc."
          />
        </div>

        {/* Last Minutes */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-gray-700">Relative Time (Last X Minutes)</label>
          <input
            type="number"
            value={lastMinutes}
            disabled={isDateSelected}
            onChange={(e) => setLastMinutes(e.target.value === "" ? "" : Number(e.target.value))}
            className={`p-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none ${
              isDateSelected ? "bg-gray-100 cursor-not-allowed text-gray-400" : "bg-white"
            }`}
            placeholder="e.g. 15"
          />
          {isDateSelected && <span className="text-[10px] text-amber-600 font-medium">Clear "From/To" dates to use this.</span>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-700 shadow-sm transition-all active:scale-95"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="bg-white text-gray-600 border border-gray-300 px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-50 transition-all active:scale-95"
        >
          Reset All
        </button>
      </div>
    </form>
  );
};

export default FilterForm;