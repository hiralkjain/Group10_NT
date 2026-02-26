import { Log } from "../context/LogContext";

export function parseLogs(text: string): Log[] {
  const lines = text.split("\n");

  const logs: Log[] = [];

  const regex =
    /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d+)\s+(\w+)\s+\d+\s+---\s+\[.*?\]\s+([\w\.]+)\s+:\s+(.*)$/;

  for (const line of lines) {
    const match = line.match(regex);

    if (!match) continue;

    const timestamp = new Date(match[1]);

    const level = match[2];

    const fullService = match[3];

    const service =
      fullService.split(".").pop() || fullService;

    const message = match[4];

    logs.push({
      timestamp,
      level,
      service,
      message,
    });
  }

  return logs;
}