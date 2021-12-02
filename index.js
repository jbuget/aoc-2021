const fs = require('fs');

function run(day, part) {
  try {
    // Input
    const parts = require(`${__dirname}/day/${day}`);
    const data = fs.readFileSync(`${__dirname}/day/${day}/input`, 'utf8');

    // Process
    let result = (part === 'one') ? parts[0](data) : parts[1](data);

    // Output
    console.log(result);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

console.log('day:', process.argv[2]);
console.log('part:', process.argv[3]);

run(process.argv[2], process.argv[3]);
