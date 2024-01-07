const express = require("express")
const productRouter = express.Router();
//require("../config/database");
const passport = require('passport');

// Update your productRouter in routes.js
const productController = require('../controller/productController');

//product home route
productRouter.get('/', passport.authenticate('jwt', { session: false }), productController.productHome)




const multer = require("multer");
const path = require('path');


//define storage

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null, path.join(__dirname, '../uploads/postImage'),function(error,success){
      if(error){
        console.log(error)
      }
    })

  },
  filename:function(req,file,cb){
    const name = Date.now()+'-'+file.originalname;
    cb(null,name,function(error,success){
      if(error){
        console.log(error)
      }
    })

  }
})

const upload = multer({storage: storage})



//add product route -- post
productRouter.post('/addProduct', upload.single('image'), passport.authenticate('jwt', { session: false }), productController.addProductPost);

// Define the route to get all products with category
productRouter.get('/products', productController.getAllProducts);

// get products by id
productRouter.get('/products/:id', productController.getProductsById);

// Define the route to delete a product by name
productRouter.delete('/products/:name', productController.deleteProductByName);

// Define the route to assign a product to an employee
productRouter.post('/assignProductToEmployee', productController.assignProductToEmployee);

// Define the route to request a product for approval
// productRouter.post('/requestProductApproval', productController.requestProductApproval);

// Define the route to update a product by name
productRouter.put('/products/updateProduct', upload.single('image'), productController.updateProductByName);








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