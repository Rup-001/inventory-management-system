const Location = require("../models/location.model");
const User = require("../models/user.model");

//branch location controller


exports.branchLocation = async (req, res) => {
    try{
    // Extract user input from the request body
    
   const { name, address, contactInfo } = req.body;
   console.log("3");

    const newBranch = new Location({
        name,
      address,
      contactInfo 
      // Add other user properties here
    });
    console.log("5");
    // Save the new user to the database
    await newBranch.save();
    console.log("6");
    
    res.status(201).json({ message: 'location successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error location ' });
  }
};




// 

exports.getUserWithLocation = async (req, res) => {
  const userId = req.params.userId; // Assuming the user ID is retrieved from the request URL

  try {
    const user = await User.findById(userId)
      .populate('branchId'); // Populate the 'branchId' field with data from the 'Location' collection

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user); // Send the user object with populated location details
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


//get all location
exports.AllbranchLocation = async (req, res) => {
  try {
    const Locations = await Location.find()

    res.json(Locations); // Send the user object with populated location details
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


exports.countLocation = async (req, res) => {
  try {
    const LocationCount = await Location.countDocuments();
    res.json({ count: LocationCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllUserOfLocation = async (req, res) => {
  try {
    console.log("locationbyID")
    const locationId = req.params.locationId;

    // Validate the locationId
    // if (!mongoose.Types.ObjectId.isValid(locationId)) {
    //   return res.status(400).send({ error: 'Invalid location ID' });
    // }

    // Find the location to ensure it exists
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).send({ error: 'Location not found' });
    }

    // Find all users associated with this location
    const users = await User.find({ branchId: locationId }).select('-password -tokens');

    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'An error occurred while fetching users' });
  }
};
