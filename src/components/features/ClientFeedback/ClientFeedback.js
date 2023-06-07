import React, { useCallback } from 'react';
import styles from './ClientFeedback.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import SwipeableContainer from '../SwipeableWrapper/SwipeableContainer';
import scssVariables from '../../../styles/settings.scss';

const ClientFeedback = () => {
  const feedbacks = useSelector(state => state.feedbacks);

  const [activePage, setActivePage] = useState(0);
  const [activeFeedback, setActiveFeedback] = useState(0);
  const [fade, setFade] = useState(true);

  const handlePageChange = useCallback(
    newPage => {
      setActivePage(newPage);
      setFade(false);
      setTimeout(() => {
        setActivePage(newPage);
        setActiveFeedback(feedbacks[newPage]);
        setFade(true);
      }, parseInt(scssVariables.fadeTime));
    },
    [feedbacks]
  );

  const pagesCount = feedbacks.length;

  const dotsMemoized = useMemo(() => {
    const dots = [];
    for (let i = 0; i < pagesCount; i++) {
      dots.push(
        <li key={i}>
          <a
            onClick={() => handlePageChange(i)}
            className={i === activePage ? styles.active : undefined}
          >
            <FontAwesomeIcon icon={faCircle} />
            page {i}
          </a>
        </li>
      );
    }
    return dots;
  }, [pagesCount, activePage, handlePageChange]);

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

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.panelBar}>
          <div className='row ms-0 w-100 no-gutters align-items-end'>
            <div className={`col-auto ps-0 ${styles.heading}`}>
              <h3>Client feedback</h3>
            </div>
            <div className={`col ${styles.menu}`}></div>
            <div className={`col-auto ${styles.dots}`}>
              <ul>{dotsMemoized}</ul>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.feedbackIcon}>
            <FontAwesomeIcon icon={faQuoteRight} />
          </div>
          <SwipeableContainer
            leftAction={handleSwipeLeft}
            rightAction={handleSwipeRight}
          >
            <div className={fade ? styles.fadeIn : styles.fadeOut}>
              <div key={feedbacks[activePage].id}>
                <div className={styles.feedbackText}>
                  {feedbacks[activePage].comment}
                </div>
                <div className={styles.feedbackClient}>
                  <div>
                    <img
                      src={feedbacks[activePage].image}
                      alt={'client' + activeFeedback.name}
                      className={styles.img}
                    />
                  </div>
                  <div className={styles.feedbackDetails}>
                    <p className={styles.name}>{feedbacks[activePage].name}</p>
                    <p className={styles.client}>{feedbacks[activePage].client}</p>
                  </div>
                </div>
              </div>
            </div>
          </SwipeableContainer>
        </div>
      </div>
    </div>
  );
};

export default ClientFeedback;
