import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './NewFurniture.module.scss';
import ProductBox from '../../common/ProductBox/ProductBox';

import StickyBar from '../StickyBar/StickyBar';
import Button from '../../common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

import clsx from 'clsx';
import scssVariables from '../../../styles/settings.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/cartRedux';

import SwipeableContainer from '../SwipeableWrapper/SwipeableContainer';

const NewFurniture = ({ categories, products }) => {
  const [activePage, setActivePage] = useState(0);
  const [activeCategory, setActiveCategory] = useState('bed');
  const [fade, setFade] = useState(true);

  const dispatch = useDispatch();

  //Adding To Cart from localStorage
  useEffect(() => {
    if (localStorage.getItem('pageCart')) {
      const products = JSON.parse(localStorage.getItem('pageCart'));
      products.forEach(product => {
        const name = product.name;
        const price = product.price;
        dispatch(addProduct({ name, price }));
      });
    }
  }, [dispatch]);

  const handlePageChange = newPage => {
    setActivePage(newPage);
    setFade(false);
    setTimeout(() => {
      setActivePage(newPage);
      setFade(true);
    }, parseInt(scssVariables.fadeTime));
  };

  const handleCategoryChange = newCategory => {
    setActiveCategory(newCategory);
    setFade(false);
    setTimeout(() => {
      setActiveCategory(newCategory);
      setFade(true);
    }, parseInt(scssVariables.fadeTime));
  };

  const categoryProducts = products.filter(item => item.category === activeCategory);
  const pagesCount = Math.ceil(categoryProducts.length / 8);

  const comparedProducts = products.filter(item => item.comparison === true);

  const dotsMemoized = useMemo(() => {
    const dots = [];
    for (let i = 0; i < pagesCount; i++) {
      dots.push(
        <li key={i}>
          <a
            onClick={() => handlePageChange(i)}
            className={i === activePage ? styles.active : undefined}
          >
            page {i}
          </a>
        </li>
      );
    }
    return dots;
  }, [pagesCount, activePage]);

  const handleSwipeLeft = () => {
    if (activePage > 0) {
      setActivePage(activePage - 1);
    }
  };

  const handleSwipeRight = () => {
    if (activePage < pagesCount - 1) {
      setActivePage(activePage + 1);
    }
  };

  const reduxViewport = useSelector(state => state.viewport);
  let viewport = reduxViewport || '';

  let productsByDevice = useMemo(() => {
    let amount;
    if (viewport === 'desktop') {
      amount = 8;
    } else if (viewport === 'tablet') {
      amount = 4;
    } else if (viewport === 'mobile') {
      amount = 2;
    } else {
      amount = 8;
    }
    return amount;
  }, [viewport]);

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.panelBar}>
          <div className='row ms-0 w-100 no-gutters align-items-end'>
            <div className={`col-auto ps-0 ${styles.heading}`}>
              <h3>New furniture</h3>
            </div>
            <div className={`col ${styles.menu}`}>
              <ul>
                {categories.map(item => (
                  <li key={item.id}>
                    <a
                      className={item.id === activeCategory ? styles.active : undefined}
                      onClick={() => handleCategoryChange(item.id)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`col-auto ${styles.dots}`}>
              <ul>{dotsMemoized}</ul>
            </div>
          </div>
        </div>
        <SwipeableContainer leftAction={handleSwipeLeft} rightAction={handleSwipeRight}>
          <div className={clsx('row', fade ? styles.fadeIn : styles.fadeOut)}>
            {categoryProducts
              .slice(activePage * productsByDevice, (activePage + 1) * productsByDevice)
              .map(item => (
                <div key={item.id} className='col-xl-3 col-md-6 col-sm-12'>
                  <ProductBox {...item} />
                </div>
              ))}
          </div>
          {comparedProducts.length > 0 && (
            <div className={styles.sticky}>
              {comparedProducts.map(product => (
                <StickyBar key={product.id} {...product} />
              ))}
              <div className={styles.comparedButton}>
                <Button variant='outline'>
                  <FontAwesomeIcon icon={faExchangeAlt}>Add to compare</FontAwesomeIcon>
                </Button>
              </div>
            </div>
          )}
        </SwipeableContainer>
      </div>
    </div>
  );
};

NewFurniture.propTypes = {
  children: PropTypes.node,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      category: PropTypes.string,
      price: PropTypes.number,
      stars: PropTypes.number,
      promo: PropTypes.string,
      newFurniture: PropTypes.bool,
    })
  ),
};

NewFurniture.defaultProps = {
  categories: [],
  products: [],
};

export default NewFurniture;
