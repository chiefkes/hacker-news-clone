import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { getUser, getPosts } from "../utils/api";
import MetaInfo from "./MetaInfo";
import Loading from "./Loading";
import PostList from "./PostList";

function userReducer(state, action) {
  switch (action.type) {
    case "fetch":
      return {
        user: null,
        posts: null,
        error: null,
      };
    case "user":
      return {
        ...state,
        user: action.user,
      };

    case "posts":
      return {
        ...state,
        posts: action.posts,
      };

    case "error":
      return {
        user: null,
        posts: null,
        error: action.message,
      };

    default:
      throw new Error("Unknown action type in userReducer");
  }
}

export default function User({ location: { search } }) {
  const [{ user, posts, error }, dispatch] = useReducer(userReducer, {
    user: null,
    posts: null,
    error: null,
  });

  useEffect(() => {
    const { id } = queryString.parse(search);
    dispatch({ type: "fetch" });
    getUser(id)
      .then((user) => {
        dispatch({ type: "user", user });
        return getPosts(user.submitted.slice(0, 30));
      })
      .then((posts) => dispatch({ type: "posts", posts }))
      .catch(({ message }) => dispatch({ type: "error", message }));
  }, [search]);

  if (error) return <p className="center-text error">{error}</p>;

  if (!user) return <Loading text="Fetching user" />;

  return (
    <>
      <h1 className="header">{user.id}</h1>
      <MetaInfo joined={user.created} karma={user.karma} />
      <p
        dangerouslySetInnerHTML={{
          __html: user.about,
        }}
      />
      <h2>Posts</h2>
      {!posts ? (
        <Loading text="Fetching posts" />
      ) : posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="center-text error">This user hasn't posted yet</p>
      )}
    </>
  );
}

User.propTypes = {
  location: PropTypes.object.isRequired,
};
