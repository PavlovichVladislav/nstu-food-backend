const { MenuItem, Menu, Dish } = require("../models/models");

class MenuController {
   async getRestuarantMenu(req, res) {
      const { restuarantId } = req.params;
      let menu = null;

      if (restuarantId) {
         menu = await Menu.findOne({ where: { restuarantId } });
      }

      if (menu) {
         const restuarantDishes = [];
         const menuItems = await MenuItem.findAll({ where: { menuId: menu.id } });

         for (let menuItem of menuItems) {
            const dish = await Dish.findOne({ where: { id: menuItem.dataValues.dishId } });

            restuarantDishes.push(dish);
         }

         return res.json(restuarantDishes);
      }

      return res.json([]);
   }

   async create(req, res) {
      const { dishId, menuId } = req.body;

      const menuItem = await MenuItem.create({ dishId, menuId });

      return res.json(menuItem);
   }
}

module.exports = new MenuController();
