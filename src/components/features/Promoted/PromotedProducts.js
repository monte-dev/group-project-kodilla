import React, { setState, useState, useEffect, setTimeout, useRef } from 'react';
import styles from './PromotedProducts.module.scss';
import './PromotedProducts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faCircle,
  faShoppingBasket,
  faExchangeAlt,
  faEye,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as OutlineStar, faHeart } from '@fortawesome/free-regular-svg-icons';
import Button from '../../common/Button/Button';
import initialState from '../../../redux/initialState';
import getHotDeals from '../../../redux/hotDealsRedux';
import SwipeableContainer from '../SwipeableWrapper/SwipeableContainer';
import { useSelector } from 'react-redux';

const PromotedProducts = () => {
  const [bilboard, setBilboard] = useState(0);
  const [dotStyles, setDotStyles] = useState(0);
  const [blink, setBlink] = useState(0);
  const [small_blink, setSmallBlink] = useState(0);

  const canrun = useRef(false);

  const hotDeals = useSelector(state => state);

  const renderStars = () => {
    const stars = [];
    for (let x = 0; x < 5; x++) {
      if (x < initialState.products[0].stars) {
        stars.push(1);
      } else {
        stars.push(0);
      }
    }
    return stars.map((star, index) => (
      <FontAwesomeIcon
        icon={star === 1 ? faStar : OutlineStar}
        key={index}
      ></FontAwesomeIcon>
    ));
  };

  function handleDotChange(dot) {
    canrun.current = true;
    window.setTimeout(() => {
      canrun.current = false;
    }, 10000);
    setSmallBlink(1);
    window.setTimeout(() => {
      setSmallBlink(2);
    }, 150);
    setDotStyles(dot);
  }

  const handleSwipeLeft = () => {
    setBlink(1);
    if (bilboard - 1 >= 0) {
      window.setTimeout(() => {
        setBilboard(curr => curr - 1);
        setBlink(2);
      }, 150);
    } else {
      window.setTimeout(() => {
        setBilboard(hotDeals.hotDeals.length - 1);
        setBlink(2);
      }, 150);
    }
  };

  const handleSwipeRight = () => {
    setBlink(1);
    if (bilboard + 1 < hotDeals.hotDeals.length) {
      window.setTimeout(() => {
        setBilboard(curr => curr + 1);
        setBlink(2);
      }, 150);
    } else {
      window.setTimeout(() => {
        setBilboard(0);
        setBlink(2);
      }, 150);
    }
  };

  const renderDots = () => {
    let ret_table = [];
    for (let x = 0; x < 3; x++) {
      ret_table.push(
        <a
          onClick={() => {
            handleDotChange(x);
          }}
          key={x}
        >
          <FontAwesomeIcon
            icon={faCircle}
            className={`${x === dotStyles ? styles.active : ''}`}
          />
        </a>
      );
    }
    return ret_table;
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!canrun.current) {
        setSmallBlink(1);
        window.setTimeout(() => {
          setSmallBlink(2);
          setDotStyles(curr => {
            if (curr + 1 < 3) {
              return curr + 1;
            } else {
              return 0;
            }
          });
        }, 150);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [dotStyles]);

  return (
    <div className='container'>
      <div className={`${styles.promoted} row`}>
        <div className={`${styles.hot_deals} col-4`}>
          <div className={`${styles.hot_deals_header} d-flex`}>
            <h3>HOT DEALS</h3>
            <div className={styles.circles}>
              {}
              {renderDots()}
            </div>
          </div>
          <div
            className={`${styles.hot_deal} ${
              small_blink === 1
                ? styles.blink
                : small_blink === 2
                ? styles.back_blink
                : ''
            }`}
          >
            <img
              src={initialState.products[dotStyles].image}
              alt='fancy_hot_deals'
            ></img>
            <div className={styles.timer}>
              <div className={styles.wheele}>
                <p>25</p>
                <p>days</p>
              </div>
              <div className={styles.wheele}>
                <p>10</p>
                <p>hrs</p>
              </div>
              <div className={styles.wheele}>
                <p>45</p>
                <p>mins</p>
              </div>
              <div className={styles.wheele}>
                <p>30</p>
                <p>secs</p>
              </div>
            </div>
            <div className={styles.add_to_cart}>
              <Button className={styles.button} variant='small'>
                <FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon> ADD TO CART
              </Button>
            </div>
          </div>
          <div className={styles.hot_middle}>
            <h3 className={styles.product_title}>
              {initialState.products[dotStyles].name}
            </h3>
            <div className={styles.stars}>{renderStars()}</div>
          </div>
          <div className={styles.hr_border}>
            <hr></hr>
          </div>
          <div className={styles.hot_bottom}>
            <div className={styles.icon_buttons}>
              <Button variant='outline'>
                <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
              </Button>
              <Button variant='outline'>
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
              </Button>
              <Button variant='outline'>
                <FontAwesomeIcon icon={faExchangeAlt}></FontAwesomeIcon>
              </Button>
            </div>
            <div className={styles.prices}>
              <h4 className={styles.old_price}>
                ${initialState.products[dotStyles].oldPrice}
              </h4>
              <h4 className={styles.new_price}>
                ${initialState.products[dotStyles].price}
              </h4>
            </div>
          </div>
        </div>
        <div className={`${styles.products} col-lg-8 col-sm-12`}>
          <SwipeableContainer
            rightAction={handleSwipeRight}
            leftAction={handleSwipeLeft}
            className={`${styles.inside_banner} ${
              blink === 1 ? styles.blink : blink === 2 ? styles.back_blink : '0'
            }`}
          >
            <img src={hotDeals.hotDeals[bilboard].image} alt='Promoted'></img>
            <div className={styles.img_banner}>
              <h3>
                {hotDeals.hotDeals[bilboard].title}{' '}
                <span>{hotDeals.hotDeals[bilboard].subtitle}</span>
              </h3>
              <h4>{hotDeals.hotDeals[bilboard].description}</h4>
              <Button className={styles.shop_now}>SHOP NOW</Button>
            </div>
            <Button
              noHover={true}
              className={styles.arr_left}
              onClick={handleSwipeLeft}
            >
              <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            </Button>
            <Button
              noHover={true}
              className={styles.arr_right}
              onClick={handleSwipeRight}
            >
              <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            </Button>
          </SwipeableContainer>
        </div>
      </div>
    </div>
  );
};

export default PromotedProducts;
