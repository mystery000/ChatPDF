const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    name: {
      type: String,
      required: true,
    },
    stripeId: {
      type: String,
      required: true,
      unique: true,
    },
    stripe_status: {
      type: String,
      required: true,
    },
    stripe_price: {
      type: String,
    },
    trial_ends_at: {
      type: Date,
    },
    ends_at: {
      type: Date,
    }
  },
  {
    timestamps: true,
  },
);

const SubscriptionModel = mongoose.model('subscriptions', SubscriptionSchema);

module.exports = SubscriptionModel;
