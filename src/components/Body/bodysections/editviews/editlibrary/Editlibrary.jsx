import React from "react";
import "./editlibrary.css";
import { useState } from "react";
import { databaseRef } from "../../../../../firebase";
import { getDatabase, onValue, ref } from "firebase/database";

const Editlibrary = () => {
  const [booktype, setBooktype] = useState("");
  const [booksarray, setBooksarry] = useState([]);
  const [booksdataarray, setBooksdataarry] = useState([]);
  const [authorname, setAuthorname] = useState("");
  const [podcastsection, setPodcastsection] = useState(false);
  const [dataarray, setDataarray] = useState([]);
  const [bookname, setBookname] = useState("");
  const getcontents = () => {};
  const editcontent = () => {};

  const deletecontent = (name, author) => {
    setBookname(name);
    const countRef = databaseRef.child(`contents/library/${author}/${name}/`);

    countRef.remove();
  };
  const getpodcastsdata = () => {
    const db = getDatabase();
    const starCountRef = ref(db, `contents/library/${booktype}/${authorname}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      //updateStarCount(postElement, data);
      for (let i in data) booksdataarray.push([i, data[i]]);
      booksdataarray.forEach((artist) => {
        booksarray.push(artist);
      });
      
      for (let i in booksarray) dataarray.push([i, booksarray[i][1]]);
      console.log(dataarray[0][1].file);
    });
    setPodcastsection(true);

  };
  return (
    <>
      <div className="row">
        <p className="eidtmusictitle">Edit Library Contents </p>
      </div>
      <div className="row">
        <div className="col-10">
          <div className="input-group mb-3" id="inputrow">
            <span className="input-group-text" id="basic-addon1">
              Book type
            </span>
            <select
              class="form-control"
              aria-label="contactNo"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setBooktype(e.target.value);
              }}
            >
              {" "}
              <option defaultChecked>Select a Book type</option>
              <option>Novels</option>
              <option>Magazines</option>
              <option>Fictions</option>
            </select>
            <span className="input-group-text" id="basic-addon1">
              Author name
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
        <div className="col-2">
          <button className="getcontbutton" onClick={getpodcastsdata}>
            Get{" "}
          </button>
        </div>
      </div>
      <div className="row">
        <p className="artistcontentstitle">Book List</p>
      </div>
      {podcastsection ? (
        <>
          {dataarray.map((artistdata, index) => (
            <>
              <div className="row">
                <div className="col-4">
                  <p className="artistname">{artistdata[1].booktitle}</p>
                </div>
                <div className="col-4">
                  <p className="songname">{artistdata[1].bookauthor}</p>
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
                      artistdata[1].booktitle,
                      artistdata[1].bookauthor
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
  );
};

export default Editlibrary;
