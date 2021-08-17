import React from "react";
import PropTypes from "prop-types";
import MetaInfo from "./MetaInfo";
import Header from "./Header";

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => {
        return (
          <li key={post.id} className="post">
            <Header url={post.url} title={post.title} id={post.id} />
            <MetaInfo
              id={post.id}
              by={post.by}
              time={post.time}
              descendants={post.descendants}
            />
          </li>
        );
      })}
    </ul>
  );
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};
