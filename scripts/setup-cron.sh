#!/bin/bash

# Get the absolute path of the current directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT_PATH="$PROJECT_DIR/scripts/update-scores.sh"
LOG_PATH="$PROJECT_DIR/logs/cron.log"

# Create logs directory if it doesn't exist
mkdir -p "$PROJECT_DIR/logs"

# Create the update script
cat << EOF > "$SCRIPT_PATH"
#!/bin/bash
# Ping the background sync API
curl -s -X GET http://localhost:3000/api/cron/update-scores >> "$LOG_PATH" 2>&1
echo " - \$(date)" >> "$LOG_PATH"
EOF

# Make the update script executable
chmod +x "$SCRIPT_PATH"

# Add to crontab if not already present (runs every hour)
(crontab -l 2>/dev/null | grep -v "$SCRIPT_PATH"; echo "0 * * * * $SCRIPT_PATH") | crontab -

echo "✅ Automation setup complete!"
echo "The background sync is now configured to run every hour via system crontab."
echo "You can check logs at: $LOG_PATH"
