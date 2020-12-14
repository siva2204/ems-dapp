import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Web3Context } from "../../context/Web3Context";
import styles from "./style.module.css";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button, Snackbar } from "@material-ui/core";

import Spinner from "../Spinner/Spinner.js";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff3333",
    },
    secondary: {
      main: "#ff3333",
    },
    type: "light",
  },
});

//Declare IPFS
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

function PostReportForm() {
  const { accts, ins } = useContext(Web3Context);
  let history = useHistory();

  const [title, setTitle] = useState("");
  const [report, setReport] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [isLoad, setLoad] = useState(false);

  // listening to event from blockchain i.e contract
  if (ins.events) {
    ins.events
      .reportUploaded()
      .on("data", (e) => console.log(e, "updated successfully!"));
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen1(false);
  };
  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen2(false);
  };

  function fileToBuffer(e) {
    e.preventDefault();
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const ext =
        uploadedFile.name.substring(
          uploadedFile.name.lastIndexOf(".") + 1,
          uploadedFile.name.length
        ) || uploadedFile.name;
      if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "mp4") {
        setFileName(uploadedFile.name);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(uploadedFile);
        reader.onloadend = () => {
          setFile(reader.result);
        };
      } else {
        setOpen(true);
      }
    }
  }

  async function uploadReport(e) {
    e.preventDefault();
    if (!fileName) {
      setOpen1(true);
    } else {
      console.log("uploading");
      setLoad(true);
      try {
        const response = await ipfs.add(file);
        console.log(response);
        console.log(`https://ipfs.infura.io/ipfs/${response.path}`);
        // update in blockchain i.e contract
        await ins.methods
          .addReport(title, report, location, response.path)
          .send({ from: accts });
        console.log("uploaded + saved");
        setLoad(false);
        history.push("/feed");
      } catch (error) {
        setLoad(false);
        setOpen2(true);
        console.log(error);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <h3 className={styles.h3}>Post Upload</h3>
      {isLoad ? <Spinner /> : ""}
      <form onSubmit={uploadReport} className={styles.form}>
        <TextField
          className={styles.textField}
          id="title"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          variant="outlined"
          required
          label="Title"
        />{" "}
        <br />
        <TextField
          className={styles.textField}
          id="report"
          multiline
          rows={5}
          placeholder="Enter report"
          onChange={(e) => setReport(e.target.value)}
          type="text"
          variant="outlined"
          label="Report"
        />{" "}
        <br />
        <TextField
          className={styles.textField}
          id="location"
          placeholder="Enter location"
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          variant="outlined"
          label="Location"
        />{" "}
        <br />
        <input
          style={{ display: "none" }}
          id="file"
          type="file"
          hidden
          onChange={fileToBuffer}
        />
        <label htmlFor="file">
          <Button component="span" variant="contained">
            Upload Image or Vedio
          </Button>
          <br />
          {fileName}
        </label>{" "}
        <br />
        <br />
        <Button
          id="post-commitment"
          color="primary"
          type="submit"
          variant="contained"
        >
          Post
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Upload only images or vedio files!
          </Alert>
        </Snackbar>
        <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
          <Alert onClose={handleClose1} severity="error">
            Upload file before posting!
          </Alert>
        </Snackbar>
        <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
          <Alert onClose={handleClose2} severity="error">
            File could not be uploaded!
          </Alert>
        </Snackbar>
      </form>
    </ThemeProvider>
  );
}

export default PostReportForm;
