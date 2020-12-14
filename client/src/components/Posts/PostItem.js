//import logo from './logo.svg';
import "./Post.css";
import React, { Component } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

class Buttons extends Component {
  state = {
    like: this.props.likes,
    dislike: this.props.dislikes,
    likeActive: false,
    dislikeActive: false,
  };

  setDislike() {
    this.setState({
      dislikeActive: !this.state.dislikeActive,
      dislike: this.state.dislikeActive
        ? this.state.dislike - 1
        : this.state.dislike + 1,
    });
  }
  setLike() {
    this.setState({
      likeActive: !this.state.likeActive,
      like: this.state.likeActive ? this.state.like - 1 : this.state.like + 1,
    });
  }

  handleLike() {
    if (this.state.dislikeActive) {
      this.setLike();
      this.setDislike();
    }
    this.setLike();
  }

  handleDislike() {
    if (this.state.likeActive) {
      this.setDislike();
      this.setLike();
    }
    this.setDislike();
  }

  render() {
    let ThumbsUp_clr = "action";
    let ThumbsDown_clr = "action";

    if (this.state.likeActive) {
      ThumbsUp_clr = "primary";
      ThumbsDown_clr = "action";
    } else if (this.state.dislikeActive) {
      ThumbsUp_clr = "action";
      ThumbsDown_clr = "secondary";
    }

    return (
      <>
        <p id="btnn">
          <span id="thumbsDown">
            <ThumbDownIcon
              color={ThumbsDown_clr}
              onClick={() => this.handleDislike()}
            ></ThumbDownIcon>{" "}
            <p id="count">{this.state.dislike}</p>
          </span>

          <span id="thumbsUp">
            <ThumbUpIcon
              color={ThumbsUp_clr}
              onClick={() => this.handleLike()}
            ></ThumbUpIcon>{" "}
            <p id="count">{this.state.like}</p>
          </span>
        </p>
      </>
    );
  }
}

function Post(props) {
  let thisDate = new Date(props.date);
  let thisTag = props.tag;
  let thisUrl = props.url;

  let Media;
  console.log(thisTag);

  if (thisTag === "video/mp4") {
    Media = (
      <video width="320" height="240" controls>
        <source src={thisUrl} type="video/mp4" />
      </video>
    );
  } else if (thisTag === "image/png") {
    Media = (
      <a href={thisUrl} target="_blank">
        <img src={thisUrl} width="320" height="240"></img>
      </a>
    );
  }

  return (
    <div className="Post">
      <a href="javascript:void(0)">
        <h1 className="title" id={props.id}>
          {props.title}
        </h1>{" "}
      </a>
      <div className="media">{Media}</div>
      <br></br>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non lacus
      felis. Aenean vel leo id libero mollis auctor in a odio. Duis aliquet orci
      elementum, imperdiet ante et, consequat ipsum. Donec bibendum, ante varius
      volutpat blandit, ipsum leo aliquet nunc, a varius leo lectus id augue.
      Nullam feugiat sem sed lorem viverra, id pharetra tortor bibendum.
      <br></br>
      <p>{"Posted on " + thisDate.toLocaleString()}</p>
      {/* <Buttons likes={this.props.likes} dislikes={this.props.dislikes} /> */}
      <hr></hr>
    </div>
  );
}

export default Post;
