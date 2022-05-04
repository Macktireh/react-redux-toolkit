import React, { useState } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addArticle, setArticleData } from "../feature/articles.slice";

const Form = () => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const dispatch = useDispatch();
  // const newsData = useSelector((state) => state.articles.articles);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      // id: newsData.length + 1,
      author,
      content,
      date: Date.now(),
    };

    if (author === "") {
      setAuthorError(true);
    } else if (content === "") {
      setContentError(true);
    } else {
      axios.post("http://localhost:3001/articles", data).then(() => {
        axios
          .get("http://localhost:3001/articles")
          .then((res) => dispatch(setArticleData(res.data)));
        setAuthor("");
        setContent("");
        setAuthorError(false);
        setContentError(false);
      });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        className={authorError ? "error" : ""}
        type="text"
        placeholder="Nom"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      {authorError && <p>Le nom de l'auteur est obligatoire</p>}
      <textarea
        className={contentError ? "error" : ""}
        placeholder="Message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      {contentError && <p>Veuillez écrire un minimum de 140 caractères.</p>}
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default Form;
