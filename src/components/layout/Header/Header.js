import React from 'react';
// import PropTypes from 'prop-types';

import styles from './Header.module.scss';

import TopBar from '../TopBar/TopBar';
import CompanyClaim from '../CompanyClaim/CompanyClaim';
import MenuBar from '../MenuBar/MenuBar';

const Header = props => {
  const currentPath = window.location.pathname;
  return (
    <header className={styles.root}>
      <TopBar />
      <CompanyClaim />
      <MenuBar currentPath={currentPath} />
    </header>
  );
};

// Header.propTypes = {};

export default Header;
