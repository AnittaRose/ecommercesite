const mongoose = require('mongoose');

let CategorySchema = new mongoose.Schema({
    Category: {
        type: String
    }
});

const Categories =  mongoose.model('Category', CategorySchema);

module.exports = Categories;