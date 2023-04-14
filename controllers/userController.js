const ApiError = require("../apiError/ApiError");

class UserController {
   async registration(req, res) {}

   async login(req, res) {}

   async check(req, res, next) {
      const { id } = req.query;

      if (!id) {
         return next(ApiError.badRequest("Не указан id!"));
      }
      return res.status(200).json("ok!");
   }
}

module.exports = new UserController();
