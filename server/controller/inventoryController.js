const Inventory = require('../models/inventory.model');
const Product = require('../models/product.model');


exports.addInventory = async (req, res) => {
  try {
    const { productId, locationId, quantity, username, branch, department } = req.body;

    //Validate the request body
    // if (!productId || !locationId || quantity == null || !username || !branch || !department) {
    //   return res.status(400).send("All fields are required: productId, locationId, quantity, username, branch, department");
    // }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    if (quantity > product.quantity) {
      return res.status(400).send("Insufficient product quantity available");
    }

    // Create a new inventory record with 'pending' status
    const newInventory = new Inventory({
      productId,
      locationId,
      quantity,
      status: 'pending',
      addedBy: {
        username,
        branch,
        department,
      },
    });

    // Save the new inventory record to the database
    await newInventory.save();

    // Send a success response
    res.status(201).send("Inventory record added successfully. Pending approval from head admin.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.approveInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.inventoryId);

    if (!inventory) {
      return res.status(404).send("Inventory record not found");
    }

    if (inventory.status !== 'pending') {
      return res.status(400).send("Inventory record is not pending approval");
    }

    const product = await Product.findById(inventory.productId);

    if (!product) {
      return res.status(404).send("Associated product not found");
    }

    // if (inventory.quantity >= product.quantity) {
    //   return res.status(400).send("Insufficient product quantity available");
    // }

    const { productId, locationId, quantity } = inventory;

    console.log("first", productId, "second",locationId, "3rd" ,quantity )

    // Check if an approved inventory record already exists for this product and location
    let approvedInventory = await Inventory.findOne({ productId, locationId, status: 'approved' });

    if (approvedInventory) {
      // If the record exists, update the quantity
      approvedInventory.quantity += parseInt(quantity);
      await approvedInventory.save();
    } else {
      // If the record does not exist, update the current pending record to approved
      approvedInventory = inventory;
      approvedInventory.status = 'available';
      await approvedInventory.save();
    }

    // Update the product quantity
    product.quantity -= parseInt(quantity);
    await product.save();

    // Delete the pending inventory record if it was separate from the approved one
    if (approvedInventory._id !== inventory._id) {
      await Inventory.findByIdAndDelete(inventory._id);
    }

    res.json(approvedInventory);
  } catch (error) {
    res.status(400).send(error.message);
  }
};


exports.rejectInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.inventoryId);
    res.json(inventory);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getPendingInventory = async (req, res) => {
  try {
    const pendingInventory = await Inventory.find({ status: 'pending' }).populate('productId').populate('locationId');
    res.json(pendingInventory);
  } catch (error) {
    res.status(500).send(error.message);
  }
};



// Get all products with associated category
exports.getAllInventory = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find({ status: 'available' })
      .populate('productId')
      .populate('locationId')
      // .populate({
      //   path: 'branchId',
      //   populate: {
      //     path: 'users',
      //     model: 'User'
      //   }
      // });
    res.json(inventoryItems);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving products with category');
  }
};


exports.getInventoryByLocation = async (req, res) => {
  const locationId = req.params.locationId; // Assuming locationId is passed as a route parameter

  try {
      const inventory = await Inventory.find({ locationId , status: 'available'})
          .populate('productId')
          .populate('locationId');

      if (!inventory) {
          return res.status(404).json({ message: 'Inventory not found for the specified location' });
      }

      res.json(inventory);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};