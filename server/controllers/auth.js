const jwt = require("jsonwebtoken");

const config = require("../config");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { utm_source, utm_compaign, utm_medium, utm_content } = req.query;

        const existUser = await User.findOne({ email });
        if (existUser) {
            let message = "This email has already been taken.";
            if (existUser.status == 2) {
                message = "This user deleted account manually. If you want to active this account, please contact to support.";
            }
            return res.status(422).json({
                success: false,
                errors: {
                    email: message,
                },
            });
        }

        const user = new User({
            name,
            email,
            password,
            utm_source,
            utm_compaign,
            utm_medium,
            utm_content,
        });

        await user.save();
        const newUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.permission == 1,
        };
        const access_token = jwt.sign(newUser, config.SecretKey, {
            expiresIn: config.TOKEN_EXPIRES_IN,
        });
        sendEmail({
            from: process.env.FROM_ADDRESS,
            to: user.email,
            subject: "Welcome to Landlord.ai 💬",
            html: 'welcome',
            data: {
                name: user.name
            }
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
    if (req.user.status == 2) {
        return res.status(422).json({
            success: false,
            errors: {
                email: "This user deleted account manually. If you want to active this account, please contact to support.",
            },
        });
    }

    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        stripeId: req.user.stripeId,
        isAdmin: req.user.permission == 1,
    };
    const access_token = jwt.sign(user, config.SecretKey, {
        expiresIn: config.TOKEN_EXPIRES_IN,
    });
    return res.status(200).json({
        success: true,
        user,
        token: `jwt ${access_token}`,
    });
};
