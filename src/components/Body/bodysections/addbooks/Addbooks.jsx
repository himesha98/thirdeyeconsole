import React, { useState } from "react";
import { databaseRef, storage } from "../../../../firebase";
import "./addbooks.css";
import firebase from "./../../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Addbooks = () => {
  const [booktitle, setBooktitle] = useState("");
  const [bookauthor, setBookauthor] = useState("");
  const [booktype, setBooktype] = useState("");
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  const createContent = (e) => {
    e.preventDefault();

    //const storageref = storage.ref();
    //const uploadTask = storageref.child('contents/' + file.name).put(file);
    console.log(storage);
    const filedata = file;

    const item = {
      booktitle: booktitle,
      bookauthor: bookauthor,
      booktype: booktype,
      file: file.name,
    };

    console.log(item);
    if (!file) return;
   
    const storageref = ref(storage, `/contents/library/${booktype}/lesson${bookauthor}/${booktitle}/${file.name}`);
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
    const contentsRef = databaseRef.child(`contents/library/${booktype}/${bookauthor}/${booktitle}`)
    contentsRef.set(item);
  };
  return (
    <div className="container" id="addsection">
      <div className="row" id="titlerow">
        <p className="addcontenttitle">Add Books to Library</p>
      </div>

      <div className="row">
        <div className="input-group mb-3" id="inputrow">
          <span className="input-group-text" id="basic-addon1">
            Book Title
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Fname"
            aria-describedby="basic-addon1"
            onChange={(e) => setBooktitle(e.target.value)}
          />
          <span className="input-group-text" id="basic-addon1">
            Book Author
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Fname"
            aria-describedby="basic-addon1"
            onChange={(e) => setBookauthor(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="input-group mb-3" id="inputrow">
          <span className="input-group-text" id="basic-addon1">
            Book Type
          </span>
          <select
            class="form-control"
            aria-label="contactNo"
            aria-describedby="basic-addon1"
            onChange={(e) => setBooktype(e.target.value)}
          > <option defaultChecked>Choose a book type</option>
            <option>Novels</option>
            <option>Fictions</option>
            <option>Short Stories</option>
            <option>Magazines</option>
            
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

export default Addbooks;
