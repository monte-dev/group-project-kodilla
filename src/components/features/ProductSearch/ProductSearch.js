import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import styles from './ProductSearch.module.scss';

import { getAll } from '../../../redux/categoriesRedux';
import { useDispatch, useSelector } from 'react-redux';
import { filterString } from '../../../redux/searchStringRedux';
import { getLastSearch } from '../../../redux/lastSearchRedux';
import { lastSearch } from '../../../redux/lastSearchRedux';
import { gerFilteredProducts } from '../../../redux/productsRedux';
import { filterCategory } from '../../../redux/searchCategoryRedux';

const ProductSearch = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [searchString, setSearchString] = useState(
    useSelector(state => state.searchString)
  );
  const [selectCategory, setSelectCategory] = useState('');
  const [activeFocus, setActiveFocus] = useState(false);
  const categories = useSelector(getAll);

  const findLastSearch = useSelector(getLastSearch);

  // const searchCategory = useSelector(state => state.searchCategory);

  const queryParams = new URLSearchParams(window.location.search);

  if (selectCategory !== '') {
    queryParams.set('name', searchString);
    queryParams.set('category', selectCategory);
  } else {
    queryParams.set('name', searchString);
  }
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(filterString(searchString));
    dispatch(filterCategory(selectCategory.toLowerCase()));

    if (findLastSearch.length === 5) {
      findLastSearch.shift();
      findLastSearch.push(searchString);
      dispatch(lastSearch(findLastSearch));
      history.push({
        pathname: '/results',
        search: queryParams.toString(),
      });
    } else {
      findLastSearch.push(searchString);
      dispatch(lastSearch(findLastSearch));
      history.push({
        pathname: '/results',
        search: queryParams.toString(),
      });
    }
  };

  const handleChangeString = string => {
    setSearchString(string);
    setActiveFocus(false);
  };

  const focusOut = () => {
    setTimeout(() => {
      setActiveFocus(false);
    }, 250);
  };

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit} className={styles.searchField}>
        <div className={styles.category}>
          <FontAwesomeIcon className={styles.icon} icon={faListUl} />
          <ul>
            <li className={styles.visibleList}>
              <span className={styles.hide} value={selectCategory}>
                {selectCategory !== '' ? selectCategory : 'Select a category'}
              </span>
              {categories.map(category => (
                <ul className={styles.hiddenList} key={category.id}>
                  <li
                    className={styles.visibleCategory}
                    onClick={() => setSelectCategory(category.name)}
                  >
                    {category.name}
                  </li>
                </ul>
              ))}
            </li>
          </ul>
          <FontAwesomeIcon className={styles.icon} icon={faCaretDown} />
        </div>
        <div className={styles.searchField}>
          <div className={styles.autocomplete}>
            <input
              value={searchString}
              placeholder='Search products...'
              type='text'
              onChange={e => setSearchString(e.target.value.replace(/[^\w\s]/gi, ''))}
              required
              onFocus={() => setActiveFocus(true)}
              onBlur={() => focusOut()}
            />
            {activeFocus && findLastSearch.length > 0 && (
              <div className={styles.autocompleteItems}>
                {findLastSearch.map(item => (
                  <div key={item} onClick={() => handleChangeString(item)}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type='submit'>
            <FontAwesomeIcon className={styles.icon} icon={faSearch} />
          </button>
        </div>
      </form>
    </div>
  );
};

ProductSearch.propTypes = {
  children: PropTypes.node,
};

export default ProductSearch;
