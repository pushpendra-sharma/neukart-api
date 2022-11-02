const fs = require('fs');
const { promisify } = require('util');
const appendFile = promisify(fs.appendFile);

const requestLogger = async (req, res, next) => {
  try {
    const logMessage = `${new Date()} - ${req.method} - ${req.url} - ${
      req.body
    } \n`;
    await appendFile('RequestLogger.log', logMessage);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = requestLogger;
