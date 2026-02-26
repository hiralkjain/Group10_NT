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

  // Logic for Level Colors in both modes
  const getLevelClass = (level: string, active: boolean) => {
    if (!active) return "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10";
    
    switch (level) {
      case "ERROR": return "bg-red-600 text-white border-red-700 shadow-lg shadow-red-900/20";
      case "WARN":  return "bg-yellow-500 text-white border-yellow-600 shadow-lg shadow-yellow-900/20";
      case "INFO":  return "bg-green-600 text-white border-green-700 shadow-lg shadow-green-900/20";
      default:      return "bg-blue-600 text-white border-blue-700 shadow-lg shadow-blue-900/20";
    }
  };

  const inputBaseClass = "p-2.5 bg-slate-50 dark:bg-black border border-slate-300 dark:border-white/10 rounded-xl text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white dark:placeholder:text-slate-600";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-white/5 p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10 mb-6 transition-colors"
    >
      {/* ROW 1: Date and Service Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* From Date/Time */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">From</label>
          <div className="flex gap-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className={inputBaseClass}
            />
            <input
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              className={inputBaseClass}
            />
          </div>
        </div>

        {/* To Date/Time */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">To</label>
          <div className="flex gap-2">
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className={inputBaseClass}
            />
            <input
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              className={inputBaseClass}
            />
          </div>
        </div>

        {/* Levels Section */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Levels</label>
          <div className="flex gap-2 flex-wrap pt-1">
            {["INFO", "WARN", "ERROR", "DEBUG"].map((level) => (
              <button
                type="button"
                key={level}
                onClick={() => toggleLevel(level)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black border transition-all active:scale-95 ${getLevelClass(level, levels.includes(level))}`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Logger/Service Name */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Logger / Service</label>
          <input
            type="text"
            value={logger}
            onChange={(e) => setLogger(e.target.value)}
            className={inputBaseClass}
            placeholder="MeshDataService"
          />
        </div>
      </div>

      {/* ROW 2: Search and Relative Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100 dark:border-white/5">
        
        {/* Keyword Search */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Keyword Search</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className={inputBaseClass}
            placeholder="Search 'timeout', 'DB error', etc."
          />
        </div>

        {/* Last Minutes */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Relative Time (Minutes)</label>
          <div className="relative">
            <input
              type="number"
              value={lastMinutes}
              disabled={isDateSelected}
              onChange={(e) => setLastMinutes(e.target.value === "" ? "" : Number(e.target.value))}
              className={`${inputBaseClass} ${
                isDateSelected ? "opacity-50 cursor-not-allowed bg-slate-200 dark:bg-white/10" : ""
              }`}
              placeholder="e.g. 15"
            />
            {isDateSelected && (
              <span className="absolute -bottom-5 left-0 text-[10px] text-amber-600 dark:text-amber-500 font-bold italic">
                Clear dates to enable
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-10">
        <button
          type="submit"
          className="flex-1 sm:flex-none bg-blue-600 text-white px-10 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="flex-1 sm:flex-none bg-transparent text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-white/10 px-10 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-white/5 transition-all active:scale-95"
        >
          Reset All
        </button>
      </div>
    </form>
  );
};

export default FilterForm;