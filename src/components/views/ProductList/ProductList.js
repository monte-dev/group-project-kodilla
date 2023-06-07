import React from 'react';
import ProductBox from '../../common/ProductBox/ProductBox';
import Brands from '../../features/Brands/Brands';
import styles from './ProductList.module.scss';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getCategoryById } from '../../../redux/categoriesRedux';
import { getProductsByCategory } from '../../../redux/productsRedux';
const ProductList = () => {
  const { categoryId } = useParams();
  const currentCategory = useSelector(categories =>
    getCategoryById(categories, categoryId)
  );
  const currentProducts = useSelector(products =>
    getProductsByCategory(products, currentCategory.id)
  );
  return (
    <div className={styles.root}>
      <div className='container'>
        <aside className={styles.sitePromotion}>
          <p>
            Bedroom <strong>Furniture</strong>
          </p>
          <p>
            Always <span>25%</span> off or more
          </p>
        </aside>
        <div className={styles.productsHeader}>
          <h2>{currentCategory.title}</h2>
        </div>
        <section className='row'>
          {currentProducts.map(item => (
            <div key={item.id} className='col-md-4 col-sm-12'>
              <ProductBox {...item} {...item.image} />
            </div>
          ))}
        </section>
        <Brands></Brands>
      </div>
    </div>
  );
};

export default ProductList;
