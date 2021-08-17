import React from "react";
import MetaInfo from "./MetaInfo";

export default function Comments({ comments }) {
  return comments.map((comment) => (
    <div className="comment" key={comment.id}>
      <MetaInfo by={comment.by} time={comment.time} />
      <p
        dangerouslySetInnerHTML={{
          __html: comment.text,
        }}
      />
    </div>
  ));
}
