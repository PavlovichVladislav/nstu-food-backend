const { MenuItem, Menu, Dish, Restuarant } = require("../models/models");

class MenuController {
   async getRestuarantMenu(req, res) {
      const { restuarantId } = req.params;
      let { dishType, search, limit, page } = req.query;

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
         const menuItems = await MenuItem.findAndCountAll({ where: { menuId: menu.id }, limit, offset });
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

      return res.json({
         count,
         restuarantName,
         dishes,
      });
   }

   async createMenuItem(req, res) {
      const { dishId, menuId } = req.body;

      const menuItem = await MenuItem.create({ dishId, menuId });

      return res.json(menuItem);
   }
}

module.exports = new MenuController();
