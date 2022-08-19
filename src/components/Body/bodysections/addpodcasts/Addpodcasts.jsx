import React, { useState } from "react";
import { databaseRef, storage } from "../../../../firebase";
import "./addpodcasts.css";
import firebase from "./../../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Addpodcasts = () => {
  const [podcasttitle, setPodcasttitle] = useState("");
  const [podcastname, setPodcastname] = useState("");
  const [podcastcreator, setPodcastcreator] = useState("");
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  const createContent = (e) => {
    e.preventDefault();

    //const storageref = storage.ref();
    //const uploadTask = storageref.child('contents/' + file.name).put(file);
    console.log(storage);
    const filedata = file;

    const item = {
      podcasttitle: podcasttitle,
      podcastcreator: podcastcreator,
      podcastname: podcastname,
      file: file.name,
    };

    console.log(item);
    if (!file) return;
   
    const storageref = ref(storage, `/contents/podcasts/${podcastname}/${podcasttitle}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageref, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
      }
    );
    const contentsRef = databaseRef.child(`contents/podcasts/${podcastname}/${podcasttitle}`)
    contentsRef.set(item);
  };
  return (
    <React.Fragment>
    <div className="container" id="addsection">
      <div className="row" id="titlerow">
        <p className="addcontenttitle">Add Podcasts</p>
      </div>

      <div className="row">
        <div className="input-group mb-3" id="inputrow">
          <span className="input-group-text" id="basic-addon1">
            Podcast Title
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Fname"
            aria-describedby="basic-addon1"
            onChange={(e) => setPodcasttitle(e.target.value)}
          />
          <span className="input-group-text" id="basic-addon1">
            Podcast Name
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Fname"
            aria-describedby="basic-addon1"
            onChange={(e) => setPodcastname(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="input-group mb-3" id="inputrow">
          <span className="input-group-text" id="basic-addon1">
            Podcast Creator
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Fname"
            aria-describedby="basic-addon1"
            onChange={(e) => setPodcastcreator(e.target.value)}
          />

          <span className="input-group-text" id="basic-addon1">
            Add File
          </span>
          <input
            type="file"
            className="form-control"
            aria-label="Lanme"
            aria-describedby="basic-addon1"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </div>
      </div>
      <div className="row">
        <button className="submitcontent" onClick={createContent}>
          Submit
        </button>
      </div>
    </div></React.Fragment>
  );
};

export default Addpodcasts;
