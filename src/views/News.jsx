import axios from "axios";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setArticleData } from "../feature/articles.slice";

import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Form from "../components/Form";
import Article from "../components/Article";

const News = () => {
  const dispatch = useDispatch();
  const newsData = useSelector((state) => state.articles.articles);

  useEffect(() => {
    axios
      .get("http://localhost:3001/articles")
      .then((res) => dispatch(setArticleData(res.data)));
  }, []);

  return (
    <div className="news-container">
      <Logo />
      <Navigation />
      <h1>News</h1>
      <Form />
      <ul>
        {newsData
          ? [...newsData]
              .sort((a, b) => b.date - a.date)
              .map((article, index) => (
                <Article key={index} article={article} />
              ))
          : ""}
      </ul>
    </div>
  );
};

export default News;
