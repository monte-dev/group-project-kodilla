import React, { useEffect } from 'react';
import styles from './Cart.module.scss';
import { useSelector } from 'react-redux';
import { getAll } from '../../../redux/cartRedux';
import { useState } from 'react';
import Button from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../redux/cartRedux';

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(getAll);

  const [shipping, setShipping] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const sum = cartProducts.reduce((total, cartProduct) => {
      return total + cartProduct.price * cartProduct.quantity;
    }, 0);
    const totalAmount = sum + shipping;
    setAmount(totalAmount);
    if (cartProducts.length > 0) {
      setShipping(50);
    } else {
      setShipping(0);
    }
  }, [cartProducts, shipping]);

  const handleEmptyCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className={styles.cartContainer}>
      <h5 className={styles.cartTitle}>Your Cart:</h5>
      <div className={styles.cartProducts}>
        {cartProducts && cartProducts.length > 0 ? (
          <ul className={styles.productsList}>
            {cartProducts.map(cartProduct => (
              <li className={styles.product} key={cartProduct.name}>
                <p>
                  {cartProduct.quantity} <span>x</span> {cartProduct.name}
                </p>
                <p className={styles.amount}>
                  {cartProduct.price * cartProduct.quantity}$
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className={styles.delivery}>
        <p>Delivery</p>
        <p className={styles.amount}>{shipping}$</p>
      </div>
      <div className={styles.summary}>
        <p>Total</p>
        <p className={styles.amount}>{amount}$</p>
      </div>
      <div className={styles.buttons}>
        <Button variant='small' className={styles.button}>
          Buy
        </Button>
        <Button variant='small' className={styles.button} onClick={handleEmptyCart}>
          Empty cart
        </Button>
      </div>
    </div>
  );
};
export default Cart;
