const express = require("express");
const bodyParder = require("body-parser");
const path = require("path");

const app = express();
const sequelize = require("./util/database"); // database connection

// Models
const ProductModel = require("./models/product");
const UserModel = require("./models/user");
const CartModel = require("./models/cart");
const CartItemModel = require("./models/cart-item");

// Contoller
const errorController = require("./controllers/error");

// Routes
const shopRoute = require("./routes/shop");
const adminRoutes = require("./routes/admin");

// Configure
app.set("view engine", "ejs"); // ejs template engine
app.set("views", "views"); // views folder to render ejs file
app.use(bodyParder.urlencoded({ extended: true })); // get data form or post request
app.use(express.static(path.join(__dirname, "public"))); // serve static files in public folder

app.use((req, res, next) => {
  UserModel.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// Response, Request
app.use(shopRoute); // routes/shop.js
app.use("/admin", adminRoutes); // routes/admin.js
app.use(errorController.get404); // 404.ejs

// Database Relationship
ProductModel.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
UserModel.hasMany(ProductModel);
UserModel.hasOne(CartModel);
CartModel.belongsTo(UserModel);
CartModel.belongsToMany(ProductModel, { through: CartItemModel });
ProductModel.belongsToMany(CartModel, { through: CartItemModel });

// creating table, name define in product model insert into
sequelize
  .sync()
  .then((res) => {
    return UserModel.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return UserModel.create({ name: "Josh", email: "josh@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
