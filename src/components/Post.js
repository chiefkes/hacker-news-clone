import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { getItem, getComments } from "../utils/api";
import Loading from "./Loading";
import MetaInfo from "./MetaInfo";
import Comments from "./Comments";

function postReducer(state, action) {
  switch (action.type) {
    case "fetch":
      return {
        post: null,
        comments: null,
        error: null,
      };
    case "post":
      return {
        ...state,
        post: action.post,
      };

    case "comments":
      return {
        ...state,
        comments: action.comments,
      };

    case "error":
      return {
        posts: null,
        comments: null,
        error: action.message,
      };

    default:
      throw new Error("Unknown action type in postReducer");
  }
}

export default function Post({ location: { search } }) {
  const [{ post, comments, error }, dispatch] = useReducer(postReducer, {
    post: null,
    comments: null,
    error: null,
  });

  useEffect(() => {
    let { id } = queryString.parse(search);
    dispatch({ type: "fetch" });
    getItem(id)
      .then((post) => {
        dispatch({ type: "post", post });
        return post;
      })
      .then(({ kids }) => (kids ? getComments(kids) : null))
      .then((comments) => dispatch({ type: "comments", comments }))
      .catch(({ message }) => dispatch({ type: "error", message }));
  }, [search]);

  if (error) return <p className="center-text error">{error}</p>;

  if (!post) return <Loading text="Fetching post" />;

  return (
    <>
      <h1 className="header">
        <a className="link" href={post.url}>
          {post.title}
        </a>
      </h1>
      <MetaInfo
        id={post.id}
        by={post.by}
        time={post.time}
        descendants={post.descendants}
      />
      <p
        dangerouslySetInnerHTML={{
          __html: post.text,
        }}
      />
      {post.descendants > 0 &&
        (comments ? (
          <Comments comments={comments} />
        ) : (
          <Loading text="Fetching comments" />
        ))}
    </>
  );
}

Post.propTypes = {
  location: PropTypes.object.isRequired,
};
