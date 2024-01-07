const product = require("../models/product.model");
const category = require("../models/category.model");
// Modify your Multer configuration in product.controller.js






// const Storage = multer.diskStorage({
//   destination: "uploads",
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//   }
// })

// const upload = multer({
//   storage : Storage
// }).single('testImage')



//product home
exports.productHome = (req, res) => {
  try {
      // Check if the authenticated user's role is admin or employee
      if (req.user && req.user.role.toLowerCase() === 'admin' || 'employee' ) {
           res.send({
              success: true,
              message: `Product Home`,
          });
      } else {
          return res.status(403).json({ message: 'Permission Denied: Access restricted.' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error during product retrieval.' });
  }
};

exports.addProductPost = async (req,res)=> {
  try{
          const newProduct = new product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            manufacturer: req.body.manufacturer,
            image: req.file.filename,
            createdAt: req.body.createdAt,  
          })
          await newProduct.save()
          .then(() => res.send("image uploaded"))
          .catch((err) => console.log(err)); 
  }
  catch(error){
    res.status(400).send(error.message)
  }
}



// Get all products with associated category
exports.getAllProducts = async (req, res) => {
  try {
    const products = await product.find()
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving products with category');
  }
};


// Get all products by name
exports.getProductsById =  (req, res) => {
  try {
    const id = req.params.id
     product.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving products with category');
  }
};


// Update a product by searching for it based on the productName
// exports.updateProductByName = async (req, res) => {
//   try {
//     const { productName, updatedData } = req.body;

//     // Use findOneAndUpdate
//     const updatedProduct = await product.findOneAndUpdate(
//       { productName },
//       updatedData,
//       { new: true, runValidators: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).send('Product not found');
//     }

//     res.json(updatedProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error updating the product');
//   }
// };



exports.updateProductByName = async (req, res) => {
  try {
    if(req.file!==undefined){
      var id = req.body.id;
      var name = req.body.name;
      var description = req.body.description;
      var price = req.body.price;
      var quantity = req.body.quantity;
      var manufacturer = req.body.manufacturer;
      var filename = req.file.filename;

      await product.findByIdAndUpdate({_id:id}, {$set:
      {
        name:name,
        description:description,
        price:price,
        quantity:quantity,
        manufacturer:manufacturer,
        image:filename
      }
      } )
      res.status(200).send({success:true, msg:'updated successfully'})
    }
    else{
      var id = req.body.id;
      var name = req.body.name;
      var description = req.body.description;
      var price = req.body.price;
      var quantity = req.body.quantity;
      var manufacturer = req.body.manufacturer;

      await product.findByIdAndUpdate({_id:id}, {$set:
      {
        name:name,
        description:description,
        price:price,
        quantity:quantity,
        manufacturer:manufacturer
      }
      } )
      res.status(200).send({success:true, msg:'updated successfully'})

    }
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating the product');
  }
};



// Delete a product by name
exports.deleteProductByName = async (req, res) => {
  try {
    const  name  = req.params.name;

    // Check if the product with the given name exists
    const existingProduct = await product.findOne({ name: name });
    if (!existingProduct) {
      return res.status(404).send('Product not found');
    }
console.log("object")
    // Remove the product from the database
    await product.deleteOne({name: name });

    res.json({ message: 'Product deleted successfully' });
  
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting the product');
  }
};










//i think complexe



// Assign a product to an employee (admin only)
exports.assignProductToEmployee = async (req, res) => {
  try {
    const { adminId, employeeId, productId } = req.body;

    // Check if the requester is an admin
    const admin = await User.findByName(username);
    if (!admin || admin.role !== 'admin') {
      return res.status(403).send('Unauthorized: Only admins can assign products.');
    }

    // Check if the employee exists
    const employee = await User.findById(employeeId);
    if (!employee || employee.role !== 'employee') {
      return res.status(404).send('Employee not found');
    }

    // Create an assignment
    const assignment = new Assignment({
      user: employeeId,
      product: productId,
    });

    // Save the assignment to the database
    await assignment.save();

    res.json({ message: 'Product assigned to employee successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error assigning product to employee');
  }
};

