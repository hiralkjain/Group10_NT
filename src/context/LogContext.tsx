import {
  createContext,
  useState,
  useEffect,
  ReactNode
} from "react";

import { parseLogs } from "../services/logParser";


// Define Log type
export interface Log {
  timestamp: Date;
  level: string;
  service: string;
  message: string;
}

interface LogContextType {
  logs: Log[];
}


// Define Provider props type
interface LogProviderProps {
  children: ReactNode;
}


// Create Context
export const LogContext =
  createContext<LogContextType | undefined>(undefined);


// Provider Component
export function LogProvider({
  children
}: LogProviderProps) {

  const [logs, setLogs] =
    useState<Log[]>([]);


  useEffect(() => {

    fetch("/sample-application.log")
      .then(res => res.text())
      .then(text => {

        const parsed = parseLogs(text);

        setLogs(parsed);

      });

  }, []);


  return (

    <LogContext.Provider value={{ logs }}>
      {children}
    </LogContext.Provider>

  );

}