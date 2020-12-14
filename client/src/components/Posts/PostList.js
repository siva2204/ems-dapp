import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../../context/Web3Context";
import Spinner from "../Spinner/Spinner.js";
import Outerlist from "../Outerlist/Outerlist";

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
  } else return <Spinner />;
}

export { PostList };
