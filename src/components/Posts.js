import React, { useEffect, useReducer } from "react";
import { getMainPosts } from "../utils/api";
import Loading from "./Loading";
import PostList from "./PostList";
import PropTypes from "prop-types";

function postsReducer(state, action) {
  switch (action.type) {
    case "fetch":
      return {
        ...state,
        loading: true,
      };
    case "success":
      return {
        posts: action.posts,
        loading: false,
        error: null,
      };

    case "error":
      return {
        ...state,
        loading: false,
        error: action.message,
      };

    default:
      throw new Error("Unknown action in postsReducer");
  }
}

export default function Posts({ type }) {
  const [{ posts, loading, error }, dispatch] = useReducer(postsReducer, {
    posts: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: "fetch" });
    getMainPosts(type, 50)
      .then((posts) => {
        dispatch({ type: "success", posts });
      })
      .catch(({ message }) => dispatch({ type: "error", message }));
  }, [type]);

  if (error) return <p className="center-text error">{error}</p>;
  if (loading) return <Loading />;
  return posts && <PostList posts={posts} />;
}

Posts.propTypes = {
  type: PropTypes.oneOf(["newstories", "topstories"]).isRequired,
};
