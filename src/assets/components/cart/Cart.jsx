import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";

import styles from "./cart.module.css";

import Stripe from "../stripe/Stripe";

function Cart() {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPurchasing] = useState(false);

  const handlerRemoveItem = async (pid) => {
    const { cart: cid } = JSON.parse(localStorage.getItem("usuarios"));
    console.log(cid, pid);
    try {
      setIsLoading(true);

      await axios.delete(
        `https://jazzy-crepe-b6ee51.netlify.app/api/cartsBd/${cid}/product/${pid}`
      );
      const response = await axios.get(
        `https://jazzy-crepe-b6ee51.netlify.app/api/cartsBd/${cid}`
      );
      setCart(response.data);
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setIsLoading(false);
  };

  const handlerCleanCart = async () => {
    const { cart: cid } = JSON.parse(localStorage.getItem("usuarios"));
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `https://jazzy-crepe-b6ee51.netlify.app/api/cartsBd/${cid}`
      );
      setCart(response.data.Carrito);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
  };

  const { cart: cid } = JSON.parse(localStorage.getItem("usuarios"));

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://jazzy-crepe-b6ee51.netlify.app/api/cartsBd/${cid}`
        );
        setCart(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
        setError(true);
      }
      setIsLoading(false);
    };

    fetchCart();
  }, [cid]);

  const handlerPayment = (cart) => {
    const userCart = cart.products;
    console.log(userCart);
    window.location.href = `/stripe/${cid}`;
  };

  return (
    <div className={styles.main}>
      <h1>Carrito de Compras</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Ha ocurrido un error. Intentelo de nuevo mas tarde.</p>
      ) : cart?.products?.length > 0 ? (
        <div className={styles.cart}>
          <div className={styles["cart-summary"]}>
            <p>
              <span className={styles["cart-summary-title"]}>ID:</span>{" "}
              {cart.id}
            </p>
            <p>
              <span className={styles["cart-summary-title"]}>
                Precio Total:
              </span>{" "}
              {cart.priceTotal}
            </p>
            <p>
              <span className={styles["cart-summary-title"]}>
                Cantidad Total:
              </span>{" "}
              {cart.quantityTotal}
            </p>
          </div>
          <ul className={styles["cart-products-container"]}>
            {cart.products.map((cartProduct) => (
              <li className={styles.product} key={cartProduct.product.id}>
                <div className={styles["product-summary"]}>
                  <div className={styles["product-summary-img"]}>
                    <img
                      className={styles["img"]}
                      src={cartProduct.product.thumbnail}
                      alt={cartProduct.product.title}
                    />
                  </div>
                  <div>
                    <p className={styles["product-title"]}>
                      {cartProduct.product.title}
                    </p>
                    <p>
                      <span className={styles["product-key"]}>Precio:</span>{" "}
                      <span className={styles["product-price"]}>
                        {cartProduct.product.price}
                      </span>
                    </p>
                    <p>
                      <span className={styles["product-key"]}>Cantidad:</span>{" "}
                      {cartProduct.quantity}
                    </p>
                  </div>
                </div>
                <div>
                  <Button
                    variant="danger"
                    onClick={() => handlerRemoveItem(cartProduct._id)}
                  >
                    Borrar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles["cart-actions"]}>
            <Button onClick={() => handlerPayment(cart)}>
              Finalizar Compra
            </Button>
            <Button onClick={handlerCleanCart}>Borrar Carrito</Button>
          </div>
        </div>
      ) : (
        <p>No se encontró ningún carrito.</p>
      )}
      {isPurchasing && <Stripe userCart={cart} />}
    </div>
  );
}

export default Cart;
