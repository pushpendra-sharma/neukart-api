const fs = require('fs');
const { promisify } = require('util');
const appendFile = promisify(fs.appendFile);

// Error handling middleware
const errorLogger = async (err, req, res, next) => {
  if (err) {
    const errorMessage = `${new Date().toDateString()} - ${req.method} - ${
      req.url
    } - ${err.message} \n`;
    await appendFile('ErrorLogger.log', errorMessage, (error) => {
      if (error) console.log('error logging failed');
    });

    res.json({
      status: 'error',
      message: err.message,
    });
    next();
  }
};
module.exports = errorLogger;
