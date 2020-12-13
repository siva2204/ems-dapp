import React, { useState, useContext } from "react";
import { Web3Context } from "./context/Web3Context";

import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { TextField, Button, Snackbar } from '@material-ui/core';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) 

function PostReportForm() {
    const { accts,ins } = useContext(Web3Context);

    const[title,setTitle] = useState("enter title");
    const[report,setReport] = useState("enter report");
    const[location,setLocation] = useState("enter location");
    const[file,setFile] = useState({});
    const[fileName, setFileName] = useState('');
    const[open, setOpen] = useState(false);

    // listening to event from blockchain i.e contract
    if(ins.events){
      ins.events.reportUploaded().on("data",(e) => console.log(e,"updated successfully!"));
    }

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
     
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') { return; }
      setOpen(false);
    };

    function fileToBuffer (e) {
      e.preventDefault();
      const uploadedFile = e.target.files[0];
      const ext = uploadedFile.name.substring(uploadedFile.name.lastIndexOf('.')+1, uploadedFile.name.length) || uploadedFile.name
      if(ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'mp4'){
        setFileName(uploadedFile.name)
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(uploadedFile)
        reader.onloadend = () => {
            setFile(reader.result);
        }
      }
      else{
        setOpen(true)
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
    <form onSubmit = {uploadReport} style={{textAlign: "center", marginTop: "60px"}}>
        
      <TextField
        placeholder={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        required
      /> <br/>

      <TextField
        placeholder={report}
        onChange={(e) => setReport(e.target.value)}
        type="text"
        required
      /> <br/>

      <TextField
        placeholder={location}
        onChange={(e) => setLocation(e.target.value)}
        type="text"
        required
      /> <br/>
      <input style={{ display: 'none' }}
        required
        id="file"
        type="file" 
        hidden 
        onChange = {fileToBuffer} 
      /> 
      <label htmlFor="file">
        <Button component="span">
          Upload
        </Button>
        <br/>{fileName}
      </label> <br/>
      <Button id="post-commitment" type="submit" value="post!">Post</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Upload only images or audio files!
        </Alert>
      </Snackbar>
    </form>
  );
}

export default PostReportForm;
