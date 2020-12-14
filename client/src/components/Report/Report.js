import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Web3Context } from "../../context/Web3Context";
import axios from "axios";
import LikeButton from "./LikeButton";
import DisLikeButton from "./DisLikeButton";
import Spinner from "../Spinner/Spinner";
import './report.css';

export default function Report() {
  let { id } = useParams();
  const { accts, ins } = useContext(Web3Context);
  const [report, setReport] = useState({});
  const [Media, setMedia] = useState(false);
  const [like, setLike] = useState();
  const [disLike, setDisLike] = useState();

  async function upVote() {
    try {
      await ins.methods.upVoteReport(id).send({ from: accts });
      const response = await ins.methods.reports(id).call();
      setLike(response.upVote);
    } catch (error) {
      console.log(error);
    }
  }

  async function downVote() {
    try {
      await ins.methods.downVoteReport(id).send({ from: accts });
      const response = await ins.methods.reports(id).call();
      setLike(response.downVote);
    } catch (error) {
      console.log(error);
    }
  }

  const getReport = async () => {
    if (ins.methods) {
      const response = await ins.methods.reports(id).call();
      setReport(response);
      setLike(response.upVote);
      setDisLike(response.downVote);

      const { headers } = await axios.get(
        `https://ipfs.infura.io/ipfs/${response.fileHash}`
      );
      const myFileFormat = headers["content-type"];

      if (myFileFormat === "video/mp4") {
        let media = (
          <video width="320" height="240" controls>
            <source
              src={`https://ipfs.infura.io/ipfs/${response.fileHash}`}
              type="video/mp4"
            />
          </video>
        );
        setMedia(media);
      } else if (
        myFileFormat === "image/png" ||
        myFileFormat === "image/jpeg" ||
        myFileFormat === "image/jpg"
      ) {
        let media = (
          <a
            src={`https://ipfs.infura.io/ipfs/${response.fileHash}`}
            target="_blank"
          >
            <img
              src={`https://ipfs.infura.io/ipfs/${response.fileHash}`}
              width="320"
              height="240"
            ></img>
          </a>
        );
        setMedia(media);
      }
    }
  };

  useEffect(() => {
    getReport();
  }, [ins]);

  return (
    <div className="a">
      
      <h1 className="aa">{report.title}</h1>
      <span>{report.location}</span>
      
      <div className="ab">{Media ? Media : <Spinner />}</div>
      <p>{report.report}</p>
      
      <div className="ac">
        <DisLikeButton dislike={disLike} downVote={downVote} />
        <LikeButton like={like} upVote={upVote} />
      </div>
    
    </div>
  );
}
