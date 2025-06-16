// getCroppedImg.js
export default async function getCroppedImg(imageSrc, croppedAreaPixels) {
  const image = new Image();
  image.src = imageSrc;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    }, "image/png");
  });
}
