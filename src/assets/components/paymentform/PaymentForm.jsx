import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { createAlert, createAlertWithCallback } from "../../utils/alerts";
import React from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
//hola mundo
import styles from "./payment-form.module.css";
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { cart: cid } = JSON.parse(localStorage.getItem("usuarios"));
  const handlerPurchase = async () => {
    try {
      await axios.get(
        `https://ecomercebackend-production.up.railway.app/api/cartsBd/${cid}/purchase`
      );
    } catch (error) {}
  };
  const handlerCleanCart = async () => {
    const { cart: cid } = JSON.parse(localStorage.getItem("usuarios"));
    try {
      await axios.delete(
        `https://ecomercebackend-production.up.railway.app/api/cartsBd/${cid}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (!error) {
      createAlertWithCallback(
        "success",
        "¡Pago completado!",
        "El pago ha sido procesado con éxito",
        () => window.location.replace("/home")
      );
      handlerCleanCart();
      handlerPurchase();
    } else {
      console.log(error);
      createAlert("error", "Error al procesar el pago", error.message);
    }
  };
  return (
    <>
      <form>
        <PaymentElement />
        <div className={styles.buttonPanel}>
          <Button className={styles.genericButton} onClick={handleSubmit}>
            Pagar
          </Button>
        </div>
      </form>
    </>
  );
};
export default PaymentForm;
