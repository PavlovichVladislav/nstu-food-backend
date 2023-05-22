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
         const { name, address, location, schedule, campus } = req.body;

         const { img } = req.files;
         let filename = uuid.v4() + ".jpg";
         await img.mv(path.resolve(__dirname, "..", "static", filename));

         jimp
            .read(`./static/${filename}`)
            .then((img) => {
               return img.resize(480, 640).quality(100).write(`./static/${filename}`);
            })
            .catch((e) => console.log(e));

         const { minimizeImg } = await import("../utils/minimizeImage.mjs");
         await minimizeImg(filename);

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
      } catch (error) {
         next(ApiError.badRequest(error.message));
      }
   }
}

module.exports = new RestuarantController();
