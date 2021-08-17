import React, { useContext } from "react";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import ThemeContext from "../contexts/theme";

export default function MetaInfo(props) {
  const theme = useContext(ThemeContext);
  return (
    <div className={`meta-info-${theme}`}>
      {props.by && (
        <span>
          by <Link to={`user?id=${props.by}`}>{props.by}</Link>
        </span>
      )}
      {props.joined && (
        <span>
          joined{" "}
          <strong>
            {DateTime.fromSeconds(props.joined).toFormat("D, h:mm a")}
          </strong>
        </span>
      )}
      {props.time && (
        <span>on {DateTime.fromSeconds(props.time).toFormat("D, h:mm a")}</span>
      )}
      {props.descendants != null && (
        <span>
          with <Link to={`post?id=${props.id}`}>{props.descendants}</Link>{" "}
          comments
        </span>
      )}
      {props.karma && (
        <span>
          has <strong>{props.karma}</strong> karma
        </span>
      )}
    </div>
  );
}
