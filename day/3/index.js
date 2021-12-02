const fs = require('fs');

function partOne(data) {
  // TODO
}

function partTwo(data) {
  // TODO
}

function main() {
  try {
    // Input
    const data = fs.readFileSync(`${__dirname}/input`, 'utf8');

    // Process
    const result = partOne(data);
    //const result = partTwo(data);

    // Output
    console.log(result);
  } catch (err) {
    console.error(err);
    partOne.exit(1);
  }
}

main();
