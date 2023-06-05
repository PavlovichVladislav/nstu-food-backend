const { MenuItem, Menu, Dish, Restuarant } = require("../models/models");
const ApiError = require("../apiError/ApiError");

class MenuController {
   async getRestuarantMenu(req, res) {
      const { restuarantId } = req.params;
      let { dishType, search, limit, page, sort } = req.query;

      page = page || 1;
      limit = limit || 8;

      let offset = (page - 1) * limit;
      let menu = null;
      let restuarantName = "";
      let dishes = [];
      let count = 0;

      if (restuarantId) {
         menu = await Menu.findOne({ where: { restuarantId } });
         const rest = await Restuarant.findOne({ where: { id: restuarantId } });

         if (rest) restuarantName = rest.toJSON().name;
      }

      if (menu) {
         const menuItems = await MenuItem.findAndCountAll({
            where: { menuId: menu.id },
            limit,
            offset,
         });
         count = menuItems.count;

         for (let menuItem of menuItems.rows) {
            let dish = null;

            if (dishType) {
               dish = await Dish.findOne({ where: { id: menuItem.toJSON().dishId, dishType } });
            } else {
               dish = await Dish.findOne({ where: { id: menuItem.toJSON().dishId } });
            }

            if (dish) dishes.push(dish);
         }
      }

      if (search) {
         dishes = dishes.filter((dish) =>
            dish.dataValues.name.toLowerCase().includes(search.toLowerCase())
         );
      }

      if (sort === "asc") {
         dishes.sort((a, b) => a.dataValues.price - b.dataValues.price);
      }

      if (sort === "desc") {
         dishes.sort((a, b) => b.dataValues.price - a.dataValues.price);
      }

      return res.json({
         count,
         restuarantName,
         dishes,
      });
   }

   async createMenuItem(req, res, next) {
      const { dishId, menuId } = req.body;

      try {
         const menuItem = await MenuItem.create({ dishId, menuId });
         return res.json(menuItem);
      } catch (error) {
         next(ApiError.badRequest('dishId или menuId не был найден в базе данных'));
      }
   }
}

module.exports = new MenuController();
