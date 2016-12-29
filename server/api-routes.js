var path = require('path'),
    Item = require('./models/item-model'),
    Category = require('./models/category-model'),
    fs = require('fs');

module.exports = function(app) {
    
    app.route('/api/items')

        .get(function (req, res) {
            Item.find({}, function (err, items) {
                if (err)
                    res.send(err);
                res.json(items);
            });
        })

        .post(function (req, res) {
            Item.create(req.body, function (err, result) {
                if (err)
                    res.send(err);
                res.json(result);
            });
        });

    app.route('/api/categories')

        .get(function (req, res) {
            Category.find({}, function (err, categories) {
                if (err)
                    res.send(err);
                res.json(categories);
            });
        })

        .post(function (req, res) {
            Category.create(req.body, function (err, result) {
                if (err)
                    res.send(err);
                res.json(result);
            });
        });

}
