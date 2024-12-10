const Assignment = require('../models/assignment.model'); 
const Inventory = require('../models/inventory.model'); 


exports.addAssignment = async (req, res) => {
  console.log("add assgnmnt 1");
  try {
    const { productId, employeeId, assignedDate, returnedDate, branchId, currentStatus, quantity } = req.body;
    console.log("add assgnmnt 2");

    // Validate currentStatus value
    const validStatuses = ["assigned", "returned", "in_transfer", "pending"];
    if (!validStatuses.includes(currentStatus)) {
      console.log("add assgnmnt 3");
      return res.status(400).send("Invalid currentStatus value");
    }

    if (currentStatus === "assigned") {
      console.log("add assgnmnt 4");

      // Check if the product exists in inventory and has sufficient quantity
      const inventoryRecord = await Inventory.findOne({ productId, locationId: branchId });

      if (!inventoryRecord || inventoryRecord.status !== "available") {
        console.log("add assignment 5");
        return res.status(400).send("Product not available or insufficient quantity in inventory");
      }

      if (inventoryRecord.quantity < quantity) {
        console.log("add assignment 6");
        return res.status(400).send("Insufficient product quantity in inventory");
      }

      // Create a new assignment record
      const newAssignment = new Assignment({
        productId,
        employeeId,
        assignedDate,
        returnedDate,
        branchId,
        currentStatus,
        quantity,
      });

      // Save the new assignment record to the database
      await newAssignment.save();

      // Update the inventory
      inventoryRecord.status = "assigned"; // Correctly update the status
      inventoryRecord.quantity -= quantity; // Deduct the assigned quantity
      console.log("Updated Inventory Record Before Save:", inventoryRecord);

      await inventoryRecord.save();
      console.log("add assgnmnt 7");

      // Send success response
      return res.status(201).send("Assignment added successfully");
    }
  } catch (error) {
    console.log("add assgnmnt 9");
    console.error(error)
    res.status(500).send(error.message);
  }
};





exports.requestAssignment = async (req, res) => {
  try {
    const { employeeId,productId, assignedDate, returnedDate, branchId } = req.body;

    // Get employeeId from token
    const existingToken = req.headers.authorization;
    //const decodedToken = decodeToken(existingToken);
    //const employeeId = decodedToken.id; // Assuming userId is the correct field in your token

    // Create a new assignment record with pending status
    const newAssignment = new Assignment({
      productId,
      employeeId,
      assignedDate,
      returnedDate,
      branchId,
      currentStatus: "pending", // Set status to pending
      quantity: 1, // Assuming quantity is always 1 for pending requests
    });

    // Save the new assignment record to the database
    await newAssignment.save();

    // Send a success response
    res.status(201).send("Assignment record added successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error('Error decoding token:', error);
    return {};
  }
};





//get all assignmnet --GET
exports.getAssignments = async (req, res) => {
  try {
    // Query assignment records from the database
    const assignments = await Assignment.find()
    .populate('productId')
    .populate('employeeId')
    .populate('branchId')

    // Send the assignment records as a response
    res.json(assignments);
  } catch (error) {
    // Handle errors
    res.status(500).send(error.message);
  }
};
      
//get all assignmnet --GET
exports.getAllAssignmentById = async (req, res) => {
  try {
    const assignmentId = req.params.AssignmentId;
    console.log("2nd",assignmentId )
    // Query assignment records from the database
    const assignments = await Assignment.findById(assignmentId)
    .populate('productId')
    .populate('employeeId')
    .populate('branchId')
    //console.log(asssgnmntID)

    // Send the assignment records as a response
    res.json(assignments);
  } catch (error) {
    // Handle errors
    res.status(500).send(error.message);
  }
};
exports.getPendingAssignments = async (req, res) => {
  try {
    // Query assignment records from the database
    const assignments = await Assignment.find({currentStatus: "pending"})
    .populate('productId')
    .populate('employeeId')
    .populate('branchId')

    // Send the assignment records as a response
    res.json(assignments);
  } catch (error) {
    // Handle errors
    res.status(500).send(error.message);
  }
};
exports.getAllReturnedAssignment = async (req, res) => {
  try {
    // Query assignment records from the database
    const assignments = await Assignment.find({currentStatus: "returned"})
    .populate('productId')
    .populate('employeeId')
    .populate('branchId')

    // Send the assignment records as a response
    res.json(assignments);
  } catch (error) {
    // Handle errors
    res.status(500).send(error.message);
  }
};



exports.getReturnedAssignmentByBranch = async (req, res) => {
  try {
    const existingToken = req.headers.authorization?.split(" ")[1]; // Get the token part after "Bearer"
    console.log("existingToken", existingToken)
    if (!existingToken) {
      return res.status(401).json({ message: "Authorization token is required" });
    }

    const decodedToken = decodeToken(existingToken);
  console.log("getBranchAssignments3333", decodedToken)
  const branchId = decodedToken.branchId;
  console.log("branchId", branchId)
  
  if (!branchId) {
    return res.status(403).json({ message: "Branch ID not found in token" });
  }
    // Query assignment records from the database
    const assignments = await Assignment.find({currentStatus: "returned"})
    .populate('productId')
    .populate('employeeId')
    .populate('branchId')

    // Send the assignment records as a response
    res.json(assignments);
  } catch (error) {
    // Handle errors
    res.status(500).send(error.message);
  }
};






//get all branch assignmnet --GET
exports.getBranchAssignments = async (req, res) => {
  console.log("getBranchAssignments11111")
  try {
    const existingToken = req.headers.authorization?.split(" ")[1]; // Get the token part after "Bearer"
    console.log("getBranchAssignments222", existingToken)
    if (!existingToken) {
      return res.status(401).json({ message: "Authorization token is required" });
    }

    const decodedToken = decodeToken(existingToken);
    console.log("getBranchAssignments3333", decodedToken)
    const branchId = decodedToken.branchId;
    
    console.log("getBranchAssignments4444", branchId)

    if (!branchId) {
      return res.status(403).json({ message: "Branch ID not found in token" });
    }

    // Query assignment records from the database for the specific branch
    const assignments = await Assignment.find({ branchId : branchId })
      .populate('productId')
      .populate('employeeId')
      .populate('branchId');

    // Send the assignment records as a response
    res.json(assignments);
  } catch (error) {
    // Handle errors
    res.status(500).send(error.message);
    console.error(error)
  }
  
};



//get emp all assignmnet --GET
exports.getEmpAllAssignment = async (req, res) => {
  console.log("getEmpAllAssignment")
  try {
    const existingToken = req.headers.authorization?.split(" ")[1]; // Get the token part after "Bearer"
    
    if (!existingToken) {
      return res.status(401).json({ message: "Authorization token is required" });
    }

    const decodedToken = decodeToken(existingToken);
    const id = decodedToken.id;

    if (!id) {
      return res.status(403).json({ message: "Branch ID not found in token" });
    }

    // Query assignment records from the database for the specific branch
    const assignments = await Assignment.find({ employeeId : id , currentStatus: "assigned" })
      .populate('productId')
      .populate('employeeId')
      .populate('branchId');

    // Send the assignment records as a response
    res.json(assignments);
  } catch (error) {
    // Handle errors
    res.status(500).send(error.message);
  }
};


exports.postReturnedAssignments = async (req, res) => {
  try {
    const { assignmentId } = req.params; // Assignment ID passed as a parameter
    const { quantity } = req.body; // Quantity being returned
    
    // Find the assignment by ID
    const assignment = await Assignment.findById( assignmentId);

    if (!assignment) {
      return res.status(404).send("Assignment not found");
    }

    // Ensure the assignment is in a valid state for return
    if (assignment.currentStatus !== "assigned") {
      return res.status(400).send("Assignment is not in a valid state for return");
    }

    // Update the inventory
    const inventoryRecord = await Inventory.findOne({
      productId: assignment.productId,
      locationId: assignment.branchId,
    });

    if (inventoryRecord) {
      inventoryRecord.quantity += quantity; // Add the returned quantity
      await inventoryRecord.save();
    } else {
      // If no inventory record exists, create a new one
      const newInventoryRecord = new Inventory({
        productId: assignment.productId,
        locationId: assignment.branchId,
        quantity : 1,
      });
      await newInventoryRecord.save();
    }

    // Update the assignment record
    assignment.currentStatus = "returned";
    assignment.returnedDate = new Date(); // Set the returned date
    await assignment.save();

    // Send a success response
    res.status(200).json({ message: "Assignment returned successfully and inventory updated" });
    // return res.status(200).json({ message: "Assignment returned successfully and inventory updated" });

  } catch (error) {
    // Handle errors
    res.status(500).send(error.message);
  }
};

exports.ApprovePendingAssignments = async (req, res) => {
  try {
console.log("111")
    const { action } = req.body;
    const quantity = 1
    console.log("Body:", req.body);

     const assignmentId = req.params.AssignmentId;
     console.log("2nd",assignmentId )

    if (action === "approve") {
      console.log("2222")
      const asssgnmntID = await Assignment.findById(assignmentId)

      console.log(asssgnmntID)
      console.log(asssgnmntID.productId)

      const inventoryRecord = await Inventory.findOne({ productId: asssgnmntID.productId, locationId: asssgnmntID.branchId });
      console.log("inventoryRecord", inventoryRecord)
      //const inventoryRecord = await Inventory.findOne({ productId, locationId: branchId });
      // Update the inventory
      inventoryRecord.quantity -= quantity;
      console.log("2222232====3333")
      await inventoryRecord.save();
      
        console.log("3333")

        asssgnmntID.currentStatus = "assigned"
        await asssgnmntID.save()
       return res.status(200).json({ message: `Assignment ${action} successfully` });

      
    } else if (action === "reject"){
      console.log("reject1111")
      const asssgnmntID = await Assignment.findByIdAndDelete(assignmentId)
     // await asssgnmntID.remove();
      console.log("reject22222")

      return res.status(200).json({ message: `Assignment ${action} successfully` });


    }

    else if (action === "returned"){

      try {
        const inventoryRecord = await Inventory.findOne({productId : assignmentId})
        console.log("inventoryRecord", inventoryRecord)
        inventoryRecord.quantity += quantity;
        inventoryRecord.status = "available";
      console.log("2222232====3333")
      await inventoryRecord.save();
      const asssgnmntID = await Assignment.findOne({productId : assignmentId || currentStatus == "returned"})
      asssgnmntID.currentStatus = "return_confirmed"
      await asssgnmntID.save()
      console.log("returned")

    }
    catch(error){
      console.error(error)

    }
  }
    else if (action === "reject_return"){

      try {
        console.log("assignmentId", assignmentId)
      // const asssgnmntID = await Assignment.findOne({currentStatus : "returned"})
      //const asssgnmntID = await Assignment.findOne({productId : assignmentId})
      const asssgnmntID = await Assignment.findOne({
        $or: [
          { productId: assignmentId },
          { currentStatus: "returned" },
        ],
      });
      console.log("asssgnmntID", asssgnmntID)
      asssgnmntID.currentStatus = "assigned"
      //asssgnmntID.currentStatus = "assigned"
      await asssgnmntID.save()
      console.log("reject_return")

    }
    catch(error){
      console.error(error)

    }
  }
    
    else {
      console.log("eerror else block")
      console.error(`Invalid action: ${action}`);

      // return res.status(400).json({ error: "Invalid action specified" });
      
    }

    
   
  } catch (error) {
    console.log("eerror catch block")
    // Handle errors
    res.status(500).send(error.message);
  }
};

// Controller to handle approval of returned assignments
exports.approveRequest = async (req, res) => {
  try {
    const { action } = req.body;
    const assignmentId = req.params.assignmentId;

    // Find the assignment by ID
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).send("Assignment not found");

    if (action === "approve") {
      // Update the inventory
      const inventoryRecord = await Inventory.findOne({ productId: assignment.productId, locationId: assignment.branchId });
      if (inventoryRecord) {
        inventoryRecord.quantity += assignment.quantity;
        inventoryRecord.status = "approved";
        await inventoryRecord.save();
      } else {
        const newInventoryRecord = new Inventory({
          productId: assignment.productId,
          locationId: assignment.branchId,
          quantity: assignment.quantity,
          status: "approved",
        });
        await newInventoryRecord.save();
      }

      // Remove the assignment from the assignments collection
      await Assignment.findByIdAndDelete(assignmentId);
    } else if (action === "reject") {
      // Update the assignment's status to assigned again
      assignment.currentStatus = "assigned";
      await assignment.save();
    }

    res.status(200).json({ message: `Assignment ${action}d successfully` });
  } catch (error) {
    console.error(`Error ${action} assignment:`, error);
    res.status(500).send(`Error ${action} assignment`);
  }
};




exports.getProductRequests = async (req, res) => {
  try {
    const requests = await Inventory.find({ status: 'pending' }).populate('productId employeeId', 'name');
    res.json(requests);
  } catch (error) {
    res.status(500).send(error.message);
  }
}




exports.rejectRequest = async (req, res) => {
  try {
    const inventoryRequest = await Inventory.findById(req.params.requestId);
    if (!inventoryRequest) return res.status(404).send('Request not found');
    if (inventoryRequest.status !== 'pending') return res.status(400).send('Request is not pending approval');

    await inventoryRequest.remove();
    res.json({ message: 'Request rejected successfully.' });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
