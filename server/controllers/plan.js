const Stripe = require('stripe');
const Plan = require('../models/plan');
const Subscription = require('../models/subscription');
const config = require('../config');
const stripe = new Stripe(config.STRIPE_SECRET_KEY);

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

exports.createSubscription = async (req, res) => {
  try {
    // create a stripe customer
    const { paymentMethod, planId, pm_type, pm_last_four } = req.body;
    const plan = await Plan.findById(planId);
    const priceId = plan.stripe_plan;
    let customerId = req.user.stripeId;
    if (paymentMethod && !customerId) {
      let customer = await stripe.customers.create({
        name: req.user.name,
        email: req.user.email,
        payment_method: paymentMethod,
        invoice_settings: {
          default_payment_method: paymentMethod,
        },
      });
      customerId = customer.id;
      req.user.stripeId = customerId;
      req.user.pm_type = pm_type;
      req.user.pm_last_four = pm_last_four;
      req.user.save();
    } else if (paymentMethod && customerId) {
      await stripe.customers.update(customerId, {
        payment_method: paymentMethod,
        invoice_settings: {
          default_payment_method: paymentMethod,
        },
      })
      req.user.pm_type = pm_type;
      req.user.pm_last_four = pm_last_four;
      req.user.save();
    }

    // get the user subscription.
    const actSub = await Subscription.findById(req.user.activeSubscriptionId).populate('planId');
    const selSub = await Subscription.findById(req.user.selectedSubscriptionId).populate('planId');
    let subscription;
    if (actSub && selSub) {
      if (actSub.planId.price < plan.price) {
        req.user.activeSubscriptionId = null;
        req.user.selectedSubscriptionId = null;
        await req.user.save();
        await stripe.subscriptions.cancel(actSub.stripeId);
        await stripe.subscriptions.cancel(selSub.stripeId);
        // new Save act and remove sel
        // create a stripe subscription
        subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [{ price: priceId }],
          payment_settings: {
            payment_method_options: {
              card: {
                request_three_d_secure: 'any',
              },
            },
            payment_method_types: ['card'],
            save_default_payment_method: 'on_subscription',
          },
          expand: ['latest_invoice.payment_intent'],
          metadata: {
            userId: req.user._id
          }
        });

        // return the client secret and subscription id
        const sub = await new Subscription({
          userId: req.user._id,
          planId: planId,
          name: 'landlord_monthly_subscription',
          stripeId: subscription.id,
          stripe_price: priceId,
        }).save();
        req.user.activeSubscriptionId = sub._id;
        req.user.selectedSubscriptionId = null;
        req.user.save();

      } else if (actSub.planId.price > plan.price) {
        if (selSub.planId._id != plan._id) {
          req.user.selectedSubscriptionId = null;
          await req.user.save();
          await stripe.subscriptions.cancel(selSub.stripeId);
          //new update sel
          // create a stripe subscription
          const subs = await stripe.subscriptions.retrieve(actSub.stripeId);
          subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            payment_settings: {
              payment_method_options: {
                card: {
                  request_three_d_secure: 'any',
                },
              },
              payment_method_types: ['card'],
              save_default_payment_method: 'on_subscription',
            },
            expand: ['latest_invoice.payment_intent'],
            metadata: {
              userId: req.user._id
            },
            trial_end: subs.current_period_end,
          });

          // return the client secret and subscription id
          const sub = await new Subscription({
            userId: req.user._id,
            planId: planId,
            name: 'landlord_monthly_subscription',
            stripeId: subscription.id,
            stripe_price: priceId,
          }).save();
          req.user.selectedSubscriptionId = sub._id;
          req.user.save();
        }
      } else {
        req.user.selectedSubscriptionId = null;
        await req.user.save();
        await stripe.subscriptions.cancel(selSub.stripeId);
        await stripe.subscriptions.update(actSub.stripeId, {
          cancel_at_period_end: true,
        });
        req.user.activeSubscriptionId = req.user.selectedSubscriptionId;
        req.user.selectedSubscriptionId = null;
        req.user.save();
      }
    } else if (actSub && !selSub) {
      if (actSub.planId.price < plan.price) {
        req.user.activeSubscriptionId = null;
        await req.user.save();
        await stripe.subscriptions.cancel(actSub.stripeId);
        //new save act
        // create a stripe subscription
        subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [{ price: priceId }],
          payment_settings: {
            payment_method_options: {
              card: {
                request_three_d_secure: 'any',
              },
            },
            payment_method_types: ['card'],
            save_default_payment_method: 'on_subscription',
          },
          expand: ['latest_invoice.payment_intent'],
          metadata: {
            userId: req.user._id
          }
        });

        // return the client secret and subscription id
        const sub = await new Subscription({
          userId: req.user._id,
          planId: planId,
          name: 'landlord_monthly_subscription',
          stripeId: subscription.id,
          stripe_price: priceId,
        }).save();
        req.user.activeSubscriptionId = sub._id;
        req.user.save();
      } else if (actSub.planId.price > plan.price) {
        await stripe.subscriptions.update(actSub.stripeId, {
          cancel_at_period_end: true,
        });
        const subs = await stripe.subscriptions.retrieve(actSub.stripeId);
        // new save sel
        // create a stripe subscription
        subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [{ price: priceId }],
          payment_settings: {
            payment_method_options: {
              card: {
                request_three_d_secure: 'any',
              },
            },
            payment_method_types: ['card'],
            save_default_payment_method: 'on_subscription',
          },
          expand: ['latest_invoice.payment_intent'],
          metadata: {
            userId: req.user._id
          },
          trial_end: subs.current_period_end,
        });

        // return the client secret and subscription id
        const sub = await new Subscription({
          userId: req.user._id,
          planId: planId,
          name: 'landlord_monthly_subscription',
          stripeId: subscription.id,
          stripe_price: priceId,
        }).save();
        req.user.selectedSubscriptionId = sub._id;
        req.user.save();
      }
    } else if (!actSub) {
      //new save act
      // create a stripe subscription
      subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_settings: {
          payment_method_options: {
            card: {
              request_three_d_secure: 'any',
            },
          },
          payment_method_types: ['card'],
          save_default_payment_method: 'on_subscription',
        },
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          userId: req.user._id
        }
      });

      // return the client secret and subscription id
      const sub = await new Subscription({
        userId: req.user._id,
        planId: planId,
        name: 'landlord_monthly_subscription',
        stripeId: subscription.id,
        stripe_price: priceId,
      }).save();
      req.user.activeSubscriptionId = sub._id;
      req.user.save();
    }
    
    return res.json({
      clientSecret: subscription?.latest_invoice?.payment_intent?.client_secret,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

exports.getUserSubscription = async (req, res) => {
  try {
    const activeSubscription = await Subscription.findById(req.user.activeSubscriptionId).populate('planId');
    const selectedSubscription = await Subscription.findById(req.user.selectedSubscriptionId).populate('planId');
    // console.log()
    return res.json({
      success: true,
      activeSubscription,
      selectedSubscription,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}