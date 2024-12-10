const product = require("../models/product.model");
const Product = require("../models/product.model");
//const upload = require('../middleware/uploadMiddleware');
const inventory = require("../models/inventory.model")
const jwt = require('jsonwebtoken');
exports.addProductWithImage = async (req, res) => {
  const uploadedFile = req.file;
  try {
    const {
      name,
      description,
      category,
      subcategory,
      brand,
      model,
      quantity,
      status,
      productCode,
      price,
      username,
      branch,
      department,
    } = req.body;

    const buyingMemo = req.file ? req.file.path : '';

    const product = new Product({
      name,
      description,
      category,
      subcategory,
      brand,
      model,
      quantity,
      status,
      productCode,
      purchaseDetails: {
        price,
        buyingMemo: uploadedFile.filename,
      },
      addedBy: {
        username,
        branch,
        department,

      }
    });

    await product.save();

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};












//product home
exports.productHome = (req, res) => {
  res.send("product home")
};


//add product --POST
exports.addProductPost = async (req,res)=> {
  try{
          const newProduct = new product({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            brand: req.body.brand,
            model: req.body.model,
            quantity : req.body.quantity, 
          })
          await newProduct.save()
          .then(() => res.json(newProduct))
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



// Get all products with associated category
exports.getAllCatagory = async (req, res) => {
  try {
    const categories = await product.find().distinct('category')
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving products with category');
  }
};

exports.SubCategories = async (req, res) => {
  try {
    const SubCategories = await product.find().distinct('subcategory')
    res.json(SubCategories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving products with category');
  }
};


exports.getNextProductCode = async (req, res) => {
  try {
    const subcategory = req.query.subcategory;
    const count = await product.countDocuments({ subcategory });
    res.json({ nextCode: count + 1 });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving next product code');
  }
};


exports.getProductCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.json({ count: productCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.countPending = async (req, res) => {
  try {
    const pendingCount = await Product.countDocuments({ status: 'pending' });
    res.json({ count: pendingCount });
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

exports.getAllApprovedProducts = async (req, res) => {
  try {
    const subcategories = await product.find({ status: 'approved' })
    res.json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving products with category');
  }
};


 //const jwt = require('jsonwebtoken'); // Import jwt to decode token

// exports.getBrnanchAllApprovedProducts = async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.decode(token);

//     const userBranch = decodedToken.branchId; // Assuming branchId is stored in the token

//     // Filter products based on the user's branch
//     const products = await product.find({ status: 'approved', branchId: userBranch });

//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error retrieving products with category');
//   }
// // };


// exports.getBrnanchAllApprovedProducts = async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     if (!token) {
//       return res.status(401).send('Authorization token missing');
//     }

//     const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
//     if (!decodedToken || !decodedToken.branchId) {
//       return res.status(401).send('Invalid token');
//     }

//     const userBranch = decodedToken.branchId;

//     // Filter inventory items based on the user's branch
//     const Inventory = await inventory.find({ status: 'approved', branchId: userBranch });

//     res.json(Inventory);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error retrieving products');
//   }
// }const jwt = require('jsonwebtoken');
//const Inventory = require('../models/inventory'); // Assuming you have a model for inventory

exports.getBrnanchAllApprovedProducts = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send('Authorization token missing');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send('Authorization token missing');
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        if (!decodedToken || !decodedToken.branchId) {
            return res.status(401).send('Invalid token');
        }

        const userBranch = decodedToken.branchId;

        // Filter inventory items based on the user's branch
        const inventoryItems = await inventory.find({ status: 'approved', locationId: userBranch })
        .populate("productId");
        //const inventoryItems = await inventory.find()

        res.json(inventoryItems);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving products');
    }
};















// Get all products by id --POST
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



exports.updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      brand: req.body.brand,
      model: req.body.model,
      quantity : req.body.quantity, 
    };

    const updatedProduct = await product.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    res.send("Product updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.pendingProducts = async  (req, res) => {
  try {
    const pendingProducts = await product.find({ status: 'pending' });
    res.json(pendingProducts);
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving products with category');
  }
};

// exports.approvedProductById = async (req, res) => {
//   try {
//     const Product = await product.findByIdAndUpdate(req.params.productId, { status: 'approved' });
//         res.json(Product);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };



exports.approveProductById = async (req, res) => {
  try {
    // const { productId } = req.params;
    // const { username, branch, department } = req.body;
    // const Product = await product.findById(req.params.productId);
    const { productId } = req.params;
    const { approvedBy } = req.body; // Destructure approvedBy from the request body

    const Product = await product.findById(productId);
    if (!Product) {
      return res.status(404).send("Product record not found");
    }

    if (Product.status !== 'pending') {
      return res.status(400).send("Product record is not pending approval");
    }

    // Check if an approved product record already exists
    let approvedProduct = await product.findOne({ productCode: Product.productCode, status: 'approved' });

    if (approvedProduct) {
      // If the record exists, update the quantity and merge other relevant details if necessary
      approvedProduct.quantity += Product.quantity;

      // You can merge other fields here if needed
      await approvedProduct.save();

      // Delete the pending product record
      await product.findByIdAndDelete(product._id);
    } else {
      // If the record does not exist, update the current pending record to approved
      approvedProduct = Product;
      approvedProduct.status = 'approved';
      approvedProduct.approvedBy = {
        username: approvedBy.username,
        branch: approvedBy.branch,
        department: approvedBy.department
      };
      await approvedProduct.save();
    }

    res.json(approvedProduct);
  } catch (error) {
    res.status(400).send(error.message);
  }
};


exports.rejectProductById = async (req, res) => {
  try {
    const Product = await product.findByIdAndDelete(req.params.productId);
        res.json(Product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};



// Delete a product by name
exports.deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the product with the given name exists
    const existingProduct = await product.findById(id);
    if (!existingProduct) {
      return res.status(404).send('Product not found');
    }
console.log("object")
    // Remove the product from the database
    await product.findByIdAndDelete(id);

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

