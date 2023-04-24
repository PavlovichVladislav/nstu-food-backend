const { Restuarant, Review } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../apiError/ApiError");

class RestuarantController {
   async getAll(req, res) {
      let { campus, limit, page } = req.query;

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

      return res.json(restuarants);
   }

   async getOne(req, res) {
      const { id } = req.params;
      const restuarant = await Restuarant.findOne({
         where: { id }, include: [{model: Review, as: 'reviews'}]
      });

      return res.json(restuarant);
   }

   async create(req, res, next) {
      try {
         const { name, address, location, schedule, campus } = req.body;

         const { img } = req.files;
         let filename = uuid.v4() + ".jpg";
         img.mv(path.resolve(__dirname, "..", "static", filename));

         const restuarant = await Restuarant.create({
            name,
            address,
            location,
            schedule,
            campus,
            img: filename,
         });

         return res.json(restuarant);
      } catch (error) {
         next(ApiError.badRequest(error.message));
      }
   }
}

module.exports = new RestuarantController();
