import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const styles = {
  fontSize: "35px",
  position: "absolute",
  left: "0",
  right: "0",
  marginTop: "20px",
  textAlign: "center",
};

export default function Loading({ text = "Loading", interval = 300 }) {
  const [content, setContent] = useState(text);

  useEffect(() => {
    let id = window.setInterval(() => {
      setContent((currContent) =>
        currContent === `${text}...` ? text : `${currContent}.`
      );
    }, interval);

    return () => window.clearInterval(id);
  }, [text, interval]);

  return (
    //
    <p style={styles}>{content}</p>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
  interval: PropTypes.number,
};
