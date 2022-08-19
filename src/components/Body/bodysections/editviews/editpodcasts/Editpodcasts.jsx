import React from "react";
import "./editpodcasts.css";
import { useState } from "react";
import { databaseRef } from "../../../../../firebase";
import { getDatabase, onValue, ref } from "firebase/database";


const Editpodcasts = () => {
  const [podcast, setPodcastname] = useState("");
  const [podcastsarray, setPodcastsarry] = useState([]);
  const [podcastsdataarray, setPodcastsdataarry] = useState([]);
  const [artistname, setArtistname] = useState("");
  const [podcastsection, setPodcastsection] = useState(false);
  const [dataarray, setDataarray] = useState([]);
  const getcontents = () => {};
  const editcontent = () => {};

  const deletecontent = (name, title) => {
    const countRef = databaseRef.child(
      `contents/podcasts/${name}/${title}/`
    );

    countRef.remove();
  };
  const getpodcastsdata = () => {
    const db = getDatabase();
    const starCountRef = ref(db, `contents/podcasts/${podcast}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      //updateStarCount(postElement, data);
      for (let i in data) podcastsdataarray.push([i, data[i]]);
      podcastsdataarray.forEach((artist) => {
        podcastsarray.push(artist);
      });
    });
    setPodcastsection(true);
    console.log(podcastsdataarray);
    console.log(podcastsarray);
    for (let i in podcastsarray) dataarray.push([i, podcastsarray[i][1]]);
    console.log(dataarray[0][1].file);
  };
  return (
    <React.Fragment>
      <>
        <div className="row">
          <p className="eidtmusictitle">Edit Podcast Contents </p>
        </div>
        <div className="row">
          <div className="col-10">
            <div className="input-group mb-3" id="inputrow">
              
              <span className="input-group-text" id="basic-addon1">
              Podcast name
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
          <div className="col-2">
            <button className="getcontbutton" onClick={getpodcastsdata}>
              Get{" "}
            </button>
          </div>
        </div>
        <div className="row">
          <p className="artistcontentstitle">Podcast List</p>
        </div>
        {podcastsection ? (
          <>
            {dataarray.map((artistdata, index) => (
              <>
                <div className="row">
                  <div className="col-4">
                    <p className="artistname">{artistdata[1].podcastname}</p>
                  </div>
                  <div className="col-4">
                    <p className="songname">{artistdata[1].podcasttitle}</p>
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
                        artistdata[1].podcastname,
                        artistdata[1].podcasttitle
                       
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

export default Editpodcasts;
