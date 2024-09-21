import express from 'express';
import usermodel from "../models/usermodel.js";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

// User controller
const usercontroller = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    // Check if the email already exists
    const isExist = await usermodel.findOne({ email });
    if (isExist) {
      return res.status(400).send({ success: false, message: "Email already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const user = await usermodel.create({
      name,
      email,
      password: hashedPassword, // Save hashed password
    });

    // Send success response
    return res.status(201).send({ success: true, message: "User created successfully", user });
  } catch (error) {
    // Handle server error
    return res.status(500).send({ success: false, message: "Error in user controller", error });
  }
};

// Get all users controller
const getallusersControler = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await usermodel.find({});

    // Send response with the list of users
    return res.status(200).send({ success: true, message: "Users fetched successfully", users });
  } catch (error) {
    // Handle server error
    return res.status(500).send({ success: false, message: "Error fetching users", error });
  }
};
const deleteusercontroller = async (req, res) => {
    try {
      // Fetch the userid from route parameters or request body
      const { userid } = req.params; // or use req.body.userid if it's from the body
  
    
  
      // Find and delete the user by ID
      const user = await usermodel.findByIdAndDelete(userid);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).send({ success: false, message: "User does not exist" });
      }
  
      // Send success response
      return res.status(200).send({ success: true, message: "User deleted successfully", user });
    } catch (error) {
      // Handle server error
      return res.status(500).send({ success: false, message: "Error in deleting user", error });
    }
  };
  const getsingleusercontroller = async (req, res) => {
    try {
      // Fetch the userid from route parameters or request body
      const { userid } = req.params; // or use req.body.userid if it's from the body
  
    
  
      // Find and delete the user by ID
      const user = await usermodel.findById(userid);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).send({ success: false, message: "User does not exist" });
      }
  
      // Send success response
      return res.status(200).send({ success: true, message: "User Found", user });
    } catch (error) {
      // Handle server error
      return res.status(500).send({ success: false, message: "Error in deleting user", error });
    }
  };
 


  const userupdatecontroller = async (req, res) => {
    try {
      // Fetch the userid from route parameters
      const { userid } = req.params;
  
      // Check if userid is provided
      if (!userid) {
        return res.status(400).send({ success: false, message: "User ID is required" });
      }
  
      // Find the user by ID
      const user = await usermodel.findById(userid);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).send({ success: false, message: "User not found" });
      }
  
      // Update user fields based on request body
      const { name, email, password } = req.body;
      if (name) user.name = name;
      if (email) user.email = email;
      
      // If the password is provided, hash it before updating
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
      // Save the updated user
      await user.save();
  
      // Send success response
      return res.status(200).send({ success: true, message: "User updated successfully", user });
    } catch (error) {
      // Handle server error
      return res.status(500).send({ success: false, message: "Error in updating user", error });
    }
  };
  





export {usercontroller,getallusersControler,deleteusercontroller,userupdatecontroller,getsingleusercontroller};
