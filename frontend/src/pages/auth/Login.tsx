import React, { useState } from "react";
import { useAuth, DeptName } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [dept, setDept] = useState<DeptName>("Admin (All Access)");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, dept);
    navigate("/");
  };

  const inputStyles = `
    w-full p-3 text-sm rounded-xl outline-none transition-all border
    bg-white text-slate-900 border-slate-200
    dark:bg-slate-900 dark:border-white/10 dark:text-white
    focus:ring-2 focus:ring-blue-500
  `;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-black transition-colors duration-300">
      <div className="w-full max-w-[320px] sm:max-w-sm space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-1">
          <h1 className="text-4xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">
            Logs
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
            Secure Access Portal
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">Username</label>
              <input 
                required
                className={inputStyles}
                placeholder="Admin or Dept ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">Access Level</label>
              <select 
                className={`${inputStyles} appearance-none cursor-pointer pr-10`}
                value={dept}
                onChange={(e) => setDept(e.target.value as DeptName)}
              >
                <option className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white" value="Admin (All Access)">Admin (All Access)</option>
                <option className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white" value="Infrastructure & DB">Infrastructure & DB</option>
                <option className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white" value="Business Logic">Business Logic</option>
                <option className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white" value="Access & Security">Access & Security</option>
              </select>
              
              {/* Custom dropdown arrow icon */}
              <div className="pointer-events-none absolute bottom-[14px] right-3 flex items-center text-slate-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-xl transition-all active:scale-[0.97] text-xs shadow-xl shadow-blue-600/20"
          >
            Authorize Session
          </button>
        </form>

        <div className="text-center">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
            Identity Verified • LogSentinel v2.0
          </p>
        </div>
      </div>
    </div>
  );
}