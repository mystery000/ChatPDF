const Plan = require('../models/plan');

exports.getAll = async (req, res) => {
  try {
    const plans = await Plan.find();
    return res.json({
      success: true,
      plans
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}