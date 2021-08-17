import React, { Component } from "react";
import { getMainPosts } from "../utils/api";
import Loading from "./Loading";
import PostList from "./PostList";
import PropTypes from "prop-types";

export default class Posts extends Component {
  state = {
    loading: true,
    posts: null,
    error: null,
  };

  static propTypes = {
    type: PropTypes.oneOf(["newstories", "topstories"]),
  };

  componentDidMount() {
    this.updatePosts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.updatePosts();
    }
  }

  updatePosts = () => {
    this.setState({
      posts: null,
      error: null,
      loading: true,
    });

    getMainPosts(this.props.type, 50)
      .then((posts) => {
        this.setState({ posts, error: null, loading: false });
      })
      .catch(({ message }) =>
        this.setState({ posts: null, error: message, loading: false })
      );
  };

  render() {
    const { posts, error, loading } = this.state;

    return (
      <>
        {error && <p className="center-text error">{error}</p>}
        {loading && <Loading />}
        {posts && <PostList posts={posts} />}
      </>
    );
  }
}
