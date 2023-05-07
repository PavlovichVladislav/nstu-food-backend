const uuid = require("uuid");
const path = require("path");

const ApiError = require("../apiError/ApiError");

const { Dish } = require("../models/models");

class DishController {
   async create(req, res, next) {
      try {
         const { name, price } = req.body;
         const { img } = req.files;
         let filename = uuid.v4() + ".jpg";

         img.mv(path.resolve(__dirname, "..", "static", filename));

         const dish = await Dish.create({ name, img: filename, price });

         return res.json(dish);
      } catch (e) {
         next(ApiError.badRequest(e.message));
      }
   }

   async getAll(req, res) {
    let { page, limit } = req.query;
    console.log(limit);
    page = page || 1;
    limit = limit || 8;
    let offset = (page - 1) * limit;

    const dishes = await Dish.findAndCountAll({limit, offset});

    return res.json(dishes);
   }

   async getOne(req, res) {

   }
}

module.exports = new DishController();
