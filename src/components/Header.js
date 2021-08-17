import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Header({ title, url = null, id = null }) {
  return url !== null ? (
    <a href={url} className="link">
      {title}
    </a>
  ) : (
    <Link to={`/post?id=${id}`} className="link">
      {title}
    </Link>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  id: PropTypes.number,
};
