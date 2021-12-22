function selectInputPixels(inputImage, inputPixel) {

}

function enhanceImage(imageEnhancementAlgorithm, inputImage) {

}

function countLitPixels(image) {

}

function partOne(data) {
  const lines = data.split('\n');
  const imageEnhancementAlgorithm = lines[0];

  const inputImage = [];
  for (let i = 2 ; i < lines.length ; i++) {
    inputImage.push(lines[i]);
  }

  console.log(imageEnhancementAlgorithm);

  inputImage.forEach(console.log);

  return 'TODO';
}

function partTwo(data) {
  return 'TODO';
}

module.exports = { partOne, partTwo, selectInputPixels, convertPixelsToBinaryNumber, getOutputPixelFromBinaryNumber, countLitPixels };
