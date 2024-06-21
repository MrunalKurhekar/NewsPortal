import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <img src={article.urlToImage} alt={article.title} />
      <div>
        <h2>{article.title}</h2>
        <p>{article.description}</p>
        <Link to={`/article/${article.title}`}>Read More</Link>
      </div>
    </div>
  );
};

export default ArticleCard;
