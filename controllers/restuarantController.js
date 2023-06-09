const { Restuarant, Review, Menu } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
var jimp = require("jimp");

const ApiError = require("../apiError/ApiError");

class RestuarantController {
   async getAll(req, res) {
      let { campus, limit, page, search } = req.query;

      page = page || 1;
      limit = limit || 8;

      let offset = (page - 1) * limit;

      let restuarants;

      if (!campus) {
         restuarants = await Restuarant.findAndCountAll({ limit, offset });
      }

      if (campus) {
         restuarants = await Restuarant.findAndCountAll({ where: { campus }, limit, offset });
      }

      if (search) {
         restuarants.rows = restuarants.rows.filter((restuarant) =>
            restuarant.dataValues.name.toLowerCase().includes(search.toLowerCase())
         );
      }

      return res.json(restuarants);
   }

   async getOne(req, res) {
      const { id } = req.params;
      const restuarant = await Restuarant.findOne({
         where: { id },
         include: [{ model: Review, as: "reviews" }],
      });

      return res.json(restuarant);
   }

   async create(req, res, next) {
      try {
         const { name, address, location, schedule, campus, resize, width, height } = req.body;

         const { img } = req.files;
         let filename = uuid.v4() + ".jpg";
         await img.mv(path.resolve(__dirname, "..", "static", filename));

         const promise = new Promise((res, rej) => {
            jimp
               .read(`./static/${filename}`)
               .then((img) => {
                  if (resize) {
                     const reszWidth = width ? width : 480;
                     const reszHeigth = height ? height : 640;

                     return img.resize(Number(reszWidth), Number(reszHeigth)).quality(100).write(`./static/${filename}`);
                  }
                  
                  else return img.quality(100).write(`./static/${filename}`);
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

            const restuarant = await Restuarant.create({
               name,
               address,
               location,
               schedule,
               campus,
               img: filename,
            });

            const menu = await Menu.create({ restuarantId: restuarant.id });

            return res.json(restuarant);
         });
      } catch (error) {
         next(ApiError.badRequest(error.message));
      }
   }
}

module.exports = new RestuarantController();
