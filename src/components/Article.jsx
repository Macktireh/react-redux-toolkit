import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editArticle } from "../feature/articles.slice";
import DeleteArticle from "./DeleteArticle";

const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const dispatch = useDispatch();

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return newDate;
  };

  const handleEdit = () => {
    const data = {
      content: editContent,
    };
    if (editContent === "") {
      setIsEditing(false);
    } else {
      axios
        .patch("http://localhost:3001/articles/" + article.id, data)
        .then(() => {
          dispatch(editArticle([article.id, data.content]));
          setIsEditing(false);
        });
    }
  };

  return (
    <div
      className="article"
      style={{ backgroundColor: isEditing ? "#f3feff" : "white" }}
    >
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateParser(article.date)}</em>
      </div>

      {isEditing ? (
        <textarea
          autoFocus
          defaultValue={article.content}
          onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
      ) : (
        <p>{article.content}</p>
      )}

      <div className="btn-container">
        {isEditing ? (
          <button onClick={() => handleEdit()}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Modifier</button>
        )}
        <DeleteArticle id={article.id} />
      </div>
    </div>
  );
};

export default Article;
