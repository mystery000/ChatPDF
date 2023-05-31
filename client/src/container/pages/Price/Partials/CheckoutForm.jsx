import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input } from "antd";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { createSubscription } from "../../../../services/planAPI";

function CheckoutForm({ plan }) {
  // stripe items
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector(state => state.auth.user);

  // main function
  const handleCreateSubscription = async () => {
    try {
      
      // create a payment method
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.name,
          email: user.email,
        },
      });
      console.log(paymentMethod)
      // call the backend to create subscription
      const response = await createSubscription({
        paymentMethod: paymentMethod?.paymentMethod,
        name: user.name,
        email: user.email,
        priceId: plan.stripe_plan
      });

      const confirmPayment = await stripe?.confirmCardPayment(
        response.data.clientSecret
      );

      if (confirmPayment?.error) {
        alert(confirmPayment.error.message);
      } else {
        alert("Success! Check your email for the invoice.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid gap-4 m-auto">
      <CardElement className="border border-solid border-gray-400 py-3 px-4 rounded" />
      <Button size="large" type="primary" onClick={handleCreateSubscription} disabled={!stripe}>
        Subscribe
      </Button>
    </div>
  );
}

export default CheckoutForm;