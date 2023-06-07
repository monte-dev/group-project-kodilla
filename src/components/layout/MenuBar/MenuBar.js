import React from 'react';
import PropTypes from 'prop-types';

import ProductSearch from '../../features/ProductSearch/ProductSearch';

import styles from './MenuBar.module.scss';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { getAll } from '../../../redux/categoriesRedux';

const MenuBar = ({ children, currentPath }) => {
  const subPages = useSelector(getAll);
  return (
    <div className={styles.root}>
      <div className='container'>
        <div className='row align-items-center'>
          <div className={styles.productSearch + ' col-lg-6 order-sm-2 '}>
            <ProductSearch />
          </div>
          <Navbar expand='sm' className={' order-lg-2 col-lg-6 ' + styles.menu}>
            <Container>
              <Navbar.Toggle
                aria-controls='basic-navbar-nav'
                className={'fs-6 border-0 ' + styles.button}
              >
                <FontAwesomeIcon icon={faBars} className={styles.icon} />
              </Navbar.Toggle>
              <Navbar.Collapse
                className={'bg-white ' + styles.navbarMenu}
                style={{ zIndex: 1 }}
                id='basic-navbar-nav'
          >
                <Nav className={'ms-lg-auto mr-auto ' + styles.navigation}>
                  <Nav.Link
                    href='/'
                    className={currentPath === '/' ? styles.active : ''}
                 >
                    Home
                  </Nav.Link>
                  {subPages.map(category => (
                    <Nav.Link
                      key={category.id}
                      href={`/shop/${category.id}`}
                      className={
                        currentPath === `/shop/${category.id}` ? styles.active : ''
                      }
                    >
                      {category.title}
                    </Nav.Link>
                  ))}
                  <Nav.Link className={styles.disabled} href='#'>
                    Blog
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    </div>
  );
};

MenuBar.propTypes = {
  children: PropTypes.node,
  currentPath: PropTypes.string,
};

export default MenuBar;
