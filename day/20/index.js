function selectInputPixels(inputImage, [x, y]) {
  if (x > 0 && x < inputImage[0].length - 1 && y > 0 && y < inputImage.length - 1) {
    return [
      inputImage[y - 1][x - 1], inputImage[y - 1][x], inputImage[y - 1][x + 1],
      inputImage[y][x - 1], inputImage[y][x], inputImage[y][x + 1],
      inputImage[y + 1][x - 1], inputImage[y + 1][x], inputImage[y + 1][x + 1],
    ].join('');
  }

  if (x === 0 && y === 0) {
    return `....${inputImage[y][x]}${inputImage[y][x + 1]}.${inputImage[y + 1][x]}${inputImage[y + 1][x + 1]}`;
  }
  if (x === inputImage[0].length - 1 && y === 0) {
    return `...${inputImage[y][x - 1]}${inputImage[y][x]}.${inputImage[y + 1][x - 1]}${inputImage[y + 1][x]}.`;
  }
  if (x === inputImage[0].length - 1 && y === inputImage.length - 1) {
    return `${inputImage[y - 1][x - 1]}${inputImage[y - 1][x]}.${inputImage[y][x - 1]}${inputImage[y][x]}....`;
  }
  if (x === 0 && y === inputImage.length - 1) {
    return `.${inputImage[y - 1][x]}${inputImage[y - 1][x + 1]}.${inputImage[y][x]}${inputImage[y][x + 1]}...`;
  }
  if (x === 0) {
    return `.${inputImage[y - 1][x]}${inputImage[y - 1][x + 1]}.${inputImage[y][x]}${inputImage[y][x + 1]}.${inputImage[y + 1][x]}${inputImage[y + 1][x + 1]}`;
  }
  if (x === inputImage[0].length - 1) {
    return `${inputImage[y - 1][x - 1]}${inputImage[y - 1][x]}.${inputImage[y][x - 1]}${inputImage[y][x]}.${inputImage[y + 1][x - 1]}${inputImage[y + 1][x]}.`;
  }
  if (y === 0) {
    return `...${inputImage[y][x - 1]}${inputImage[y][x]}${inputImage[y][x + 1]}${inputImage[y + 1][x - 1]}${inputImage[y + 1][x]}${inputImage[y + 1][x + 1]}`;
  }
  return `${inputImage[y - 1][x - 1]}${inputImage[y - 1][x]}${inputImage[y - 1][x + 1]}${inputImage[y][x - 1]}${inputImage[y][x]}${inputImage[y][x + 1]}...`;
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

function enhanceImage(algorithm, inputImage) {
  return inputImage.reduce((outputImage, line, y) => {
    const outputPixels = line.split('').map((char, x) => {
      const pixelsString = selectInputPixels(inputImage, [x, y]);
      return getOutputPixelFromBinaryNumber(algorithm, convertPixelsToBinaryNumberString(pixelsString));
    }).join('');
    outputImage.push(outputPixels);
    return outputImage;
  }, []);
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

  let outputImage = inputImage;

  // First
  outputImage = enhanceImage(algorithm, outputImage);

  // Twice
  outputImage = enhanceImage(algorithm, outputImage);

  return countLitPixels(outputImage);
}

function partTwo(data) {
  return 'TODO';
}

module.exports = {
  partOne,
  partTwo,
  selectInputPixels,
  convertPixelsToBinaryNumberString,
  getOutputPixelFromBinaryNumber,
  countLitPixels
};
