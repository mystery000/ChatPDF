const jwt = require("jsonwebtoken");

const config = require("../config");
const User = require("../models/user");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(422).json({
                success: false,
                errors: {
                    email: "This email has already been taken.",
                },
            });
        }

        const user = new User({
            name,
            email,
            password,
        });

        await user.save();
        const newUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
        };
        const access_token = jwt.sign(newUser, config.SecretKey, {
            expiresIn: 640000,
        });
        return res.status(200).json({
            success: true,
            user: newUser,
            token: `jwt ${access_token}`,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
        });
    }
};

exports.login = async (req, res) => {
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        username: req.user.username,
    };
    const access_token = jwt.sign(user, config.SecretKey, {
        expiresIn: 640000,
    });
    return res.status(200).json({
        success: true,
        user,
        token: `jwt ${access_token}`,
    });
};
