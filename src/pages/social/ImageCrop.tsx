export const getCroppedImg = (imageSrc: any, pixelCrop: any) => {

  // const canvas = document.createElement('canvas');
  // const scaleX = imageSrc?.naturalWidth / imageSrc?.width;
  // const scaleY = imageSrc?.naturalHeight / imageSrc?.height;
  // canvas.width = pixelCrop.width;
  // canvas.height = pixelCrop.height;
  // const ctx = canvas.getContext('2d');

  // const pixelRatio = window.devicePixelRatio;
  // canvas.width = pixelCrop.width * pixelRatio;
  // canvas.height = pixelCrop.height * pixelRatio;
  // ctx!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  // ctx!.imageSmoothingQuality = 'high';



  // ctx!.drawImage(
  //   imageSrc,
  //   pixelCrop.x * scaleX,
  //   pixelCrop.y * scaleY,
  //   pixelCrop.width * scaleX,
  //   pixelCrop.height * scaleY,
  //   0,
  //   0,
  //   pixelCrop.width,
  //   pixelCrop.height,
  // );

  // return new Promise((resolve, reject) => {
  //   canvas.toBlob((blob: any) => {
  //     blob.name = "test.png";
  //     resolve(blob);
  //   }, 'image/jpeg', 1);
  // });



  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  const scaleX = imageSrc?.naturalWidth / imageSrc?.width;
  const scaleY = imageSrc?.naturalHeight / imageSrc?.height;

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = imageSrc;

  return new Promise(resolve => {
    image.onload = function () {
      ctx!.drawImage(
        image,
        pixelCrop.x * scaleX,
        pixelCrop.y * scaleY,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,

      );
      resolve(canvas.toDataURL());
    };
  });
};