const fs = require('fs');

function run(day, part) {
  try {
    // Input
    const parts = require(`${__dirname}/day/${day}`);
    const data = fs.readFileSync(`${__dirname}/day/${day}/input.txt`, 'utf8').trim();

    // Process
    console.time('time');
    let result = (part === 'one') ? parts.partOne(data) : parts.partTwo(data);
    console.timeEnd('time');

    // Output
    console.log('result:', result);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run(process.argv[2], process.argv[3]);
