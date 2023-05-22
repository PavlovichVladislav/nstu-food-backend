import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import webp from "imagemin-webp";
import fs from "fs";
import path from "path";

/*
 Module for minimize all images in static
*/

const files = await imagemin(["static/*.{jpg,png}"], {
   destination: "static",
   plugins: [
      imageminJpegtran(),
      imageminPngquant({
         quality: [0.8, 0.8],
      }),
      webp(),
   ],
});

fs.readdir("static", (err, files) => {
   if (err) {
      console.error("Error reading folder:", err);
      return;
   }

   const pngFiles = files.filter((file) => path.extname(file).toLowerCase() === ".jpg");

   pngFiles.forEach((file) => {
      const filePath = path.join("static", file);

      fs.unlink(filePath, (err) => {
         if (err) {
            console.error("Error deleting file:", err);
            return;
         }

         console.log(`Deleted file: ${file}`);
      });
   });
});
