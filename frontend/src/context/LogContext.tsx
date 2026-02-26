import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
} from "react";

import { Log } from "../types/logs";

// type
interface LogContextType {
  logs: Log[];
  setLogs: React.Dispatch<
    React.SetStateAction<Log[]>
  >;
}

// create context
const LogContext =
  createContext<
    LogContextType | undefined
  >(undefined);

// provider props
interface Props {
  children: ReactNode;
}

// provider component
export function LogProvider({
  children,
}: Props) {
  const [logs, setLogs] =
    useState<Log[]>([]);

  return (
    <LogContext.Provider
      value={{
        logs,
        setLogs,
      }}
    >
      {children}
    </LogContext.Provider>
  );
}

// custom hook (recommended)
export function useLogContext() {
  const context =
    useContext(LogContext);

  if (!context) {
    throw new Error(
      "useLogContext must be used inside LogProvider"
    );
  }

  return context;
}

export default LogContext;