<<<<<<< HEAD
// Requiring our models and passport as we've configured it
const db = require("../models");

module.exports = function(app) {
  // get route for the entire menu
  app.get("/api/menu", (req, res) => {
    const query = {};
    if (req.query.restaurant_id) {
      query.RestaurantId = req.query.restaurant_id;
    }
    db.Menu.findAll({
      where: query,
      include: [db.Restaurant]
    }).then(dbMenu => {
      res.json(dbMenu);
    });
  });

  // post route for new menu items
  app.post("/api/menu", (req, res) => {
    console.log(req.body);
    db.Menu.create(req.body).then(dbMenu => {
      res.json(dbMenu);
    });
  });

  // put route for updating menu info
  app.put("/api/menu", (req, res) => {
    db.Menu.update(req.body, {
      where: {
        item: req.body.item,
        description: req.body.description,
        price: req.body.price
      }
    }).then(dbMenu => {
      res.json(dbMenu);
    });
  });

  //delete route for getting rid of rows in the menu table
  app.delete("/api/menu/:id", (req, res) => {
    db.Menu.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbMenu => {
      res.json(dbMenu);
    });
  });
};
=======
// Requiring our models and passport as we've configured it
const db = require("../models");

module.exports = function(app) {
  // get route for the entire menu
  app.get("/api/menu", (req, res) => {
    const query = {};
    if (req.query.restaurant_id) {
      query.RestaurantId = req.query.restaurant_id;
    }
    db.Menu.findAll({
      where: query,
      include: [db.Restaurant]
    }).then(dbMenu => {
      res.json(dbMenu);
    });
  });

  // post route for new menu items
  app.post("/api/menu", (req, res) => {
    db.Menu.create(req.body).then(dbMenu => {
      db.Menu.findAll({
        where: { RestaurantId: dbMenu.RestaurantId }
      })
        .then(menu => res.json(menu))
        .catch(err => console.log(err));
    });
  });

  // put route for updating menu info
  app.put("/api/menu", (req, res) => {
    db.Menu.update(req.body, {
      where: {
        item: req.body.item,
        description: req.body.description,
        price: req.body.price
      }
    }).then(dbMenu => {
      res.json(dbMenu);
    });
  });

  //delete route for getting rid of rows in the menu table
  app.delete("/api/menu/:id", (req, res) => {
    db.Menu.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbMenu => {
      res.json(dbMenu);
    });
  });
};
>>>>>>> 237f47c08a41c602e9ac757a163177b93ba5fcdc
