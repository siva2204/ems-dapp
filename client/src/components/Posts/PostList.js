import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../../context/Web3Context";

import Outerlist from "../Outerlist/Outerlist";

var mockData = {
  URL: [
    `https://bafybeicafzqx32hvjxxvzfy7qlydtgsje5wom7mo3kfjtaxm456763yj5u.ipfs.infura-ipfs.io`,
    "https://ipfs.infura.io/ipfs/QmeWLQqJf94yf9ecktYvjJKXn3Kwsa6qjC4wCVe4ARFmsZ",
  ],
};

// class PostList extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       URL: mockData.URL,
//       data: [],
//     };
//   }

//   componentDidMount() {
//     let Infos = [];
//     this.state.URL.forEach((Url) => {
//       axios.get(Url).then((res) => {
//         console.log("fetched");
//         let info = {
//           content_type: res.headers["content-type"],
//           uploaded_date: res.headers["last-modified"],
//           url: Url,
//         };

//         Infos.push(info);

//         this.setState({
//           data: Infos,
//         });
//       });
//     });
//   }
//   render() {
//     console.log(this.state);
//     if (this.state.data) {
//       var posts = this.state.data.map(function (post) {
//         return (
//           <PostItem
//             title={"Title"}
//             date={post["uploaded_date"]}
//             key={"key" + post["url"]}
//             tag={post["content_type"]}
//             url={post["url"]}
//             likes={5}
//             dislikes={1}
//           >
//             ""
//           </PostItem>
//         );
//       });

//       return <div className="postList">{posts}</div>;
//     } else return <div className="postList"></div>;
//   }
// }

function PostList(props) {
  const { accts, ins } = useContext(Web3Context);
  const [post, setPost] = useState([]);

  const getPost = async () => {
    if (ins.methods) {
      const totalReports = await ins.methods.totalReports().call();
      if (totalReports !== 0) {
        const promise = [];
        for (let i = 0; i < totalReports; i++) {
          promise.push(ins.methods.reports(i + 1).call());
        }
        Promise.all(promise)
          .then((values) => {
            setPost(values);
          })
          .catch((err) => console.log(err));
      } else {
        setPost(0);
      }
    }
  };

  useEffect(() => {
    getPost();
  }, [ins]);

  if (post.length) {
    let posts = post.map(function (post) {
      return (
        <Outerlist
          key={post.id}
          title={post.title}
          upVote={post.upVote}
          downVote={post.downVote}
          id={post.id}
          location={post.location}
        />
      );
    });

    return <>{posts}</>;
  } else if (post == 0) {
    return <h1>No Reports!</h1>;
  } else
    return (
      <div>
        <p>Loading</p>
      </div>
    );
}

export { PostList };
