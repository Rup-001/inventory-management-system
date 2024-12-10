const express = require("express");
const assignmnetRouter = express.Router();
const assignmentController = require("../controller/assignmentController");

// const app = express();
// app.use(passport.initialize());

const isAdmin = require('../middleware/isAdmin');

const verifyToken = require('../middleware/verifyToken');


assignmnetRouter.post("/addAssignment",  assignmentController.addAssignment);

assignmnetRouter.post("/requestAssignment",  assignmentController.requestAssignment);

assignmnetRouter.get("/getAllAssignment",  assignmentController.getAssignments);

assignmnetRouter.get("/getAllAssignmentById/:AssignmentId",  assignmentController.getAllAssignmentById);

assignmnetRouter.get("/getReturnedAssignmentByBranch",  assignmentController.getReturnedAssignmentByBranch);

assignmnetRouter.get("/getAllReturnedAssignment",  assignmentController.getAllReturnedAssignment);

assignmnetRouter.get("/getPendingAssignment",  assignmentController.getPendingAssignments);

assignmnetRouter.put("/ApprovePendingAssignment/:AssignmentId",  assignmentController.ApprovePendingAssignments);

assignmnetRouter.get("/getBranchAllAssignment",  assignmentController.getBranchAssignments);

assignmnetRouter.get("/getEmpAllAssignment",  assignmentController.getEmpAllAssignment);

assignmnetRouter.post("/returnedAssignments/:assignmentId",  assignmentController.postReturnedAssignments);

assignmnetRouter.get("/admin/productRequests", assignmentController.getProductRequests);

assignmnetRouter.put("/admin/approveRequest/:assignmentId",  assignmentController.approveRequest);

assignmnetRouter.post("/admin/rejectRequest/:requestId",  assignmentController.rejectRequest);

module.exports = assignmnetRouter;