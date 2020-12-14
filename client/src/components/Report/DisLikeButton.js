import React from 'react'

export default function DisLikeButton({dislike}) {
    return (
        <div>
        <strong>{dislike}</strong>
        <button>DisLike</button>
        </div>
    )
}
