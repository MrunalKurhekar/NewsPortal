import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../Redux/articlesSlice';
import './CategoryFilter.css';

const categories = ['general', 'business', 'technology', 'entertainment'];

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.articles.currentCategory);

  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={currentCategory === category ? 'active' : ''}
          onClick={() => dispatch(setCategory(category))}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
