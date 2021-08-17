import React, { Component } from "react";
import queryString from "query-string";
import { getUser, getPosts } from "../utils/api";
import MetaInfo from "./MetaInfo";
import Loading from "./Loading";
import PostList from "./PostList";

export default class User extends Component {
  state = {
    user: null,
    posts: null,
    error: null,
  };

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);

    getUser(id)
      .then((user) => {
        this.setState({
          user,
          error: null,
        });
        return getPosts(user.submitted.slice(0, 30));
      })
      .then((posts) => {
        this.setState({
          posts,
          error: posts.length > 0 ? null : "This user hasn't posted yet",
        });
      })
      .catch(({ message }) =>
        this.setState({
          user: null,
          posts: null,
          error: message,
        })
      );
  }

  render() {
    const { user, posts, error } = this.state;
    return (
      <>
        {user ? (
          <>
            <h1 className="header">{user.id}</h1>
            <MetaInfo joined={user.created} karma={user.karma} />
            <p
              dangerouslySetInnerHTML={{
                __html: user.about,
              }}
            />
            <h2>Posts</h2>
            {posts ? (
              <PostList posts={posts} />
            ) : (
              <Loading text="Fetching posts" />
            )}
          </>
        ) : (
          <Loading text="Fetching user" />
        )}
        {error && <p className="center-text error">{error}</p>}
      </>
    );
  }
}
