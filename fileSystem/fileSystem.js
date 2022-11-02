const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
(async () => {
  try {
    await writeFile('../myData.txt', `Hey @ ${new Date()}`);
    console.log('File created successfully with promisify and async/await!');
  } catch (err) {
    console.log(err);
  }
})();

const appendFile = promisify(fs.appendFile);
(async () => {
  try {
    await appendFile('../myLogger.txt', `Request received @ ${Date()} \n`);
    console.log('File content appended successfully');
  } catch (err) {
    console.log(err);
  }
})();

const readFile = promisify(fs.readFile);
(async () => {
    try {
        const fileData = await readFile('myData.txt', 'utf8');
        console.log(fileData);
    } catch (err) {
        console.log(err);
    }
})();
