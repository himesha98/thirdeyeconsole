import React, { useState } from "react";
import "./viewcontents.css";
import { getDatabase, ref, child, get } from "firebase/database";

const Viewcontents = () => {
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [listcontents, setListcontents] = useState([]);
  const [returnArr, setReturnArr] = useState([]);
  const viewcontents = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `contents/${grade}/${subject}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setListcontents(snapshot.val());
          //console.log(listcontents);
          snapshot.forEach(function (childSnapshot) {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;

            returnArr.push(item);
          });

          console.log(returnArr);
          console.log(returnArr[0].file);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <p className="allcontitle">Third AI Student Data </p>
      </div>
      <div className="row">
        <div className="col-5">
          <div className="input-group mb-3" id="inputrow">
            <span className="input-group-text" id="basic-addon1">
              Select Grade
            </span>
            <select
              className="form-control"
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
        <div className="col-5">
          <div className="input-group mb-3" id="inputrow">
            <span className="input-group-text" id="basic-addon1">
              Select Subject
            </span>
            <select
              className="form-control"
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
          </div>
        </div>
        <div className="col-2">
          <button onClick={viewcontents} className="viewbutton">
            View{" "}
          </button>
        </div>
      </div>
      <div className="row" id="viewconttablehead">
        <div className="col-3">
          <p className="contenttitle">Grade</p>
        </div>
        <div className="col-3">
          <p className="contenttitle">Subject</p>
        </div>
        <div className="col-3">
          <p className="contenttitle">Lesson No</p>
        </div>
        <div className="col-3">
          <p className="contenttitle">File</p>
        </div>
      </div>

      {returnArr.length > 0? returnArr.map((row, key) => (
        <div className="row">
          <div className="col-3">
            <p className="contenttitle">{row.grade}</p>
          </div>
          <div className="col-3">
            <p className="contenttitle">{row.subject}</p>
          </div>
          <div className="col-3">
            <p className="contenttitle">{row.lessonNumber}</p>
          </div>
          <div className="col-3">
            <p className="contenttitle">{row.file}</p>
          </div>
        </div>
      )):(<> <p className="nodatatext">No Data</p> </>)}
    </div>
  );
};

export default Viewcontents;
