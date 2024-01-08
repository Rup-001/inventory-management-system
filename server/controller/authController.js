const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// const passport = require('../config/passport');
const User = require("../models/user.model");

// const saltRounds = 10;

//home controller
exports.index = (req,res)=>{
        res.render("index");
}

//register controller -- GET
exports.getRegisterUser = (req, res) => {
       res.render("register");
}

//register controller -- POST
exports.registerUser = async (req, res) => {
    try{
    // Extract user input from the request body
    
   const { username, password, email, role, department, fullName, phoneNumber, address } = req.body;
   console.log("3");
   if (!password) {
    return res.status(400).json({ message: 'Password is required' });
}
    // Check if the username or email is already taken
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email is already taken' });
    }
    console.log("33");
    // Hash the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    console.log("4");
    // Create a new user based on the User schema
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role,
      department,
      fullName,
      phoneNumber,
      address,
      approved: false, 
      // Add other user properties here
    });
    console.log("5");
    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log("6");
    
    // Omit the hashed password from the response for security
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;

    res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

//login controller -- GET
exports.GetloginUser = (req, res)=> {
    res.render("login")
}

//login controller -- POST
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username});

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "User not found",
            });
        }

        const userNotApproved = await User.findOne({ username: req.body.username , isApproved : true});

        if (!userNotApproved) {
            return res.status(401).send({
                success: false,
                message: "User not approved",
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password",
            });
        }

        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "2d",
        });

        res.send({
            success: true,
            message: `Logged in as ${user.role}`,
            token: "Bearer " + token,
            username: user.username,
           // redirect: " ../routes/ "
            redirect: `/user/${user.role.toLowerCase()}/${user.username.toLowerCase()}`, // Dynamic redirection
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error during login: " + error.message);
    }
};


//logout controller

exports.logout =  (req, res) => {
    console.log("Logging out...");
    res.clearCookie('token');
    res.redirect('/');
}