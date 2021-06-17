import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
  fontSize: "35px",
  position: "absolute",
  left: "0",
  right: "0",
  marginTop: "20px",
  textAlign: "center",
};

export default class Loading extends Component {
  state = {
    text: this.props.text,
  };

  static propTypes = {
    text: PropTypes.string.isRequired,
    interval: PropTypes.number.isRequired,
  };

  static defaultProps = {
    text: "Loading",
    interval: 300,
  };

  componentDidMount() {
    const { interval, text: content } = this.props;

    this.interval = window.setInterval(() => {
      this.setState(({ text }) => ({
        text: text === content + "..." ? content : text + ".",
      }));
    }, interval);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      //
      <p style={styles}>{this.state.text}</p>
    );
  }
}
