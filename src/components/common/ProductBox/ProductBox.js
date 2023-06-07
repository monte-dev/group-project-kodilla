import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './ProductBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Button from '../Button/Button';
import {
  getComparedProducts,
  toggleCompared,
  toggleFavorite,
} from '../../../redux/productsRedux';
import { useDispatch, useSelector } from 'react-redux';
import RatingStars from '../../features/RatingStars/RatingStars';
import { addProduct, loadCart } from '../../../redux/cartRedux';

const ProductBox = ({
  id,
  name,
  price,
  promo,
  stars,
  image,
  favorite,
  comparison,
  myRating,
  salePrice,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(toggleFavorite(id));
  };

  const comparedProducts = useSelector(state => getComparedProducts(state));

  const handleCompared = () => {
    if (comparedProducts.length < 4 || comparison) {
      dispatch(toggleCompared(id));
    }
  };

  const handleAddToCart = e => {
    e.preventDefault();
    dispatch(addProduct({ name, price }));
  };

  return (
    <div className={styles.root}>
      <div className={styles.photo}>
        {<img src={image} alt={'furniture' + name} />}
        {promo && <div className={styles.sale}>{promo}</div>}
        <div className={styles.buttons}>
          <Button variant='small'>Quick View</Button>
          <Button variant='small' onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon> ADD TO CART
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <h5>{name}</h5>
        <div className={styles.stars}>
          <RatingStars id={id} ratingStar={stars} rating={myRating} />
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.actions}>
        <div className={styles.outlines}>
          <Button
            noHover
            variant='outline'
            className={styles.buttonFavorite + (favorite ? ' ' + styles.active : '')}
            onClick={() => handleSubmit()}
          >
            <FontAwesomeIcon icon={faHeart}>Favorite</FontAwesomeIcon>
          </Button>
          <Button
            noHover
            variant='outline'
            className={
              (comparedProducts.length === 4
                ? styles.buttonDisabled
                : styles.buttonFavorite) + (comparison ? ' ' + styles.active : '')
            }
            onClick={() => handleCompared()}
          >
            <FontAwesomeIcon icon={faExchangeAlt}>Add to compare</FontAwesomeIcon>
          </Button>
        </div>
        <span className={styles.oldPrice}>{salePrice ? `$ ${price}` : null}</span>
        <div>
          <Button noHover variant='small' className={styles.price}>
            $ {salePrice ? salePrice : price}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductBox.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  price: PropTypes.number,
  salePrice: PropTypes.number,
  promo: PropTypes.string,
  stars: PropTypes.number,
  image: PropTypes.string,
  favorite: PropTypes.bool,
  comparison: PropTypes.bool,
  id: PropTypes.string,
  myRating: PropTypes.number,
};

export default ProductBox;
