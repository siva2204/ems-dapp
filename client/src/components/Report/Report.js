import React,{useState,useContext,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import{Web3Context} from "../../context/Web3Context";
import axios from "axios";
import LikeButton from './LikeButton';
import DisLikeButton from "./DisLikeButton";


export default function Report() {
    let {id} = useParams();
    const { accts,ins } = useContext(Web3Context);
    const[report,setReport] = useState({});
    const[Media,setMedia] = useState(false);
    const[like,setLike]  = useState();
    const[disLike,setDisLike] = useState();

    async function upVote() {
        try {
            const res = await ins.methods.upVoteReport(id).send({from:accts});
            console.log(res);
        } catch (error) {
            console.log(error);
        }
      
    }
   
    const getReport =  async ()=>{
       if(ins.methods){
            const response = await ins.methods.reports(id).call();
            setReport(response);
            setLike(response.upVote);
            setDisLike(response.downVote);
         
            const {headers} = await axios.get(`https://ipfs.infura.io/ipfs/${response.fileHash}`);
            const myFileFormat = headers["content-type"];

            if (myFileFormat === "video/mp4") {
                let media = (
                  <video width="320" height="240" controls>
                    <source src={`https://ipfs.infura.io/ipfs/${response.fileHash}`} type="video/mp4" />
                  </video>
                );
                setMedia(media);
              } else if (myFileFormat === "image/png" || myFileFormat === "image/jpeg" || myFileFormat === "image/jpg") {
                let media = (
                  <a src={`https://ipfs.infura.io/ipfs/${response.fileHash}`} target="_blank">
                    <img src={`https://ipfs.infura.io/ipfs/${response.fileHash}`} width="320" height="240"></img>
                  </a>
                );
                setMedia(media);
              }

        } 
    }


    useEffect(()=>{
        getReport();
    },[ins]);

    
        return (
        <>
          <h1>{report.title}</h1>
          <span>{report.location}</span>
          <div>{Media? Media :"loading"}</div>
          <p>{report.report}</p>
          <div>
              <DisLikeButton dislike={like}/>
              <LikeButton like={disLike} upVote={upVote}/>
          </div>

        </>
        );
}
