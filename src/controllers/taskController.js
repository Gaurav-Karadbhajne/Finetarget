const fs = require('fs');
const path = require('path');

// Define the path to the log file
const logFilePath = path.join(__dirname, '../logs/task_logs.txt');

// Ensure that the log file exists or create it
if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, '', { flag: 'w' });
}

async function task(user_id) {
    const logMessage = `${user_id} - task completed at - ${new Date().toISOString()}\n`;

    // Append the log message to the task_logs.txt file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        } else {
            console.log('Task logged successfully');
        }
    });
}

module.exports = {
    task
};
