const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const user = require('../models/user');

//@ desc    Signup with username, password, and role
//@ route   POST /api/auth/signup
//@ access  PUBLIC   
const signup = asyncHandler(async (req, res) => {
    const { username, password, role } = req.body;

    // Check if user with username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ message: 'User with username already exists' });
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id, username, role: newUser.role }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });

    res.json({
        message: 'User created successfully',
        user: {
            _id: newUser._id,
            username: username,
            role: role
        }
    });
});

//@ desc    Login with username and password
//@ route   POST /api/auth/login
//@ access  PUBLIC   
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Check if user with username exists
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if password is correct 
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a token and set it as a cookie
    const token = jwt.sign({ _id: user._id, username, role: user.role }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });

    res.json({
        message: 'Login successful',
        user: {
            _id: user._id,
            username: username,
            role: user.role
        }
    });
});

//@ desc    Logout
//@ route   POST /api/auth/logout
//@ access  PRIVATE   
const logout = asyncHandler(async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
});

module.exports = { signup, login, logout };
