function selectPixel(image, [x, y], paddingPixel) {
  if (typeof image[y] !== "undefined" && typeof image[y][x] !== "undefined") {
    return image[y][x];
  }
  return paddingPixel;
}

function convertPixelsToBinaryNumberString(pixelsString) {
  let binaryNumber = '';
  for (let i = 0; i < pixelsString.length; i++) {
    binaryNumber += (pixelsString[i] === '.') ? '0' : '1';
  }
  return binaryNumber;
}

function getOutputPixelFromBinaryNumber(algorithm, binaryNumber) {
  return algorithm[parseInt(binaryNumber, 2)];
}

function enhanceImage(algorithm, inputImage, steps) {
  let outputImage = inputImage;
  printImage(outputImage);

  for (let s = 0; s < steps; s++) {
    const paddingPixel = (s % 2 === 0) ? algorithm[511] : algorithm[0];

    let newImage = [];
    for (let y = -1; y <= outputImage.length; y++) {
      let newLine = '';
      for (let x = -1; x <= outputImage.length; x++) {
        let pixelsString = '';
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            pixelsString += selectPixel(outputImage, [x + j, y + i], paddingPixel);
            //console.log(`[x=${x},y=${y}], (j=${j},i=${i})`);
          }
        }
        const binaryNumber = convertPixelsToBinaryNumberString(pixelsString);
        //console.log(`pixelsString=${pixelsString}, binaryNumber=${binaryNumber}`);
        newLine += getOutputPixelFromBinaryNumber(algorithm, binaryNumber);
      }
      newImage.push(newLine);
    }
    outputImage = newImage;
    printImage(outputImage);
  }
  return outputImage;
}

function printImage(image) {
  const display = image.reduce((result, line) => {
    result += `${line}\n`;
    return result;
  }, '');
  console.log(display);
}

function countLitPixels(image) {
  return image.reduce((litPixels, line) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '#') {
        litPixels++;
      }
    }
    return litPixels;
  }, 0);
}

function partOne(data) {
  const lines = data.split('\n');
  const algorithm = lines[0];

  const inputImage = [];
  for (let i = 2; i < lines.length; i++) {
    inputImage.push(lines[i]);
  }
  let outputImage = enhanceImage(algorithm, inputImage, 2);
  return countLitPixels(outputImage);
}

function partTwo(data) {
  return 'TODO';
}

module.exports = {
  partOne,
  partTwo,
  convertPixelsToBinaryNumberString,
  getOutputPixelFromBinaryNumber,
  countLitPixels
};
