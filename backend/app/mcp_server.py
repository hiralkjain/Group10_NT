from mcp.server.fastmcp import FastMCP
import json

# Initialize the server
mcp = FastMCP("LogSentinel-Monitor")

LOG_FILE = "sample-application.log"

@mcp.tool()
def search_logs(level: str = None, keyword: str = None):
    """Search through the log file based on level or keywords."""
    results = []
    with open(LOG_FILE, "r") as f:
        for line in f:
            if level and level not in line:
                continue
            if keyword and keyword.lower() not in line.lower():
                continue
            results.append(line.strip())
    return results[-50:] # Return last 50 matches

@mcp.tool()
def get_active_alerts():
    """Run the alert engine and return why alerts are firing."""
    # Insert your Requirement #3 logic here
    # Check for ERROR count > 5, etc.
    return "Alert: High Error Rate. Reason: 12 errors detected in last 10 mins."

@mcp.resource("logs://main")
def get_raw_logs():
    """Provides the full raw log file to the AI."""
    with open(LOG_FILE, "r") as f:
        return f.read()

if __name__ == "__main__":
    mcp.run()