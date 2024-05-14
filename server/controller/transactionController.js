const Transaction = require('../models/transaction.model')
const User = require("../models/user.model")
const Product = require("../models/product.model")


exports.transactionHome = async (req, res) => { 
    res.send("abc")
    console.log("object");
  };



  exports.requestProduct = async (req, res) => {
    try {
      // Find the existing user by username
      let existingUser = await User.findOne({ username: req.body.username });
      console.log("username :", existingUser);
  
      if (!existingUser) {
        return res.status(404).send("User not found");
      }
  
      // Find the existing product by name (assuming product name is unique, adjust as needed)
      let existingProduct = await Product.findOne({ name: req.body.product });
      console.log("product : ", existingProduct);
  
      if (!existingProduct) {
        return res.status(404).send("Product not found");
      }

      if (req.body.quantity > existingProduct.quantity) {
        return res.status(400).send("Insufficient product quantity");
      }
  
      // Create a new Transaction
      const newTransaction = new Transaction({
        username: existingUser._id,
        product: existingProduct._id,
        quantity: req.body.quantity,
        type: 'request', // Assuming you want to hardcode the type as 'request'
        specification: req.body.specification,
        remarks: req.body.remarks,
        requestStatus: 'pending', // Assuming you want to set the requestStatus as 'pending' initially
        timestamp: req.body.timestamp,
      });
  
      // Populate the user and product fields
      await newTransaction.populate('username product')
  
      // Save the newTransaction
      await newTransaction.save();
  
      res.status(200).send("Transaction created successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  };


//admin view all the request product with employee and product details

exports.adminViewRequestedPrpoduct = async (req, res) => {
  try {
    // Find all transactions and populate the 'username' and 'product' fields
    const requestedProducts = await Transaction.find({requestStatus : "pending"})
      .populate('username', 'fullName email phoneNumber' ) // Specify the user details you want to populate
      .populate('product', 'name description price quantity manufacturer'); // Specify the product details you want to populate

    if (!requestedProducts || requestedProducts.length === 0) {
      return res.status(404).send('No requested products found');
    }

    // Map the transactions to include populated user and product details
    const transactionsWithDetails = requestedProducts.map((transaction) => {
      return {
        _id: transaction._id,
        username: transaction.username, // This will now be the populated user details
        product: transaction.product, // This will now be the populated product details
        quantity: transaction.quantity,
        type: transaction.type,
        specification: transaction.specification,
        remarks: transaction.remarks,
        requestStatus: transaction.requestStatus,
        returnStatus: transaction.returnStatus,
        timestamp: transaction.timestamp,
      };
    });

    res.status(200).json(transactionsWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};



//admin approve the request

exports.adminApproveRequest = async (req, res) => {
  const { _id, requestStatus } = req.body;

  try {
    const transaction = await Transaction.findOne({ _id }).populate('product');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Check if the requested quantity is greater than the available quantity
    const updatedQuantity = transaction.product.quantity - req.body.quantity;

    if (updatedQuantity < 0) {
      return res.status(400).json({ error: 'Insufficient quantity for approval' });
    }

    // Update the transaction status
    transaction.requestStatus = requestStatus;

    // Save the updated transaction
    await transaction.save();

    // Update the product quantity
    transaction.product.quantity = updatedQuantity;
    await transaction.product.save();

    return res.json({ message: `Transaction ${requestStatus ? 'approved' : 'rejected'}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing approval' });
  }
};


exports.handoverProduct = async (req, res) => {
  try {
      const { fromUserId, toUserId, productId, quantity } = req.body;

      // Find the user handing over the product
      const fromUser = await User.findById(fromUserId);
      if (!fromUser) {
          return res.status(404).json({ message: 'User handing over the product not found' });
      }

      // Check if fromUser has products and if productId exists in the products list
      if (!fromUser.products || !fromUser.products.length) {
          return res.status(400).json({ message: 'User does not have any products to hand over' });
      }

      const productIndex = fromUser.products.findIndex(item => item.product.equals(productId));
      if (productIndex === -1 || fromUser.products[productIndex].quantity < quantity) {
          return res.status(400).json({ message: 'Insufficient quantity to hand over' });
      }

      // Find the user receiving the product
      const toUser = await User.findById(toUserId);
      if (!toUser) {
          return res.status(404).json({ message: 'User receiving the product not found' });
      }

      // Remove the product from the handing-over user's list
      fromUser.products[productIndex].quantity -= quantity;
      if (fromUser.products[productIndex].quantity === 0) {
          fromUser.products.splice(productIndex, 1);
      }
      await fromUser.save();

      // Add the product to the receiving user's list
      const productInToUser = toUser.products.find(item => item.product.equals(productId));
      if (productInToUser) {
          productInToUser.quantity += quantity;
      } else {
          toUser.products.push({ product: productId, quantity });
      }
      await toUser.save();

      res.json({ message: 'Product handed over successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};
