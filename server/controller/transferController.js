const Assignment = require('../models/assignment.model'); 
const Inventory = require('../models/inventory.model'); 

exports.addTransfer = async (req, res) => {
  try {
    console.log("add transfer")
  const{ User,assignment } = req.body;
  console.log("User", User)
  console.log("assignment", assignment)

  const employeeId = User._id
  const assignmentId = assignment._id
  const assignedDate = assignment.assignedDate
  const branchId = assignment.branchId
  const currentStatus = "assigned"
  const productId = assignment.productId
  const quantity = assignment.quantity
  const returnedDate = assignment.returnedDate

  console.log("userIddddd", employeeId)
  console.log("assignmentIdddddddddd", assignmentId)
  const asssgnmntID = await Assignment.findById(assignmentId)
  asssgnmntID.currentStatus = "return_confirmed"
  await asssgnmntID.save()
  const newAssignment = new Assignment({
    employeeId,
    assignedDate,
    branchId,
    currentStatus,
    productId,
    quantity,
    returnedDate,
  });

  // Save the new assignment record to the database
  await newAssignment.save();




  } catch (error) {
    console.error(error)
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

exports.getEmpTransfers = async (req, res) => {

  try {
    const existingToken = req.headers.authorization?.split(" ")[1]; // Get the token part after "Bearer"
    console.log("getpendingHandover222", existingToken)
    if (!existingToken) {
      return res.status(401).json({ message: "Authorization token is required" });
    }

    const decodedToken = decodeToken(existingToken);
    console.log("getpendingHandover3333", decodedToken)
    const userId = decodedToken.id;
    
    console.log("getpendingHandover4444", userId)

    // Query assignment records from the database for the specific branch
    // const assignments = await Assignment.find({ employeeId : userId && currentStatus == "pending_handover" }

    const assignments = await Assignment.find({
      employeeId: userId,
      currentStatus: "pending_handover"
  })
  
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
