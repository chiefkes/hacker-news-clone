import React, { Component } from "react";
import { getPosts } from "../utils/api";
import { DateTime } from "luxon";
import Loading from "./Loading";

export default class Posts extends Component {
  state = {
    selectedPostType: "topstories",
    posts: null,
  };

  componentDidMount() {
    this.updatePosts(this.state.selectedPostType);
  }

  updatePosts = (type) => {
    getPosts(type, 50).then((posts) => {
      this.setState({ type, posts });
      // console.log(posts);
    });
  };

  render() {
    const { posts, selectedPostType } = this.state;
    return (
      //
      <ul>
        {posts ? (
          posts.map((post) => (
            <li key={post.id} className="post">
              <a className="link" href={post.url}>
                {post.title}
                <div className="meta-info-light">
                  <span>
                    by <a href="/">{post.by}</a>
                  </span>
                  <span>
                    on {DateTime.fromSeconds(post.time).toFormat("D, h:mm a")}
                  </span>
                  <span>
                    with <a href="/">{post.by}</a>
                  </span>
                </div>
              </a>
            </li>
          ))
        ) : (
          <Loading />
        )}
      </ul>
      // <div>
      //   <pre>{JSON.stringify(posts, null, 2)}</pre>
      // </div>
    );
  }
}
