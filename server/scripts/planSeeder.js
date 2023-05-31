const Plan = require('../models/plan');
const mongoose = require('mongoose');
const config = require('../config');

mongoose
    .connect('mongodb://127.0.0.1:27017/chatpdf')
    .then(() => console.log('MONGODB connected!'))
    .catch(console.log);

async function run() {
  const plans = [
    {
      name: 'Free Trial',
      slug: 'Free',
      stripe_plan: 'price_1NDYrXIhTKltFnGqfLSW1jT9',
      price: 0,
      services: ['1 Property', '1 Document', '20 Questions', '1 Account'],
      description: 'If you’re just testing out the software, it’s free!'
    },
    {
      name: 'Pro',
      slug: 'Pro',
      stripe_plan: 'price_1NDYsVIhTKltFnGqD4Sb3Iuj',
      price: 250,
      services: ['5 Property', '5 Document', '250 Questions', '2 Account'],
      description: 'For landlords managing betwen 1-5 properties.'
    },
    {
      name: 'Pro+',
      slug: 'Professional',
      stripe_plan: 'price_1NDYtvIhTKltFnGqrbxdaWvs',
      price: 1000,
      services: ['25 Property', '10 Document', 'Unlimited Questions', '5 Account'],
      description: 'For landlords managing a large portfolio of properties.'
    },
    {
      name: 'Commercial',
      slug: 'Commercial',
      stripe_plan: 'price_1NDYulIhTKltFnGqIyHOFKtg',
      price: 2500,
      services: ['50 Property', '25 Document', 'Unlimited Questions', '10 Account'],
      description: 'For management companies and large family offices.'
    },
  ];

  for (const plan of plans) {
    await new Plan(plan).save();
  }

  console.log('Plan seeder successfully.');
  mongoose.disconnect();
}

run();