const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../apiError/ApiError");

const generateJwt = (id, email, role) => {
   return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
      expiresIn: "24h",
   });
};

class UserController {
   async registration(req, res, next) {
      const { email, password, role } = req.body;

      console.log(req.params);
      console.log(email, password);

      if (!email || !password) {
         return next(ApiError.badRequest("Некорректный email или password"));
      }

      const candidate = await User.findOne({ where: { email } });

      if (candidate) {
         return next(ApiError.badRequest("Пользователь с таким email уже зарегистрирован"));
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPassword });
      const token = generateJwt(user.id, email, user.role);

      return res.json(token);
   }

   async login(req, res, next) {
      const {email, password} = req.body;
      const user = await User.findOne({where: {email}});

      if (!user) {
         return next(ApiError.badRequest('Пользователь с таким именем не найден'))
      }

      let isEqualPassword = bcrypt.compareSync(password, user.password);

      if (!isEqualPassword) {
         return next(ApiError.badRequest('Указан неверный пароль'))
      }

      const token = generateJwt(user.id, user.email, user.role);
      
      return res.json(token);
   }

   async check(req, res, next) {
      const { id } = req.query;

      if (!id) {
         return next(ApiError.badRequest("Не указан id!"));
      }
      return res.status(200).json("ok!");
   }
}

module.exports = new UserController();
