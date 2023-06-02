const uuid = require("uuid");
const path = require("path");
var jimp = require("jimp");

const ApiError = require("../apiError/ApiError");

const { Dish } = require("../models/models");

class DishController {
   async create(req, res, next) {
      try {
         const { name, price, dishType } = req.body;
         const { img } = req.files;
         let filename = uuid.v4() + ".jpg";

         await img.mv(path.resolve(__dirname, "..", "static", filename));

         const promise = new Promise((res, rej) => {
            jimp
               .read(`./static/${filename}`)
               .then((img) => {
                  return img.resize(480, 640).quality(100).write(`./static/${filename}`);
               })
               .then(() => {
                  res();
               })
               .catch((e) => console.log(e));
         });

         promise.then(async () => {
            const { minimizeImg } = await import("../utils/minimizeImage.mjs");
            await minimizeImg(filename);
            filename = filename.slice(0, -3) + "webp";

            const dish = await Dish.create({ name, img: filename, price, dishType });

            return res.json(dish);
         });
      } catch (e) {
         next(ApiError.badRequest(e.message));
      }
   }

   async getAll(req, res) {
      let { page, limit } = req.query;
      page = page || 1;
      limit = limit || 8;
      let offset = (page - 1) * limit;

      const dishes = await Dish.findAndCountAll({ limit, offset });

      return res.json(dishes);
   }

   async getOne(req, res) {}
}

module.exports = new DishController();
