import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceInCents = price * 100;
  const publicKey = "pk_test_aOACBiILI2GncjP12ccP859o";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceInCents}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publicKey}
    />
  );
};

export default StripeCheckoutButton;
