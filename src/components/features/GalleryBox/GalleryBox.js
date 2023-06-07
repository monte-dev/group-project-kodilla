import React, { useState, useEffect } from 'react';
import styles from './GalleryBox.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import RatingStars from '../RatingStars/RatingStars';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import {
  getComparedProducts,
  getProductById,
  getProductBySpecialAction,
  toggleCompared,
  toggleFavorite,
} from '../../../redux/productsRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExchangeAlt,
  faShoppingBasket,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faEye } from '@fortawesome/free-regular-svg-icons';
import { useMediaQuery } from 'react-responsive';
import { addProduct } from '../../../redux/cartRedux';
import { getAllSpecialActions } from '../../../redux/specialActionsRedux';
import scssVariables from '../../../styles/settings.scss';

const GalleryBox = () => {
  const specialActions = useSelector(getAllSpecialActions());
  const [specialAction, setSpecialAction] = useState('featured');
  const products = useSelector(state =>
    getProductBySpecialAction(state, specialAction)
  );
  const [activeId, setActiveId] = useState('');

  const productActive = useSelector(state => getProductById(state, activeId));
  const comparedProducts = useSelector(state => getComparedProducts(state));

  const dispatch = useDispatch();

  const [activePage, setActivePage] = useState(0);
  const [activeImage, setActiveImage] = useState('');
  const [favorite, setFavorite] = useState('');
  const [comparison, setComparison] = useState('');
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [myRating, setMyRating] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [fade, setFade] = useState(true);
  useEffect(() => {
    if (productActive !== undefined) {
      setMyRating(productActive.myRating);
      setFavorite(productActive.favorite);
      setComparison(productActive.comparison);
    }
  }, [productActive]);

  const pagesCount = Math.ceil(products.length / 6);
  const handlePageRight = () => {
    if (activePage < pagesCount - 1) {
      setActivePage(activePage + 1);
    }
  };
  const handlePageLeft = () => {
    if (activePage > 0) {
      setActivePage(activePage - 1);
    }
  };
  const handleImage = (
    image,
    id,
    productFavorite,
    productComparison,
    name,
    stars,
    myRatings,
    price,
    salePrice
  ) => {
    setFade(false);
    setTimeout(() => {
      setActiveImage(image);
      setActiveId(id);
      setFavorite(productFavorite);
      setComparison(productComparison);
      setName(name);
      setRating(stars);
      setMyRating(myRatings);
      setPrice(price);
      setSalePrice(salePrice);
      setFade(true);
    }, parseInt(scssVariables.fadeTime));
  };

  const handleFavorite = () => {
    dispatch(toggleFavorite(activeId));
    setFavorite(!favorite);
  };

  const handleCompared = () => {
    if (comparedProducts.length < 4 || comparison) {
      dispatch(toggleCompared(activeId));
      setComparison(!comparison);
    }
  };

  const handleRating = rat => {
    setMyRating(rat);
  };

  const sixPhotos = useMediaQuery({ minWidth: 1200 });
  const fourPhotos = useMediaQuery({ minWidth: 996, maxWidth: 1199 });
  const threePhotos = useMediaQuery({ minWidth: 768, maxWidth: 995 });
  const fivePhotos = useMediaQuery({ minWidth: 460, maxWidth: 767 });
  const twoPhotos = useMediaQuery({ maxWidth: 320 });
  const threePhotosSmall = useMediaQuery({ minWidth: 321, maxWidth: 459 });
  const handleAddToCart = () => {
    dispatch(addProduct({ name, price }));
  };

  const handleActionChange = newAction => {
    setSpecialAction(newAction);
    setFade(false);
    setTimeout(() => {
      setActivePage(0);
      setActiveImage('');
      setActiveId('');
      setFavorite('');
      setComparison('');
      setName('');
      setRating('');
      setMyRating('');
      setPrice('');
      setSalePrice('');
      setFade(true);
    }, parseInt(scssVariables.fadeTime));
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.panelBar}>
          <div className={'row justify-content-around ' + styles.box}>
            <div className={`col-12 col-md-6 ps-0 ${styles.firstColumn}`}>
              <div className='row ms-0 w-100 no-gutters align-items-start'>
                <div className={styles.heading}>
                  <h3>Furniture Gallery</h3>
                </div>
              </div>
              <div className={styles.boxSlider}>
                <div className={styles.menu}>
                  <ul>
                    {specialActions.map(item => (
                      <li key={item.id}>
                        <a
                          className={
                            item.id === specialAction ? styles.active : undefined
                          }
                          onClick={() => handleActionChange(item.id)}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={
                    (fade ? styles.fadeIn : styles.fadeOut) + ' ' + styles.imgCarousel
                  }
                >
                  {activeImage !== '' && (
                    <>
                      <img src={activeImage} alt={name} />
                      <div className={styles.buttons}>
                        {' '}
                        <OverlayTrigger
                          placement='right'
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip id='button-tooltip-2'>Add to favorite</Tooltip>
                          }
                        >
                          <Button
                            noHover
                            variant='outline'
                            className={
                              styles.buttonFavorite +
                              (favorite ? ' ' + styles.activeButton : '')
                            }
                            onClick={() => handleFavorite()}
                          >
                            <FontAwesomeIcon icon={faHeart}>Favorite</FontAwesomeIcon>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement='right'
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip id='button-tooltip-2'>Add to compare</Tooltip>
                          }
                        >
                          <Button
                            noHover
                            variant='outline'
                            className={
                              (comparedProducts.length === 4
                                ? styles.buttonDisabled
                                : styles.buttonFavorite) +
                              (comparison ? ' ' + styles.activeButton : '')
                            }
                            onClick={() => handleCompared()}
                          >
                            <FontAwesomeIcon icon={faExchangeAlt}>
                              Add to compare
                            </FontAwesomeIcon>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement='right'
                          delay={{ show: 250, hide: 400 }}
                          overlay={<Tooltip id='button-tooltip-2'>Show more</Tooltip>}
                        >
                          <Button
                            noHover
                            variant='outline'
                            className={styles.buttonFavorite}
                          >
                            <FontAwesomeIcon icon={faEye}>Show</FontAwesomeIcon>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement='right'
                          delay={{ show: 250, hide: 400 }}
                          overlay={<Tooltip id='button-tooltip-2'>Add to cart</Tooltip>}
                        >
                          <Button
                            noHover
                            variant='outline'
                            className={styles.buttonFavorite}
                            onClick={handleAddToCart}
                          >
                            <FontAwesomeIcon icon={faShoppingBasket}>
                              Show
                            </FontAwesomeIcon>
                          </Button>
                        </OverlayTrigger>
                      </div>
                      <div className={styles.price}>
                        <span className={styles.productPrice}>${price}</span>
                        {salePrice !== '' && salePrice !== undefined && (
                          <span
                            className={styles.productSalePrice}
                          >{`$ ${salePrice}`}</span>
                        )}
                      </div>
                      <div className={styles.description}>
                        <div className={styles.rotateBoxLeft}></div>
                        {name}
                        <RatingStars
                          id={activeId}
                          ratingStar={rating}
                          rating={myRating}
                          action={handleRating}
                        />
                        <div className={styles.rotateBoxRight}></div>
                      </div>
                    </>
                  )}
                </div>
                <div
                  className={
                    (fade ? styles.fadeIn : styles.fadeOut) + ' ' + styles.thumbnail
                  }
                >
                  <Button
                    noHover
                    variant='small'
                    className={styles.prevNext}
                    onClick={() => handlePageLeft()}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </Button>
                  {sixPhotos &&
                    products
                      .slice(activePage * 6, (activePage + 1) * 6)
                      .map(product => (
                        <div
                          key={product.id}
                          className={
                            (fade ? styles.fadeIn : styles.fadeOut) +
                            ' ' +
                            styles.btnImage +
                            ' ' +
                            (activeId === product.id ? styles.active : undefined)
                          }
                          onClick={() =>
                            handleImage(
                              product.image,
                              product.id,
                              product.favorite,
                              product.comparison,
                              product.name,
                              product.stars,
                              product.myRating,
                              product.price,
                              product.salePrice
                            )
                          }
                        >
                          <img src={product.image} alt={product.name} />
                        </div>
                      ))}
                  {fourPhotos &&
                    products
                      .slice(activePage * 4, (activePage + 1) * 4)
                      .map(product => (
                        <div
                          key={product.id}
                          className={
                            (fade ? styles.fadeIn : styles.fadeOut) +
                            ' ' +
                            styles.btnImage +
                            ' ' +
                            (activeId === product.id ? styles.active : undefined)
                          }
                          onClick={() =>
                            handleImage(
                              product.image,
                              product.id,
                              product.favorite,
                              product.comparison,
                              product.name,
                              product.stars,
                              product.myRating,
                              product.price,
                              product.salePrice
                            )
                          }
                        >
                          <img src={product.image} alt={product.name} />
                        </div>
                      ))}
                  {threePhotos &&
                    products
                      .slice(activePage * 3, (activePage + 1) * 3)
                      .map(product => (
                        <div
                          key={product.id}
                          className={
                            (fade ? styles.fadeIn : styles.fadeOut) +
                            ' ' +
                            styles.btnImage +
                            ' ' +
                            (activeId === product.id ? styles.active : undefined)
                          }
                          onClick={() =>
                            handleImage(
                              product.image,
                              product.id,
                              product.favorite,
                              product.comparison,
                              product.name,
                              product.stars,
                              product.myRating,
                              product.price,
                              product.salePrice
                            )
                          }
                        >
                          <img src={product.image} alt={product.name} />
                        </div>
                      ))}
                  {fivePhotos &&
                    products
                      .slice(activePage * 5, (activePage + 1) * 5)
                      .map(product => (
                        <div
                          key={product.id}
                          className={
                            (fade ? styles.fadeIn : styles.fadeOut) +
                            ' ' +
                            styles.btnImage +
                            ' ' +
                            (activeId === product.id ? styles.active : undefined)
                          }
                          onClick={() =>
                            handleImage(
                              product.image,
                              product.id,
                              product.favorite,
                              product.comparison,
                              product.name,
                              product.stars,
                              product.myRating,
                              product.price,
                              product.salePrice
                            )
                          }
                        >
                          <img src={product.image} alt={product.name} />
                        </div>
                      ))}
                  {threePhotosSmall &&
                    products
                      .slice(activePage * 3, (activePage + 1) * 3)
                      .map(product => (
                        <div
                          key={product.id}
                          className={
                            (fade ? styles.fadeIn : styles.fadeOut) +
                            ' ' +
                            styles.btnImage +
                            ' ' +
                            (activeId === product.id ? styles.active : undefined)
                          }
                          onClick={() =>
                            handleImage(
                              product.image,
                              product.id,
                              product.favorite,
                              product.comparison,
                              product.name,
                              product.stars,
                              product.myRating,
                              product.price,
                              product.salePrice
                            )
                          }
                        >
                          <img src={product.image} alt={product.name} />
                        </div>
                      ))}
                  {twoPhotos &&
                    products
                      .slice(activePage * 2, (activePage + 1) * 2)
                      .map(product => (
                        <div
                          key={product.id}
                          className={
                            (fade ? styles.fadeIn : styles.fadeOut) +
                            ' ' +
                            styles.btnImage +
                            ' ' +
                            (activeId === product.id ? styles.active : undefined)
                          }
                          onClick={() =>
                            handleImage(
                              product.image,
                              product.id,
                              product.favorite,
                              product.comparison,
                              product.name,
                              product.stars,
                              product.myRating,
                              product.price,
                              product.salePrice
                            )
                          }
                        >
                          <img src={product.image} alt={product.name} />
                        </div>
                      ))}
                  <Button
                    noHover
                    variant='small'
                    className={styles.prevNext}
                    onClick={() => handlePageRight()}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Button>
                </div>
              </div>
            </div>
            <div className={`col-6-lg d-none d-md-block col-12 ${styles.galleryRight}`}>
              <div className={styles.content}>
                <p className={styles.textFrom}>
                  From <span className={styles.price}>$50.80</span>
                </p>
                <p className={styles.productName}>Bedroom bed</p>
                <Button noHover variant='small' className={styles.buttonShop}>
                  SHOP NOW
                </Button>
              </div>
              <div className={styles.imgBox}>
                <img
                  src='./images/gallery/bedroom-bed.png'
                  alt='bedroom-bed'
                  className={styles.img}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryBox;
