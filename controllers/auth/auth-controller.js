const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.model.js");

// register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {

    const checkUser =  await User.findOne({email})
    if(checkUser) return res.json({success : false, message : "User With Give Email Already Registered, please try again."})

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password : hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser =  await User.findOne({email})
    if(!checkUser) return res.json({success : false, message : "User doesn't exists! please register first"});

      const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
      if(!checkPasswordMatch) return res.json({success : false, message : "Incorrect password! please try again"});

      const token = jwt.sign({
        id : checkUser._id, role : checkUser.role, email : checkUser.email, username : checkUser.username
      }, 'CLIENT_SECRET_KEY', {expiresIn : '60m'})

      res.cookie('token', token, {httpOnly: true, secure : false}).json({
        success : true,
        message : "Logged in Successful",
        user : {
          email : checkUser.email,
          role : checkUser.role,
          id : checkUser._id,
          username : checkUser.username
        }
      })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

// logout
const logoutUser = (req, res) => {
  res.clearCookie('token').json({
    success : true,
    message : "Logged out successfully!"
  })
}
// auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if(!token) return res.status(401).json({
    success : false,
    message : 'Unauthorised user!'
  });
  try {
    const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
    success : false,
    message : 'Unauthorised user!'
  });
  } 
}

module.exports = {registerUser, loginUser, logoutUser, authMiddleware};