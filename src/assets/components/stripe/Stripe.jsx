import React, { useEffect, useState } from 'react';

import classnames from 'classnames';

// Components
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../paymentform/PaymentForm';
import Wrapper from '../wrapper/Wrapper';

// Services
import PaymentService from '../../../services/paymentservice';

// Styles
import styles from './stripe.module.css';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Stripe = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const { cid } = useParams();
  useEffect(() => {
    const getClientSecret = async () => {
      const service = new PaymentService();
      service.createPaymentIntent({ productId: cid, callbackSuccess: callbackSuccessPaymentIntent, callbackError: callbackErrorPaymentIntent });
    };
    // setUserCart(userCart);

    cid && getClientSecret();
  }, [cid]);

  const callbackSuccessPaymentIntent = (res) => {
    setClientSecret(res.data.payload.client_secret);
  };

  const callbackErrorPaymentIntent = (err) => {
    console.log(err);
  };
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Stripe</h1>
      </div>
      <div className={classnames([styles.container, styles.highlighted])}>
        <Wrapper hidden={!clientSecret || !stripePromise}>
          <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
            <PaymentForm />
          </Elements>
        </Wrapper>
      </div>
    </>
  );
};
export default Stripe;
