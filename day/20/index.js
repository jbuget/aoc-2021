function selectInputPixels(inputImage, inputPixel) {

}

function convertPixelsToBinaryNumberString(pixelsString) {
  let binaryNumber = '';
  for (let i = 0; i < pixelsString.length; i++) {
    binaryNumber += (pixelsString[i] === '.') ? '0' : '1';
  }
  return binaryNumber;
}

function getOutputPixelFromBinaryNumber(imageEnhancementAlgorithm, binaryNumber) {
  return imageEnhancementAlgorithm[parseInt(binaryNumber, 2)];
}

function enhanceImage(imageEnhancementAlgorithm, inputImage) {

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
  const imageEnhancementAlgorithm = lines[0];

  const inputImage = [];
  for (let i = 2; i < lines.length; i++) {
    inputImage.push(lines[i]);
  }

  console.log(imageEnhancementAlgorithm);

  inputImage.forEach(console.log);

  return 'TODO';
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
