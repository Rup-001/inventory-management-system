const express = require("express")
const productRouter = express.Router();
//require("../config/database");
const passport = require('passport');
require('../config/passport');
// Update your productRouter in routes.js
const productController = require('../controller/productController');
const isAdmin = require('../middleware/isAdmin');
const isAdminOrEmployee = require('../middleware/isAdminOrEmployee');
//const upload = require('../middleware/uploadMiddleware');


const app = express();
app.use(passport.initialize());

const multer = require("multer");
const path = require('path');


/// Define storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/buyingMemos'), function (error) {
      if (error) {
        console.log(error);
      }
    });
  },
  filename:function(req,file,cb){
    const name = Date.now()+'-'+file.originalname;
    cb(null,name,function(error,success){
      if(error){
        console.log(error)
      }
    })

  }
});

const upload = multer({ storage: storage });


//product home route
productRouter.get('/', isAdminOrEmployee, productController.productHome)

//add product route -- post
// productRouter.post('/addProduct', isAdmin, productController.addProductPost);
// productRouter.post('/addProductWithImage', upload.single('profileImage'),  productController.addProductWithImage);
productRouter.post('/addProductWithImage', upload.single('purchaseDetails.0.buyingMemo'), productController.addProductWithImage);

// Define the route to get all products with category
productRouter.get('/AllProducts', isAdmin, productController.getAllProducts);
productRouter.get('/AllApprovedProducts',  productController.getAllApprovedProducts);
productRouter.get('/BranchAllApprovedProducts',  productController.getBrnanchAllApprovedProducts);

// get products by id
productRouter.get('/AllProducts/:id',  productController.getProductsById);
productRouter.get('/pending',  productController.pendingProducts);

// Define the route to update a product by name
productRouter.put('/updateProduct/:id',   productController.updateProductById);
productRouter.put('/approve/:productId',  productController.approveProductById);
productRouter.delete('/reject/:productId',  productController.rejectProductById);

// Define the route to delete a product by name
productRouter.delete('/deleteProduct/:id', isAdmin, productController.deleteProductById);

// Define the route to assign a product to an employee
//productRouter.post('/assignProductToEmployee', productController.assignProductToEmployee);

// Define the route to request a product for approval
// productRouter.post('/requestProductApproval', productController.requestProductApproval);

productRouter.get('/categories', productController.getAllCatagory);
productRouter.get('/SubCategories', productController.SubCategories);

productRouter.get('/nextProductCode', productController.getNextProductCode);


productRouter.get('/count', productController.getProductCount);
productRouter.get('/countPending', productController.countPending);





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