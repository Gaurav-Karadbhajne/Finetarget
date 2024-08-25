// src/utils/taskQueue.js
const redis = require('../config/redisConfig');
const fs = require('fs');
const path = require('path');

const TASK_QUEUE_KEY = 'task_queue';

async function processTaskQueue() {
  while (true) {
    const task = await redis.lpop(TASK_QUEUE_KEY);
    if (task) {
      const { user_id } = JSON.parse(task);
      const log = `${user_id} - task completed at - ${new Date().toISOString()}\n`;
      fs.appendFileSync(path.join(__dirname, '../logs/task_logs.txt'), log);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 task per second
  }
}

module.exports = { processTaskQueue };
