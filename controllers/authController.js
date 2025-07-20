import User from "../model/userSchema.js";
import bcrypt from "bcrypt";

const userRegister = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (username, email, password) are required"
      });
    }

    
    username = username.trim();
    email = email.trim().toLowerCase();

    
    const userExists = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message:
          userExists.username === username
            ? "Username already taken"
            : "Email already registered"
      });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(400).json({
        success: false,
        message: "User registration failed"
      });
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export { userRegister };
