import React from 'react';
import Cart from '../../features/Cart/Cart';
// import PropTypes from 'prop-types';

import styles from './CompanyClaim.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { getCount } from '../../../redux/cartRedux';
import { useState } from 'react';

const CompanyClaim = () => {
  const [showCart, setShowCart] = useState(false);

  const numberOfCartProducts = useSelector(getCount);

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={`row  ${styles.gridContainer}`}>
          <div className={`col ${styles.phoneNumber}`}>
            <p>
              <FontAwesomeIcon className={styles.icon} icon={faMobileAlt} />
              <span>2300 - 3560 - 222</span>
            </p>
          </div>
          <div className={`col text-center ${styles.logo}`}>
            <a href='#'>
              <img src='/images/logo.png' alt='Bazar' />
            </a>
          </div>
          <div className={`col ${styles.cart}`}>
            <a
              href='#'
              className={styles.cartBox}
              onClick={() => setShowCart(!showCart)}
            >
              <div className={styles.cartIcon}>
                <FontAwesomeIcon className={styles.icon} icon={faShoppingBasket} />
              </div>
              <div className={styles.cartCounter}>{numberOfCartProducts}</div>
            </a>
            {showCart && <Cart />}
          </div>
        </div>
      </div>
    </div>
  );
};
// CompanyClaim.propTypes = {};

export default CompanyClaim;
