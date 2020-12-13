import React, { Component, useEffect, useState } from "react";
import "./Post.css";
import PostItem from "./PostItem.js";
import axios from "axios";

var mockData = {
  URL: [
    `https://bafybeicafzqx32hvjxxvzfy7qlydtgsje5wom7mo3kfjtaxm456763yj5u.ipfs.infura-ipfs.io`,
    "https://ipfs.infura.io/ipfs/QmeWLQqJf94yf9ecktYvjJKXn3Kwsa6qjC4wCVe4ARFmsZ",
  ],
};

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      URL: mockData.URL,
      data: [],
    };
  }

  componentDidMount() {
    let Infos = [];
    this.state.URL.forEach((Url) => {
      axios.get(Url).then((res) => {
        console.log("fetched");
        let info = {
          content_type: res.headers["content-type"],
          uploaded_date: res.headers["last-modified"],
          url: Url,
        };

        Infos.push(info);

        this.setState({
          data: Infos,
        });
      });
    });
  }

  render() {
    console.log(this.state);
    if (this.state.data) {
      var posts = this.state.data.map(function (post) {
        return (
          <PostItem
            title={"Title"}
            date={post["uploaded_date"]}
            key={"key" + post["url"]}
            tag={post["content_type"]}
            url={post["url"]}
            likes={5}
            dislikes={1}
          >
            ""
          </PostItem>
        );
      });

      return <div className="postList">{posts}</div>;
    } else return <div className="postList"></div>;
  }
}

function AllPost(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    mockData.URL.forEach(async (Url) => {
      const res = await axios.get(Url);
      let info = {
        content_type: res.headers["content-type"],
        uploaded_date: res.headers["last-modified"],
        url: Url,
      };
      setData((prevData) => [...prevData, info]);
    });
  }, []);

  if (data.length) {
    var posts = data.map(function (post) {
      return (
        <PostItem
          title={"Title"}
          date={post["uploaded_date"]}
          key={"key" + post["url"]}
          tag={post["content_type"]}
          url={post["url"]}
          // likes={5}
          // dislikes={1}
        />
      );
    });

    return <div className="postList">{posts}</div>;
  } else
    return (
      <div className="postList">
        <p>Loading</p>
      </div>
    );
}

export { AllPost };
