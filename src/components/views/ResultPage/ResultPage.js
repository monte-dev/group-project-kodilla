import React from 'react';

import styles from './ResultPage.module.scss';

import FeatureBoxes from '../../features/FeatureBoxes/FeatureBoxes';
import GalleryBox from '../../features/GalleryBox/GalleryBox';
import Brands from '../../features/Brands/Brands';
import ClientFeedback from '../../features/ClientFeedback/ClientFeedback';
import PromotedProducts from '../../features/Promoted/PromotedProducts';
import ResultProducts from '../../features/ResultsProducts/ResultsProducts';

const ResultPage = () => {
  return (
    <div className={styles.root}>
      <PromotedProducts />
      <FeatureBoxes />
      <ResultProducts />
      <GalleryBox />
      <Brands />
      <ClientFeedback />
    </div>
  );
};

export default ResultPage;
