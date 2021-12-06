const fs = require('fs');

function run(day, part) {
  try {
    // Input
    console.time('time');

    const parts = require(`${__dirname}/day/${day}`);
    const data = fs.readFileSync(`${__dirname}/day/${day}/input.txt`, 'utf8').trim();

    // Process
    let result = (part === 'one') ? parts.partOne(data) : parts.partTwo(data);

    // Output
    console.log('result:', result);
    console.timeEnd('time');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run(process.argv[2], process.argv[3]);
