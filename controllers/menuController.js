const { MenuItem, Menu, Dish } = require("../models/models");

class MenuController {
   async getRestuarantMenu(req, res) {
      const { restuarantId } = req.params;

      if (restuarantId) {
         const menu = await Menu.findOne({where: { restuarantId }});
         const menuId = menu.id;
         const menuItems = await MenuItem.findAll({where: {menuId}});

         return res.json(menuItems);
      }
   }

   async create(req, res) {
      const { dishId, menuId } = req.body;

      const menuItem = await MenuItem.create({dishId, menuId});

      return res.json(menuItem);
   } 
}

module.exports = new MenuController();
