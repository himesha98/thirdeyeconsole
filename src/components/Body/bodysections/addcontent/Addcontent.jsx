import React, { useState } from "react";
import { databaseRef, storage } from "../../../../firebase";
import "./addcontent.css";
import firebase from "./../../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Addcontent = () => {
  const [grade, setGrade] = useState("");
  const [lessonNumber, setLessonnumber] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  const createContent = (e) => {
    e.preventDefault();

    //const storageref = storage.ref();
    //const uploadTask = storageref.child('contents/' + file.name).put(file);
    console.log(storage);
    const filedata = file;

    const item = {
      grade: grade,
      lessonNumber: lessonNumber,
      subject: subject,
      file: file.name,
    };

    console.log(item);
    if (!file) return;
   
    const storageref = ref(storage, `/contents/education/${grade}/${subject}/lesson${lessonNumber}/${file.name}`);
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
    const contentsRef = databaseRef.child(`contents/education/${grade}/${subject}/lesson${lessonNumber}`)
    contentsRef.set(item);
  };
  return (
    <div className="container" id="addsection">
      <div className="row" id="titlerow">
        <p className="addcontenttitle">Add Contents</p>
      </div>

      <div className="row">
        <div className="input-group mb-3" id="inputrow">
          <span className="input-group-text" id="basic-addon1">
            Lesson Number
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Fname"
            aria-describedby="basic-addon1"
            onChange={(e) => setLessonnumber(e.target.value)}
          />
          <span className="input-group-text" id="basic-addon1">
            Add Grade
          </span>
          <select
            class="form-control"
            aria-label="contactNo"
            aria-describedby="basic-addon1"
            onChange={(e) => setGrade(e.target.value)}
          >
            <option>Grade 1</option>
            <option>Grade 2</option>
            <option>Grade 3</option>
            <option>Grade 4</option>
            <option>Grade 5</option>
            <option>Grade 6</option>
            <option>Grade 7</option>
            <option>Grade 8</option>
            <option>Grade 9</option>
            <option>Grade 10</option>
            <option>Grade 11</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="input-group mb-3" id="inputrow">
          <span className="input-group-text" id="basic-addon1">
            Add Subject
          </span>
          <select
            class="form-control"
            aria-label="contactNo"
            aria-describedby="basic-addon1"
            onChange={(e) => setSubject(e.target.value)}
          >
            <option>Sinhala</option>
            <option>Maths</option>
            <option>Buddhism</option>
            <option>Science</option>
            <option>Enviroment</option>
            <option>History</option>
            <option>Geography</option>
            <option>Civics</option>
            <option>Tamil</option>
            <option>English</option>
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

export default Addcontent;
