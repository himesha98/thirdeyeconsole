import React, { useState } from "react";
import { databaseRef, storage } from "../../../../firebase";
import "./addmusic.css";
import firebase from "./../../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Addmusic = () => {
  const [songname, setSongname] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [genre, setGenre] = useState("");
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  const createContent = (e) => {
    e.preventDefault();

    //const storageref = storage.ref();
    //const uploadTask = storageref.child('contents/' + file.name).put(file);
    console.log(storage);
    const filedata = file;

    const item = {
      songname: songname,
      authorname: authorname,
      genre: genre,
      file: file.name,
    };

    console.log(item);
    if (!file) return;
   
    const storageref = ref(storage, `/contents/music/${genre}/${authorname}/${file.name}`);
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
    const contentsRef = databaseRef.child(`contents/music/${genre}/${authorname}/${songname}/`)
    contentsRef.set(item);
  };
  return (
    <div className="container" id="addsection">
      <div className="row" id="titlerow">
        <p className="addcontenttitle">Add Music</p>
      </div>

      <div className="row">
        <div className="input-group mb-3" id="inputrow">
          <span className="input-group-text" id="basic-addon1">
            Song Name
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Fname"
            aria-describedby="basic-addon1"
            onChange={(e) => setSongname(e.target.value)}
          />
          <span className="input-group-text" id="basic-addon1">
            Author's Name
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Fname"
            aria-describedby="basic-addon1"
            onChange={(e) => setAuthorname(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="input-group mb-3" id="inputrow">
          <span className="input-group-text" id="basic-addon1">
            Genre
          </span>
          <select
            class="form-control"
            aria-label="contactNo"
            aria-describedby="basic-addon1"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>R n B</option>
            <option>Hip Hop</option>
            <option>Rap</option>
            <option>Classical</option>
            <option>Folk Music</option>
          
          </select>

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
    </div>
  );
};

export default Addmusic;
