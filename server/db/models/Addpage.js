const mongoose = require('mongoose');


let AddProductsSchema = new mongoose.Schema({
    Title: {
        type: String
    },
    Description: {
        type: String
    },
    Category:{
        type: mongoose.Schema.Types.ObjectId, // Reference to another schema
        ref: 'Category' // Refers to the 'UserType' model
    },
    Price: {
        type: String
    },
    Rating: {
        type: String
    },
    Brand: {
        type: String
    },
    Images: {
        type: String
    }
});

const AddProduct =  mongoose.model('AddProduct', AddProductsSchema);

module.exports = AddProduct;