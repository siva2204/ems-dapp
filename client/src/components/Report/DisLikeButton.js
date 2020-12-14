import React from "react";

export default function DisLikeButton({ dislike, downVote }) {
  return (
    <div id="button">
      <strong className="no">{dislike}</strong>
      <button onClick={downVote} className="btn danger">
        DisLike
      </button>
    </div>
  );
}
