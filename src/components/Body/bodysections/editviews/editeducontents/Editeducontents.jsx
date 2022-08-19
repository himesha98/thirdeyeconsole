import React from "react";
import "./editeducontents.css";
import { useState } from "react";
import { databaseRef } from "../../../../../firebase";
import { getDatabase, onValue, ref } from "firebase/database";

const Editeducontents = () => {
  const [grade , setGrade] = useState("");
  const [artistsarray, setArtistsarry] = useState([]);
  const [artistsdataarray, setArtistsdataarry] = useState([]);
  const [subject, setSubject] = useState("");
  const [songsection, setSongsection] = useState(false);
  const [dataarray, setDataarray] = useState([]);
  const getcontents = () => {};
  const editcontent = () => {};

  const deletecontent = (grade, subject, lesson) => {
    const countRef = databaseRef.child(
      `contents/education/${grade}/${subject}/lesson${lesson}/`
    );

    countRef.remove();
  };
  const getartistsdata = () => {
    const db = getDatabase();
    const starCountRef = ref(db, `contents/education/${grade}/${subject}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      //updateStarCount(postElement, data);
      for (let i in data) artistsdataarray.push([i, data[i]]);
      artistsdataarray.forEach((artist) => {
        artistsarray.push(artist);
      });
    });
    setSongsection(true);
    console.log(artistsdataarray);
    console.log(artistsarray);
    for (let i in artistsarray) dataarray.push([i, artistsarray[i][1]]);
    console.log(dataarray[0][1].file);
  };
  return (
    <>
      <div className="row">
        <p className="eidtmusictitle">Edit Education Contents </p>
      </div>
      <div className="row">
        <div className="col-10">
          <div className="input-group mb-3" id="inputrow">
            <span className="input-group-text" id="basic-addon1">
              Select Grade
            </span>
            <select
              class="form-control"
              aria-label="contactNo"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setGrade(e.target.value);
              }}
            >
              {" "}
              <option defaultChecked>Select a Subject</option>
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
            <span className="input-group-text" id="basic-addon1">
              Select Subject
            </span>
            <select
              class="form-control"
              aria-label="contactNo"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            >
              {" "}
              <option defaultChecked>Select a Subject</option>
              <option>Maths</option>
              <option>Science</option>
              <option>English</option>
              <option>History</option>
              <option>Sinhala</option>
            </select>
          </div>
        </div>
        <div className="col-2">
          <button className="getcontbutton" onClick={getartistsdata}>
            Get{" "}
          </button>
        </div>
      </div>
      <div className="row">
        <p className="artistcontentstitle">Education content List</p>
      </div>
      <>
      {songsection ? (
        <>
          {dataarray.map((artistdata, index) => (
            <>
              <div className="row">
                <div className="col-4">
                  <p className="artistname">{artistdata[1].subject}</p>
                </div>
                <div className="col-4">
                  <p className="songname">Lesson {artistdata[1].lessonNumber}</p>
                </div>
                <div className="col-2">
                  <button className="artistsongedit" onClick={editcontent}>
                    Edit
                  </button>
                </div>
                <div className="col-2">
                  <button
                    className="artistsongdelete"
                    onClick={deletecontent(
                      artistdata[1].grade,
                      artistdata[1].subject,
                      artistdata[1].lessonNumber
                    )}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          ))}
        </>
      ) : (
        <></>
      )}</>
    </>
  );
};

export default Editeducontents;
