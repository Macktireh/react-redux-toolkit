import { createSlice } from "@reduxjs/toolkit";

export const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: null,
  },
  reducers: {
    setArticleData: (state, { payload }) => {
      state.articles = payload;
    },
    addArticle: (state, { payload }) => {
      state.articles.push(payload);
    },
    editArticle: (state, { payload }) => {
      state.articles = state.articles.map((article) => {
        if (article.id === payload[0]) {
          return {
            ...article,
            content: payload[1],
          };
        } else {
          return article;
        }
      });
    },
    deleteArticle: (state, { payload }) => {
      state.articles = state.articles.filter(
        (article) => article.id !== payload
      );
    },
  },
});

export const { setArticleData, addArticle, editArticle, deleteArticle } =
  articlesSlice.actions;
export default articlesSlice.reducer;
