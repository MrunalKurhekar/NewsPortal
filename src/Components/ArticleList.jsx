import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArticleCard from './ArticleCard';
import { fetchArticles } from '../Redux/articlesSlice';
import Pagination from './Pagination';
import CategoryFilter from './CategoryFilter';
import './ArticleList.css';

const ArticleList = () => {
  const dispatch = useDispatch();
  const { articles, status, error, currentPage, currentCategory } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles(currentCategory, currentPage));
  }, [dispatch, currentCategory, currentPage]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <CategoryFilter />
      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.url} article={article} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default ArticleList;
