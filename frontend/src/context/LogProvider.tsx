import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import { Log } from "../types/logs";

// 1. Define the shape of our context
interface LogContextType {
  logs: Log[];
  setLogs: React.Dispatch<React.SetStateAction<Log[]>>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// 2. Create the Context with a default value of undefined
// This allows us to catch errors if the Provider is missing
const LogContext = createContext<LogContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

// 3. The Provider Component
export function LogProvider({ children }: Props) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Memoize the value to prevent unnecessary re-renders of all consumers
  const value = useMemo(
    () => ({
      logs,
      setLogs,
      isLoading,
      setIsLoading,
    }),
    [logs, isLoading]
  );

  return (
    <LogContext.Provider value={value}>
      {children}
    </LogContext.Provider>
  );
}

// 4. Custom Hook for easy access
// Using this hook in Dashboard.tsx instead of useContext(LogContext) 
// will give you a clear error message if you forget the provider.
export function useLogContext() {
  const context = useContext(LogContext);

  if (!context) {
    throw new Error(
      "useLogContext must be used within a <LogProvider>. " +
      "Check your App.tsx to ensure the routes are wrapped!"
    );
  }

  return context;
}

export default LogContext;