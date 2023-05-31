const User = require("../models/user");

exports.getUser = async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    username: req.user.username,
  };
  return res.status(200).json({
    success: true,
    user,
  });
};

exports.getUsers = async (req, res) => {
  let { page, limit } = req.query;
  page = page ?? 1;
  limit = limit ?? 10;
  const skip = (page - 1) * limit;
  const total = await User.count();
  const users = await User.find().skip(skip).limit(limit);
  return res.json({
    success: true,
    users,
    total,
  });
};

exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const existUser = await User.findOne({ email, _id: { $ne: req.user._id } });
  if (existUser) {
    return res.status(422).json({
      success: false,
      errors: {
        email: "This email has already been taken.",
      },
    });
  }
  const user = await User.findByIdAndUpdate(req.user._id, {
    name,
    email,
  }, {
    new: true,
  });
  return res.status(200).json({
    success: true,
    user,
  });
}

exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const isValid = await req.user.isValidPassword(oldPassword);
  if (!isValid) {
    return res.status(401).json({
      success: false,
      errors: {
        oldPassword: "This password is invalid.",
      },
    });
  }
  req.user.password = newPassword;
  await req.user.save();
  return res.status(200).json({
    success: true,
  });
}