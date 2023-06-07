import styles from './Sales.module.scss';
import React from 'react';
import initialState from '../../../redux/initialState';

const Sales = () => {
  return (
    <div className='container sales'>
      <div className='row'>
        <div className={`${styles.leftSide} col-lg-6 col-md-12 col-sm-12`}>
          <div className={styles.image}>
            <img src={initialState.products[0].image}></img>
            <div className={styles.imgBanner}>
              <div className={styles.leftSideDescription}>
                <h4>guest room</h4>
                <h2>sofa</h2>
                <p>-20%</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.rightSide} col-lg-6 col-md-12 col-sm-12 `}>
          <div className={styles.top}>
            <div className={styles.topImgs}>
              <div className={styles.imgRight}>
                <img src={initialState.products[3].image}></img>
              </div>
              <div className={styles.topDescription}>
                <h4>
                  <span>Office </span> chair
                </h4>
                <h4>collection</h4>
                <h4 className={styles.price}>${initialState.sales[0].price}.00</h4>
              </div>
              <div className={styles.imgLeft}>
                <div className={styles.bottomImg}>
                  <img src={initialState.products[4].image}></img>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <img src={initialState.products[5].image}></img>
            <div className={styles.bottomDescription}>
              <h2>
                <span>special</span> collection
              </h2>
              <h4>save up to 45% of furniture</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
