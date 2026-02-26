
import { useAuth } from "../context/AuthContext";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid, Cell 
} from "recharts";
import { Clock, ShieldCheck } from "lucide-react";

const RESOLUTION_DATA = [
  { department: "Infrastructure & DB", alerted: 45, resolved: 38, avgTime: "12m", color: "#3b82f6" },
  { department: "Business Logic", alerted: 28, resolved: 28, avgTime: "5m", color: "#a855f7" },
  { department: "Access & Security", alerted: 62, resolved: 41, avgTime: "24m", color: "#ef4444" },
];

export default function ResolutionHub() {
  const { user } = useAuth();

  // Security Check: Only Admins can access this comparative view
  if (user?.role !== "ADMIN") {
    return (
      <div className="h-96 flex items-center justify-center text-red-500 font-black tracking-widest">
        RESTRICTED ACCESS: ADMIN AUTHORIZATION REQUIRED
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black dark:text-white uppercase tracking-tighter italic">Resolution Hub</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Global Departmental Performance</p>
        </div>
        <div className="flex gap-3">
          <MetricBadge label="System Health" value="Stable" color="text-green-500" />
          <MetricBadge label="Total Efficiency" value="84%" color="text-blue-500" />
        </div>
      </header>

      {/* Comparative Performance Chart */}
      <section className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-xl">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-8">Alerts vs Resolutions by Department</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={RESOLUTION_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
              <XAxis 
                dataKey="department" 
                fontSize={10} 
                fontFamily="inherit" 
                fontWeight="900" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b' }} 
              />
              <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
              />
              <Bar dataKey="alerted" fill="#475569" radius={[4, 4, 0, 0]} barSize={40} />
              <Bar dataKey="resolved" radius={[4, 4, 0, 0]} barSize={40}>
                {RESOLUTION_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-600 rounded-full"/> Total Alerted</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"/> Total Resolved</div>
        </div>
      </section>

      {/* Detailed Department Breakdown Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {RESOLUTION_DATA.map((dept) => (
          <div key={dept.department} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-white/10 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold dark:text-white tracking-tight">{dept.department}</h3>
                <p className="text-[10px] font-black text-slate-500 uppercase">Sector Performance</p>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-white/5 rounded-xl">
                <ShieldCheck size={18} style={{ color: dept.color }} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2">
                  <Clock size={12} /> Avg Resolve Time
                </span>
                <span className="font-mono text-sm dark:text-white font-bold">{dept.avgTime}</span>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                  <span className="text-slate-500">Efficiency</span>
                  <span style={{ color: dept.color }}>{Math.round((dept.resolved / dept.alerted) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-1000" 
                    style={{ width: `${(dept.resolved / dept.alerted) * 100}%`, backgroundColor: dept.color }}
                  />
                </div>
              </div>
            </div>
            
            <button className="mt-6 w-full py-3 bg-slate-50 dark:bg-white/5 hover:bg-blue-600 hover:text-white border border-slate-200 dark:border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
              View Audit Logs
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

interface MetricBadgeProps {
  label: String,
  value: String,
  color: String
}

function MetricBadge({ label, value, color }: MetricBadgeProps) {
  return (
    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-xl flex flex-col items-center min-w-[100px]">
      <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">{label}</span>
      <span className={`text-sm font-black ${color}`}>{value}</span>
    </div>
  );
}