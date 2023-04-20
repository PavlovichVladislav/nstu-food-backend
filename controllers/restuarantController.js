const { Restuarant } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../apiError/ApiError");

class RestuarantController {
   async getAll(req, res, ) {
      const restuarants = await Restuarant.findAll();
      return res.json(restuarants);
   }

   async create(req, res, next) {
      try {
         const { name, address, location, schedule, campus } = req.body;

         console.log(req.body);
         console.log(req.files);

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
