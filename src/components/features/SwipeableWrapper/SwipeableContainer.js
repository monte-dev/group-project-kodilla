import React from 'react';
import PropTypes from 'prop-types';
import Swipe from 'react-easy-swipe';

const SwipeableContainer = ({ className, leftAction, rightAction, children }) => {
  const handleSwipeLeft = () => {
    if (rightAction) {
      rightAction();
    }
  };

  const handleSwipeRight = () => {
    if (leftAction) {
      leftAction();
    }
  };

  return (
    <Swipe
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
      className={className}
    >
      {children}
    </Swipe>
  );
};

SwipeableContainer.propTypes = {
  leftAction: PropTypes.func.isRequired,
  rightAction: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default SwipeableContainer;
