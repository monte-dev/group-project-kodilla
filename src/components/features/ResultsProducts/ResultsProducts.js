import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ResultsProducts.module.scss';
import ProductBox from '../../common/ProductBox/ProductBox';

import StickyBar from '../StickyBar/StickyBar';
import Button from '../../common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

import clsx from 'clsx';
import scssVariables from '../../../styles/settings.scss';
import { useSelector } from 'react-redux';

import SwipeableContainer from '../SwipeableWrapper/SwipeableContainer';
import { gerFilteredProducts, getComparedProducts } from '../../../redux/productsRedux';

const ResultProducts = ({ products }) => {
  const [activePage, setActivePage] = useState(0);

  const [fade, setFade] = useState(true);

  const handlePageChange = newPage => {
    setActivePage(newPage);
    setFade(false);
    setTimeout(() => {
      setActivePage(newPage);
      setFade(true);
    }, parseInt(scssVariables.fadeTime));
  };
  const searchString = useSelector(state => state.searchString);
  const searchCategory = useSelector(state => state.searchCategory);

  const searchedProducts = useSelector(state => gerFilteredProducts(state));
  const pagesCount = Math.ceil(searchedProducts.length / 8);
  const comparedProducts = useSelector(state => getComparedProducts(state));

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
          <div className='row no-gutters align-items-end'>
            <div className={`col-auto ${styles.heading}`}>
              {searchedProducts.length > 0 ? (
                searchCategory !== '' ? (
                  <h3>{`Search result for name: ${searchString} and category: ${searchCategory}`}</h3>
                ) : (
                  <h3>{`Search result for name: ${searchString}`}</h3>
                )
              ) : (
                <h3>No products found</h3>
              )}
            </div>
            <div className={`col-auto ${styles.dots}`}>
              <ul>{dotsMemoized}</ul>
            </div>
          </div>
        </div>
        <SwipeableContainer leftAction={handleSwipeLeft} rightAction={handleSwipeRight}>
          <div className={clsx('row', fade ? styles.fadeIn : styles.fadeOut)}>
            {searchedProducts
              .slice(activePage * productsByDevice, (activePage + 1) * productsByDevice)
              .map(item => (
                <div key={item.id} className='col-xl-4 col-md-6 col-sm-12'>
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

ResultProducts.propTypes = {
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

ResultProducts.defaultProps = {
  categories: [],
  products: [],
};

export default ResultProducts;
