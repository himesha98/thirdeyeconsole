import { getDatabase, onValue, ref } from "firebase/database";
import React from "react";
import { useState } from "react";
import { databaseRef } from "../../../../../firebase";
import "./editmusic.css";

const Editmusic = () => {
  const [genre, setGenre] = useState("");
  const [artistsarray, setArtistsarry] = useState([]);
  const [artistsdataarray, setArtistsdataarry] = useState([]);
  const [artistname, setArtistname] = useState("");
  const [songsection, setSongsection] = useState(false);
  const [dataarray, setDataarray] = useState([]);
  const getcontents = () => {};
  const editcontent = () => {};

  const deletecontent = (genre, artist, content) => {
    const countRef = databaseRef.child(
      `contents/music/${genre}/${artist}/${content}/`
    );

    countRef.remove();
  };
  const getartistsdata = () => {
    const db = getDatabase();
    const starCountRef = ref(db, `contents/music/${genre}/${artistname}`);
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
        <p className="eidtmusictitle">Edit Music Contents </p>
      </div>
      <div className="row">
        <div className="col-10">
          <div className="input-group mb-3" id="inputrow">
            <span className="input-group-text" id="basic-addon1">
              Genre
            </span>
            <select
              class="form-control"
              aria-label="contactNo"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setGenre(e.target.value);
              }}
            >
              {" "}
              <option defaultChecked>Select a Genre</option>
              <option>R n B</option>
              <option>Hip Hop</option>
              <option>Rap</option>
              <option>Classical</option>
              <option>Folk Music</option>
            </select>
            <span className="input-group-text" id="basic-addon1">
              Artist Name
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Fname"
              aria-describedby="basic-addon1"
              onChange={(e) => setArtistname(e.target.value)}
            />
          </div>
        </div>
        <div className="col-2">
          <button className="getcontbutton" onClick={getartistsdata}>
            Get{" "}
          </button>
        </div>
      </div>
      <div className="row">
        <p className="artistcontentstitle">Songs List</p>
      </div>
      {songsection ? (
        <>
          {dataarray.map((artistdata, index) => (
            <>
              <div className="row">
                <div className="col-4">
                  <p className="artistname">{artistdata[1].songname}</p>
                </div>
                <div className="col-4">
                  <p className="songname">{artistdata[1].authorname}</p>
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
                      artistdata[1].genre,
                      artistdata[1].authorname,
                      artistdata[1].songname
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

export default Editmusic;
