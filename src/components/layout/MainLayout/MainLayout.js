import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useDispatch } from 'react-redux';
import { setViewport } from '../../../redux/viewportRedux';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const updateViewport = () => {
      if (window.innerWidth >= 1024) {
        dispatch(setViewport('desktop'));
      } else if (window.innerWidth >= 768) {
        dispatch(setViewport('tablet'));
      } else {
        dispatch(setViewport('mobile'));
      }
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, [dispatch]);

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
