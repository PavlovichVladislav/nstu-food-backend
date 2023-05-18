var fs = require("fs");
var jimp = require("jimp");

function givMeFiles(dir, files) {
   files = files || [];
   var allFiles = fs.readdirSync(dir);
   for (var i = 0; i < allFiles.length; i++) {
      var name = dir + "/" + allFiles[i];
      if (fs.statSync(name).isDirectory()) {
         givMeFiles(name, files);
      } else {
         files.push(name);
      }
   }
   return files;
}

const files = givMeFiles("./static");

files.forEach((file) => {
   jimp
      .read(file)
      .then((img) => {
         return img.resize(480, 640).quality(90).write(`${file}`);
      })
      .catch(e => console.log(e));
});

console.log(files);
