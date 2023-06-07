import React from 'react';
import styles from './StickyBar.module.scss';
import Button from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { toggleCompared } from '../../../redux/productsRedux';

const StickyBar = ({ ...product }) => {
  const dispatch = useDispatch();
  const handleCompared = () => {
    dispatch(toggleCompared(product.id));
  };
  return (
    <div className={styles.compared}>
      <img src={product.image} alt={`${product.name}`} />
      <Button noHover className={styles.buttonRemove} onClick={() => handleCompared()}>
        X
      </Button>
    </div>
  );
};

export default StickyBar;
