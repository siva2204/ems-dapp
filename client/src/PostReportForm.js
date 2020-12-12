import React, { useState,useContext } from "react";
import { Web3Context } from "./context/Web3Context";

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) 

function PostReportForm() {
    const { accts,ins } = useContext(Web3Context);

    const[title,setTitle] = useState("enter title");
    const[report,setReport] = useState("enter report");
    const[location,setLocation] = useState("enter loacation");
    const[file,setFile] = useState({});

    //listening to event from blockchain i.e contract
    if(ins.events){
      ins.events.reportUploaded().on("data",(e) => console.log(e,"updated successfully!"));
    }
     
    

    function fileToBuffer (e) {
        e.preventDefault();
        const uploadedFile = e.target.files[0];
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(uploadedFile)
        reader.onloadend = () => {
            setFile(reader.result);
        }
    }

    async function uploadReport(e) {
        e.preventDefault();
        console.log("uploading");
        try {
          const response = await ipfs.add(file);
          console.log(response);
          console.log(`https://ipfs.infura.io/ipfs/${response.path}`);
          // update in blockchain i.e contract
          await ins.methods.addReport(title,report,location,response.path).send({from:accts});
          console.log("uploaded + saved");
        } catch (error) {
          console.log(error);
        }
    }

  return (
    <form onSubmit = {uploadReport}>
        
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        required
      /> <br/>

      <input
        value={report}
        onChange={(e) => setReport(e.target.value)}
        type="text"
        required
      /> <br/>

      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        type="text"
        required
      /> <br/>
      <input type="file" onChange = {fileToBuffer} /> <br/>
      <input id="post-commitment" type="submit" value="post!" />
    </form>
  );
}

export default PostReportForm;
