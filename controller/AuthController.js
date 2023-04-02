const User = require("../model/User");
const Profile = require("../model/ProfileInfo")
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (
    firstName === null ||
    lastName === null ||
    email == null ||
    password == null ||
    phone === null
  ) {
    return res.status(400).json({
      status: false,
      message: "All Fields are Required",
    });
  }
  const duplicateData = await User.findOne({ email }).lean().exec();
  if (duplicateData) {
    return res.status(400).json({
      status: false,
      message: "Email already registered.",
    });
  }
  const encryptPassword = await bcrypt.hash(password, 10);
  const setNewUser = {
    firstName,
    lastName,
    email,
    phone,
    password: encryptPassword,
  };
  setNewUser.role = "USER";
  const newUser = await User.create(setNewUser);
  const profile = {
    firstName:newUser.firstName,
    lastName:newUser.lastName,
    userId:newUser._id
  };
  await Profile.create(profile);
  if (newUser) {
    res.status(201).json({ message: "User Successfully created", data: newUser });
  } else {
    res.status(400).json({
      message: "Invalid user data received",
    });
  }
});

const authenticate = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const data = await User.findOne({ email }).lean().exec();
  if (data.status == "ACTIVE") {
    const isPassword = await bcrypt.compare(password, data.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    if (res.statusCode === 200) {
      return res.json({
        status: "success",
        Token: token,
        message: "Successfully Logged In !!",
      });
    } else {
      return res.status(400).send("error");
    }
  }
  throw res.status(400).json({status:false,message:"User in not verified"})
});


const verifyToken = async (req , res, next) => {
  const headers = req.headers[`authorization`];
  const token = headers.split(" ")[1];
  if (!token) {
    return res.status(404).json({ status: "error", message: "Token Error" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ status: "error", message: "No Token found" });
    }
    req.id= user._id;
  });
  next();
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    throw err;
  }
  if (!user) {
    return res.status(400).json({ status: "error", message: "User Not Found" });
  }
  res.status(200).json({ data: user });
  next();
};


const authorizeUser = async(req,res) => {
      const id = req.params.id;
      try{
        const user = await User.findById(id);
        if(!user){
           return res.status(500),json({
            status:"Failed",
            message:"User Not found",
            id:id
           });
        }
        user.status = "ACTIVE";
        const updatedUser = await user.save();
        return res.status(200).json({
          status:"Sucess",
          data:updatedUser,
          id:updatedUser._id
        });

      }catch(err){
        throw err;
      }

}

exports.registerUser = registerUser;
exports.authenticate = authenticate;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.authorizeUser = authorizeUser;
