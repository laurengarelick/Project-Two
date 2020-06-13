// Requiring our models and passport as we've configured it
const db = require("../models");

module.exports = function(app) {
  // get route for restaurants
  app.get("/api/restaurants", (req, res) => {
    console.log(req.query);
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.Restaurant.findAll({
      where: query,
      include: [db.User]
    }).then(dbRestaurant => {
      res.json(dbRestaurant);
    });
  });

  app.get("/api/restaurants/recent", (req, res) => {
    db.Restaurant.findAll().then(dbRestaurant => {
      res.json(dbRestaurant.slice(-1));
    });
  });

  // post route for new restaurant
  app.post("/api/restaurants", (req, res) => {
    db.Restaurant.create(req.body).then(dbRestaurant => {
      res.json(dbRestaurant);
    });
  });

  // post route for new menu items
  app.post("/api/menu", (req, res) => {
    db.Menu.create(req.body).then(dbMenu => {
      res.json(dbMenu);
    });
  });

  //put route for updating restaurant info
  app.put("/api/restaurants", (req, res) => {
    db.Restaurant.update(req.body, {
      where: {
        name: req.body.name,
        address: req.body.address,
        hours: req.body.hours,
        phone: req.body.phone
      }
    }).then(dbRestaurant => {
      res.json(dbRestaurant);
    });
  });
};