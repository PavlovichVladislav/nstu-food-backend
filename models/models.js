const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   email: { type: DataTypes.STRING, unique: true },
   password: { type: DataTypes.STRING },
   role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Restuarant = sequelize.define("restuarant", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, allowNull: false },
   address: { type: DataTypes.STRING, allowNull: false },
   img: { type: DataTypes.STRING, allowNull: false },
   location: { type: DataTypes.STRING, allowNull: false },
   schedule: { type: DataTypes.STRING, allowNull: false },
   rating: { type: DataTypes.INTEGER, defaultValue: 0 },
   reviewsCont: { type: DataTypes.INTEGER, defaultValue: 0 },
   campus: { type: DataTypes.INTEGER, allowNull: false },
});

const Menu = sequelize.define("menu", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const MenuItem = sequelize.define("menu_item", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Dish = sequelize.define("dish", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, allowNull: false },
   img: { type: DataTypes.STRING, allowNull: false },
   price: { type: DataTypes.INTEGER, defaultValue: 0 },
   dishType: { type: DataTypes.STRING }
});

const Rating = sequelize.define("rating", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   rate: { type: DataTypes.INTEGER, allowNull: false },
});

const Review = sequelize.define("review", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   review: { type: DataTypes.STRING, allowNull: false },
});

Restuarant.hasOne(Menu);
Menu.belongsTo(Restuarant);

Menu.hasMany(MenuItem);
MenuItem.belongsTo(Menu);

Dish.hasMany(MenuItem);
MenuItem.belongsTo(Dish);

MenuItem.hasMany(Dish);
Dish.belongsTo(MenuItem);

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Restuarant.hasMany(Rating);
Rating.belongsTo(Restuarant);

Restuarant.hasMany(Review);
Review.belongsTo(Restuarant);

module.exports = {
   Restuarant,
   Menu,
   MenuItem,
   Dish,
   Rating,
   Review,
   User,
};
