import React from "react";

export default function LikeButton({ like, upVote }) {
  return (
    <div id="button">
      <strong className="no">{like}</strong>
      <button className="btn success" onClick={upVote}>
        Like
      </button>
    </div>
  );
}
