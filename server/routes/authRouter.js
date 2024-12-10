const express = require("express");
const Router = express.Router();
const authController = require("../controller/authController");
const passport = require('passport');
require('../config/passport');
//const jwt = require('jsonwebtoken');

const app = express();
app.use(passport.initialize());

const multer = require("multer");
const path = require('path');
const isAdmin = require('../middleware/isAdmin');
const isBranchAdmin = require('../middleware/isBranchAdmin')

//define storage
const storage = multer.diskStorage({
    destination:function(req,file,cb){
      cb(null, path.join(__dirname, '../uploads/profileImage'),function(error,success){
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



//home route
Router.get('/', authController.index )

// Register route - POST
Router.post("/register", upload.single('profileImage'), authController.registerUser);

// All user by id route - GET
Router.get("/AllUser/:id",  authController.userById);

// All user - GET
Router.get("/AllUser", authController.AllUser);

Router.get("/count", authController.getUserCount );

Router.get("/pendingCount", authController.pendingCount );

Router.get("/pendingUser", authController.pendingUser );

//Router.get('/countProd', productController.getProductCount);

// update userinfo route - put
Router.put("/registerUpdateUser/:id", upload.single('profileImage'), authController.registerUpdateUser);

// Delete user route - DELETE (highly restricted)
Router.delete("/deleteUsers/:id", isAdmin, authController.deleteUser);


// Login route - POST
Router.post("/login", authController.loginUser);


Router.get('/pending/:branchId', isBranchAdmin, authController.getPendingUsersByBranch);











module.exports = Router;
