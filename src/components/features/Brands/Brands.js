import React, { useState, useEffect } from 'react';
import styles from './Brands.module.scss';
import { getBrands } from '../../../redux/brandsRedux';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SwipeableContainer from '../SwipeableWrapper/SwipeableContainer';

const Brands = () => {
  const brands = useSelector(getBrands);
  const viewport = useSelector(state => state.viewport);

  const [currentSlides, setCurrentSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let amount;
    if (viewport === 'desktop') {
      amount = 6;
    } else if (viewport === 'tablet') {
      amount = 4;
    } else if (viewport === 'mobile') {
      amount = 2;
    } else {
      amount = 6;
    }
    setCurrentSlides(brands.slice(0, amount));
  }, [brands, viewport]);

  const handleSwipeLeft = () => {
    const nextSlidesIndex = currentIndex - productsByDevice;
    if (nextSlidesIndex >= 0) {
      setCurrentSlides(
        brands.slice(nextSlidesIndex, nextSlidesIndex + productsByDevice)
      );
      setCurrentIndex(nextSlidesIndex);
    } else {
      setCurrentSlides(brands.slice(brands.length - productsByDevice));
      setCurrentIndex(brands.length - productsByDevice);
    }
  };

  const handleSwipeRight = () => {
    const nextSlidesIndex = currentIndex + productsByDevice;
    if (nextSlidesIndex <= brands.length - productsByDevice) {
      setCurrentSlides(
        brands.slice(nextSlidesIndex, nextSlidesIndex + productsByDevice)
      );
      setCurrentIndex(nextSlidesIndex);
    } else {
      setCurrentSlides(brands.slice(0, productsByDevice));
      setCurrentIndex(0);
    }
  };

  const productsByDevice = currentSlides.length;

  return (
    <section className='container'>
      <div className={styles.brands}>
        <button className={styles.brandsBtn} onClick={handleSwipeLeft}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className={styles.brandsWrapper}>
          <SwipeableContainer
            className={styles.brandsWrapper}
            leftAction={handleSwipeLeft}
            rightAction={handleSwipeRight}
          >
            {currentSlides.map(brand => (
              <div className={styles.brand} key={brand.id}>
                <img src={brand.image} alt={brand.id} />
              </div>
            ))}
          </SwipeableContainer>
        </div>
        <button className={styles.brandsBtn} onClick={handleSwipeRight}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </section>
  );
};

export default Brands;
