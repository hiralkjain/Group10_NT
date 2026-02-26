// import { useState } from "react";

// interface Props {
//   onFilter: (filters: any) => void;
// }

// const FilterForm = ({ onFilter }: Props) => {
//   const [levels, setLevels] = useState<string[]>([]);
//   const [keyword, setKeyword] = useState("");
//   const [logger, setLogger] = useState("");
//   const [lastMinutes, setLastMinutes] = useState<number | "">("");
//   const [fromDate, setFromDate] = useState("");
//   const [fromTime, setFromTime] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [toTime, setToTime] = useState("");
//   //   const handleSubmit = (e: React.FormEvent) => {
//   //     e.preventDefault();

//   //     onFilter({
//   //       levels: levels.length > 0 ? levels : undefined,
//   //       message_keyword: keyword || undefined,
//   //       logger_contains: logger || undefined,
//   //       last_minutes: lastMinutes || undefined,
//   //     });
//   //   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     let start_datetime = undefined;
//     let end_datetime = undefined;

//     if (fromDate && fromTime) {
//       start_datetime = `${fromDate}T${fromTime}:00`;
//     }

//     if (toDate && toTime) {
//       end_datetime = `${toDate}T${toTime}:00`;
//     }

//     onFilter({
//       levels: levels.length > 0 ? levels : undefined,
//       message_keyword: keyword || undefined,
//       logger_contains: logger || undefined,
//       last_minutes: lastMinutes || undefined,
//       start_datetime,
//       end_datetime,
//     });
//   };

//   const toggleLevel = (level: string) => {
//     setLevels((prev) =>
//       prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
//     );
//   };
//   const isDateSelected = (fromDate && fromTime) || (toDate && toTime);

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded-lg shadow-md mb-6"
//     >
//       {/* ROW 1 */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {/* From */}
//         <div>
//           <label className="font-semibold">From</label>
//           <div className="flex gap-2 mt-2">
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               className="p-2 border rounded w-full"
//             />
//             <input
//               type="time"
//               value={fromTime}
//               onChange={(e) => setFromTime(e.target.value)}
//               className="p-2 border rounded w-full"
//             />
//           </div>
//         </div>

//         {/* To */}
//         <div>
//           <label className="font-semibold">To</label>
//           <div className="flex gap-2 mt-2">
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               className="p-2 border rounded w-full"
//             />
//             <input
//               type="time"
//               value={toTime}
//               onChange={(e) => setToTime(e.target.value)}
//               className="p-2 border rounded w-full"
//             />
//           </div>
//         </div>

//         {/* Levels */}
//         <div>
//           <label className="font-semibold">Levels</label>
//           <div className="flex gap-2 mt-2 flex-wrap">
//             {["INFO", "WARN", "ERROR", "DEBUG"].map((level) => (
//               <button
//                 type="button"
//                 key={level}
//                 onClick={() => toggleLevel(level)}
//                 className={`px-3 py-1 rounded-full text-sm border ${
//                   levels.includes(level)
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 {level}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Logger */}
//         <div>
//           <label className="font-semibold">Logger</label>
//           <input
//             type="text"
//             value={logger}
//             onChange={(e) => setLogger(e.target.value)}
//             className="mt-2 w-full p-2 border rounded"
//             placeholder="MeshDataService"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <div>
//           <label className="font-semibold">Keyword</label>
//           <input
//             type="text"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             className="mt-2 w-full p-2 border rounded"
//             placeholder="Search message..."
//           />
//         </div>

//         {/* Last Minutes */}
//         <div>
//           <label className="font-semibold">Last Minutes</label>
//           <input
//             type="number"
//             value={lastMinutes}
//             disabled={isDateSelected}
//             onChange={(e) => setLastMinutes(Number(e.target.value))}
//             className={`mt-2 w-full p-2 border rounded ${
//               isDateSelected ? "bg-gray-200 cursor-not-allowed" : ""
//             }`}
//             placeholder="10"
//           />
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//       >
//         Apply Filters
//       </button>
//     </form>
//   );
// };

// export default FilterForm;

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

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="font-semibold">From</label>
          <div className="flex gap-2 mt-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="p-2 border rounded w-full"
            />
            <input
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              className="p-2 border rounded w-full"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold">To</label>
          <div className="flex gap-2 mt-2">
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="p-2 border rounded w-full"
            />
            <input
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              className="p-2 border rounded w-full"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold">Levels</label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {["INFO", "WARN", "ERROR", "DEBUG"].map((level) => (
              <button
                type="button"
                key={level}
                onClick={() => toggleLevel(level)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  levels.includes(level)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
          <label className="font-semibold">Last Minutes</label>
          <input
            type="number"
            value={lastMinutes}
            disabled={isDateSelected}
            onChange={(e) => setLastMinutes(Number(e.target.value))}
            className={`mt-2 w-full p-2 border rounded ${
              isDateSelected ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
            placeholder="10"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Clear Filters
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
