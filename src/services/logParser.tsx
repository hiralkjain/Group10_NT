import { Log } from "../context/LogContext";

export function parseLogs(text: string): Log[] {

  const regex =
    /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d+)\s+(INFO|WARN|ERROR|DEBUG)\s+\d+\s+---.*?\]\s+([\w\.]+)\s+:\s+(.*)$/;

  return text
    .split("\n")
    .map(line => {

      const match = line.match(regex);

      if (!match) return null;

      return {
        timestamp: new Date(match[1]),
        level: match[2],
        service: match[3].split(".").pop() || "",
        message: match[4]
      };

    })
    .filter((log): log is Log => log !== null);

}