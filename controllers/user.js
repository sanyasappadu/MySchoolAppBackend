const User = require('../models/User.js');
const bcrypt = require("bcryptjs");
const createError = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const userCreate = async (req, res) => {
  try {
    const validateName = async (name) => {
      let user = await User.findOne({ name });
      return user ? false : true;
    };
    const validateEmail = async (email) => {
      let user = await User.findOne({ email });
      return user ? false : true;
    };
    let nameNotTaken = await validateName(req.name);
    if (!nameNotTaken) {
      return res.status(400).json({
        message: `Name is already taken.`,
      });
    }
    let emailNotRegistered = await validateEmail(req.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
      });
    }
    const password = await bcrypt.hash(req.password, 12);
    const newUser = new User ({
      ...req,
      password
    });

    await newUser .save();
    return res.status(201).json({
      message: "Hurry! now you are successfully registred. Please nor login."
    });
  } catch (err) {
    return res.status(500).json({
      message: `${err.message}`
    });
  }
};
const userLogin = async (req, res) => {
  let { email, password } = req;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "email is not found. Invalid login credentials.",
      success: false,
    });
  }

  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    let token = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT,
      { expiresIn: "3 days" }
    );

    let result = {
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };

    return res.status(200).json({
      ...result,
      message: "You are now logged in.",
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
    });
  }
};


const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found with the provided email.",
        success: false,
      });
    }
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.error("Error getting user by email:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

const getUserList = async (req, res, next) => {
  // const studentClass = req.params.class
  try {
    const user = await User.find({class: req.params.class});
    if(!user) return next(createError(404, "user not found!"));
    res.status(200).json(user)
  } catch (error) {
    console.error('error geting user:', error);
    res.status(500).json({message:"internal server error"})
  }
}
const deleteUser = async (req, res, next) => {
  try {
    console.log(req.params.idnumber)
    const user = await User.findOneAndDelete({ idnumber: req.params.idnumber });
    if (!user) {
      return next(createError(404, "user not found!"));
    }
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function deleteUserById(idnumber) {
  try {
      const deletedUser = await User.findOneAndDelete({ idnumber });
      if (!deletedUser) {
          console.log('User not found.');
          return;
      }
      console.log('Deleted User:', deletedUser);
  } catch (error) {
      console.error('Error deleting User:', error);
  }
}
const createUserList = async (req, res, next) => {
  const usersData = req.body
  try {
    const newUsersList =  usersData.map((user)=> ({
      ...user,
      password:bcrypt.hashSync(user.password, 10)
    }));
    const savedUsers = await User.insertMany(newUsersList);
    console.log(savedUsers);

    res.status(200).send("Users has been created!");
  } catch (err) {
    next(err);
  }
};
const updateUser = async (req, res) => {
  const email = req.params.email;
  const updateData = { ...req.body };

  // Ensure idnumber and email are not updated
  delete updateData.idnumber;
  delete updateData.email;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Update the user's details
      for (const key in updateData) {
          if (updateData.hasOwnProperty(key)) {
              user[key] = updateData[key];
          }
      }

      await user.save();
      res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
  }
};
const userVerify = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: Missing token.",
    });
  }

  token = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized: Invalid token.",
    });
  }
};

/**
 * @DESC Verify JWT from authorization header Middleware
 */
const userAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(process.env.JWT);
  console.log(authHeader);
  if (!authHeader) return res.sendStatus(403);
  console.log(authHeader); // Bearer token
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT, (err, decoded) => {
    console.log("verifying...");
    if (err) return res.sendStatus(403); //invalid token

    console.log(decoded); //for correct token
    next();
  });
};


/**
 * @DESC Check Role Middleware
 */
const checkRole = (roles) => async (req, res, next) => {
  let { name } = req.body;

  //retrieve employee info from DB
  const employee = await User.findOne({ name });
  !roles.includes(employee.role)
    ? res.status(401).json("Sorry you do not have access to this route")
    : next();
};
module.exports = {userCreate, userLogin, getUser, getUserList, deleteUser, createUserList, updateUser, userAuth, userVerify, checkRole}

