import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteArticle } from "../feature/articles.slice";

const DeleteArticle = ({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Voulez vous vraiment cet article ?")) {
      axios
        .delete("http://localhost:3001/articles/" + id)
        .then(() => dispatch(deleteArticle(id)));
    }
  };

  return (
    <button type="submit" onClick={() => handleDelete()}>
      Supprimer
    </button>
  );
};

export default DeleteArticle;
