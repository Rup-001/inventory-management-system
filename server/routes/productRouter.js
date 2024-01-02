const express = require("express")
const productRouter = express.Router();
//require("../config/database");
const passport = require('passport');

// Update your productRouter in routes.js
const productController = require('../controller/productController');

//product home route
productRouter.get('/', passport.authenticate('jwt', { session: false }), productController.productHome)

//add product route -- post
productRouter.post('/addProduct',  passport.authenticate('jwt', { session: false }), productController.addProductPost);

// Define the route to get all products with category
productRouter.get('/products', productController.getAllProducts);

// Define the route to delete a product by name
productRouter.delete('/products/:productName', productController.deleteProductByName);

// Define the route to assign a product to an employee
productRouter.post('/assignProductToEmployee', productController.assignProductToEmployee);

// Define the route to request a product for approval
// productRouter.post('/requestProductApproval', productController.requestProductApproval);

// Define the route to update a product by name
productRouter.put('/products/updateByName', productController.updateProductByName);








//catagpory

// //catagory route -- POST
// productRouter.post('/addCategory' , productController.addCategoryPost)

// // Define the route to get all categories with products
// productRouter.get('/categories', productController.getAllCategories);

// // Define the route to get all products in the "food" category
// productRouter.get('/products/food', productController.getAllProductsInCategory);

// // Define the route to get all products based on the provided category name
// productRouter.post('/products/category', productController.getAllProductsInCategoryPost);

module.exports = productRouter;