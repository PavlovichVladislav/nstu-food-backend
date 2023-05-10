const { MenuItem, Menu, Dish, Restuarant } = require("../models/models");

class MenuController {
   async getRestuarantMenu(req, res) {
      const { restuarantId } = req.params;
      let menu = null;
      let restuarantName = "";
      const dishes = [];

      if (restuarantId) {
         menu = await Menu.findOne({ where: { restuarantId } });
         const rest = await Restuarant.findOne({ where: { id: restuarantId } });

         if (rest) restuarantName = rest.toJSON().name;
      }

      if (menu) {
         const menuItems = await MenuItem.findAll({ where: { menuId: menu.id } });

         for (let menuItem of menuItems) {
            const dish = await Dish.findOne({ where: { id: menuItem.toJSON().dishId } });

            dishes.push(dish);
         }
      }

      return res.json({
         restuarantName,
         dishes,
      });
   }

   async create(req, res) {
      const { dishId, menuId } = req.body;

      const menuItem = await MenuItem.create({ dishId, menuId });

      return res.json(menuItem);
   }
}

module.exports = new MenuController();
