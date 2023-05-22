var jimp = require("jimp");

const resizeImg = async (filename) => {
    console.log('resize');

   jimp
      .read(`../crispy-campus-server/static/${filename}`)
      .then((img) => {
         return img.resize(480, 640).quality(100).write(`../crispy-campus-server/static/${filename}`);
      })
      .catch((e) => console.log(`resize error: ${e}`));
};

module.exports = resizeImg;
