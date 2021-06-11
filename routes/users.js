const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { auth } = require("../middleware/auth");

const User = require("../models/User");

// @route   POST api/users/register
// @desc    Register a user
// @access  Private
router.post("/register", auth, async (req, res) => {
    const { userName, email, mobile, address } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).send("User already exists");
        }

        user = new User({
            userName,
            email,
            mobile,
            address
        });

        await user.save();


        // const salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(password, salt);


        // const payload = {
        //     user: {
        //         id: user.id,
        //     },
        // };

        // jwt.sign(
        //     payload,
        //     config.get("jwtSecret"),
        //     {
        //         expiresIn: 60 * 5,
        //     },
        //     (err, token) => {
        //         if (err) throw err;
        //         res.json({ token, user });
        //     }
        // );
        res.status(200).json(user)
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/users/
// @desc    Login user & get token
// @access  Public
router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            config.get("jwtSecret"),
            {
                expiresIn: 60 * 5,
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
})

// @route   GET api/users/getMe
// @decs    Get logged in user
// @access  Private
router.get("/getMe", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

// @route   GET api/users
// @decs    Get all users except admin
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const users = await User.find({ _id: { $nin: req.user.id } }).select("-password");
        res.json(users);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

// @route   DELETE api/users/:id
// @desc    Delete a user
// @access  Private
router.delete("/:id", auth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.json({ msg: "User removed" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;