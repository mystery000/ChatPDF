const Stripe = require('stripe');
const Plan = require('../models/plan');
const Subscription = require('../models/subscription');
const User = require('../models/user');
const config = require('../config');
const stripe = new Stripe(config.STRIPE_SECRET_KEY);

exports.index = async (req, res) => {
  console.log(req.body.type);
  if (req.body.type === 'invoice.payment_succeeded') {
    console.log(req.body);
    const subscription = await stripe.subscriptions.retrieve(req.body.data.object.subscription);
    await Subscription.findOneAndUpdate({
      stripeId: subscription.id
    }, {
      next_payment_at: subscription.current_period_end * 1000
    });
  } else if (req.body.type == 'customer.subscription.deleted') {
    console.log(req.body.data.object.id);
    const subscription = await Subscription.findOne({ stripeId: req.body.data.object.id });
    if (subscription) {
      const user = await User.findOne({ activeSubscriptionId: subscription._id });
      if (user) {
        user.activeSubscriptionId = user.selectedSubscriptionId;
        user.selectedSubscriptionId = null;
        await user.save();
      }
      await subscription.delete();
    }
  }
  return res.send('ok');
  // try {
  //   const plans = await Plan.find();
  //   return res.json({
  //     success: true,
  //     plans
  //   });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({
  //     success: false,
  //     message: error.message
  //   });
  // }
}