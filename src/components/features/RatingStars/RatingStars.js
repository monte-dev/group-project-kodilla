import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './RatingStars.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { addMyRating } from '../../../redux/productsRedux';

const RatingStars = ({ id, ratingStar, rating, action }) => {
  const [ratingOption, setRatingOption] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    rating === 0 || rating === undefined
      ? setRatingOption(ratingStar)
      : setRatingOption(rating);
  }, [rating, ratingStar]);

  const handleSubmit = selectRating => {
    if (selectRating === rating) {
      selectRating = 0;
    }
    selectRating === 0 ? setRatingOption(ratingStar) : setRatingOption(selectRating);
    dispatch(addMyRating({ myRating: selectRating, id }));
    if (action !== undefined) {
      handleAction(selectRating);
    }
  };
  const handleAction = rat => {
    action(rat);
  };
  return (
    <div className={styles.rating}>
      {[1, 2, 3, 4, 5].map((i, index) =>
        i <= ratingOption ? (
          <span
            key={index}
            className={rating > 0 ? styles.myRating : ''}
            onClick={() => handleSubmit(i)}
          >
            <FontAwesomeIcon
              icon={faStar}
              className={styles.myStandardRating}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={farStar}
              className={styles.setStandardRating}
            ></FontAwesomeIcon>
          </span>
        ) : (
          <span key={index} onClick={() => handleSubmit(i)}>
            <FontAwesomeIcon
              icon={farStar}
              className={styles.standardRating}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faStar}
              className={styles.mySetRating}
            ></FontAwesomeIcon>
          </span>
        )
      )}
    </div>
  );
};

RatingStars.propTypes = {
  id: PropTypes.string,
  ratingStar: PropTypes.number,
  rating: PropTypes.number,
  action: PropTypes.func,
};

export default RatingStars;
