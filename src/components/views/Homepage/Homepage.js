import React from 'react';
// import PropTypes from 'prop-types';

import styles from './Homepage.module.scss';

import FeatureBoxes from '../../features/FeatureBoxes/FeatureBoxes';
import NewFurniture from '../../features/NewFurniture/NewFurnitureContainer';
import GalleryBox from '../../features/GalleryBox/GalleryBox';
import Brands from '../../features/Brands/Brands';
import ClientFeedback from '../../features/ClientFeedback/ClientFeedback';
import PromotedProducts from '../../features/Promoted/PromotedProducts';
import Sales from '../../features/Sales/Sales';

const Homepage = () => (
  <div className={styles.root}>
    <PromotedProducts />
    <FeatureBoxes />
    <Sales />
    <NewFurniture />
    <GalleryBox />
    <Brands />
    <ClientFeedback />
  </div>
);

// Homepage.propTypes = {};

export default Homepage;
