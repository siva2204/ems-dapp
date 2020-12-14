import React from "react";

export default function LikeButton({like,upVote}) {
  return (
  <div>
  <strong>{like}</strong>
  <button onClick={upVote}>Like</button>
  </div>
  );
}
