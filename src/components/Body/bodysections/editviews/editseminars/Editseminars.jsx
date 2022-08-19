import React from "react";
import "./Editseminars.css";
import { useState } from "react";
import { databaseRef } from "../../../../../firebase";
import { getDatabase, onValue, ref } from "firebase/database";

const Editseminars = () => {
  const [seminartitle, setSeminartitle] = useState("");
  const [seminararray, setSeminarsarry] = useState([]);
  const [seminarsdataarray, setSeminarsdataarry] = useState([]);
  const [presenter, setPresenter] = useState("");
  const [songsection, setSongsection] = useState(false);
  const [dataarray, setDataarray] = useState([]);
  const getcontents = () => {};
  const editcontent = () => {};

  const deletecontent = (seminartitle, presenter) => {
    const countRef = databaseRef.child(
      `contents/music/${seminartitle}/${presenter}/`
    );

    countRef.remove();
  };
  const getseminarsdata = () => {
    const db = getDatabase();
    const starCountRef = ref(db, `contents/seminars/${seminartitle}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      //updateStarCount(postElement, data);
      for (let i in data) seminarsdataarray.push([i, data[i]]);
      seminarsdataarray.forEach((artist) => {
        seminararray.push(artist);
      });
    });
    setSongsection(true);
    console.log(seminarsdataarray);
    console.log(seminararray);
    for (let i in seminararray) dataarray.push([i, seminararray[i][1]]);
    console.log(dataarray[0][1].file);
  };
  return (
    <React.Fragment>
      <>
        <div className="row">
          <p className="eidtmusictitle">Edit Seminar Contents </p>
        </div>
        <div className="row">
          <div className="col-10">
            <div className="input-group mb-3" id="inputrow">
              
              <span className="input-group-text" id="basic-addon1">
                Seminar title
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Fname"
                aria-describedby="basic-addon1"
                onChange={(e) => setSeminartitle(e.target.value)}
              />
            </div>
          </div>
          <div className="col-2">
            <button className="getcontbutton" onClick={getseminarsdata}>
              Get{" "}
            </button>
          </div>
        </div>
        <div className="row">
          <p className="artistcontentstitle">Seminars List</p>
        </div>
        {songsection ? (
          <>
            {dataarray.map((artistdata, index) => (
              <>
                <div className="row">
                  <div className="col-4">
                    <p className="artistname">{artistdata[1].seminartitle}</p>
                  </div>
                  <div className="col-4">
                    <p className="songname">{artistdata[1].presenter}</p>
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
                        artistdata[1].seminartitle,
                        artistdata[1].presenter
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
        )}
      </>
    </React.Fragment>
  );
};

export default Editseminars;
