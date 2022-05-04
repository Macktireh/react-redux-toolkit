import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "../feature/articles.slice";

export default configureStore({
  reducer: {
    articles: articlesReducer,
  },
});
