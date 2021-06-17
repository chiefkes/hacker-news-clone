import React, { Component } from "react";
import Posts from "./components/Posts";
import NavBar from "./components/NavBar";
import Loading from "./components/Loading";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  state = {
    theme: "light",
  };

  render() {
    return (
      //
      <Router>
        <div className={this.state.theme}>
          <div className="container">
            <NavBar />
            <Posts />
          </div>
        </div>
      </Router>
    );
  }
}
