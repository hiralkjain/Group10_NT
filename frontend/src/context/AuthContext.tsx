import { createContext, useState, useContext, ReactNode } from 'react';

// Strictly define only the 4 allowed access types
export type DeptName = 
  | "Admin (All Access)" 
  | "Infrastructure & DB" 
  | "Business Logic" 
  | "Access & Security";

interface User {
  username: string;
  role: 'ADMIN' | 'DEPT_HEAD';
  department: DeptName;
  filters: {
    logger?: string;
    keywords: string[];
    typicalAlerts: string[];
  };
}

interface AuthContextType {
  user: User | null;
  login: (username: string, dept: DeptName) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user_session');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username: string, dept: DeptName) => {
    const role = dept === "Admin (All Access)" ? "ADMIN" : "DEPT_HEAD";

    const userData: User = {
      username: username || dept,
      role,
      department: dept,
      filters: getFiltersForDept(dept)
    };

    setUser(userData);
    localStorage.setItem('user_session', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function getFiltersForDept(dept: DeptName) {
  switch (dept) {
    case "Infrastructure & DB":
      return { 
        logger: "MeshDataService", 
        keywords: ["DB connection", "timeout", "health check"],
        typicalAlerts: ["DB Connection Timeout", "Service Health Degradation"]
      };
    case "Business Logic":
      return { 
        keywords: ["payload", "Asset creation", "Bond", "Stock", "ETF"],
        typicalAlerts: ["Asset Creation Latency", "Invalid Asset Payload"]
      };
    case "Access & Security":
      return { 
        logger: "MeshDataController", 
        keywords: ["login", "accountId", "status=404"],
        typicalAlerts: ["Frequent Account Lookups", "Unauthorized Access Attempts"]
      };
    default:
      return { 
        keywords: [], 
        typicalAlerts: ["Full System Audit", "Global Performance Monitoring"] 
      };
  }
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};