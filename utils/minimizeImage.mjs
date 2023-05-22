import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import webp from "imagemin-webp";
import fs from "fs";
import path from "path";

export const minimizeImg = async (fileName) => {
   // minimze
   await imagemin([`static/${fileName}`], {
      destination: "static",
      plugins: [
         imageminJpegtran(),
         imageminPngquant({
            quality: [0.7, 0.8],
         }),
         webp(),
      ],
   });

   const filePath = path.join("static", fileName);
   // delete old image, which replaced by new in webp format
   fs.unlink(filePath, (err) => {
      if (err) {
         console.error("Error deleting file:", err);
         return;
      }

      console.log(`Deleted file: ${fileName}`);
   });
};
