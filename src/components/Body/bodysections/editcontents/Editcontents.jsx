import { getDatabase, onValue, ref } from "firebase/database";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { databaseRef } from "../../../../firebase";
import Editeducontents from "../editviews/editeducontents/Editeducontents";
import Editlibrary from "../editviews/editlibrary/Editlibrary";
import Editmusic from "../editviews/editmusic/Editmusic";
import Editpodcasts from "../editviews/editpodcasts/Editpodcasts";
import Editseminars from "../editviews/editseminars/Editseminars";
import "./editcontents.css";

const Editcontents = () => {
  const [contentSwitch, setcontentswitch] = useState(true);
  const [booksswitch, setbooksswitch] = useState(false);
  const [podcastswitch, setpodcastswitch] = useState(false);
  const [seminarswitch, setsemiarswitch] = useState(false);
  const [musicswitch, setmusicswitch] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const showcontentsection = () => {
    setcontentswitch(true);
    setbooksswitch(false);
    setmusicswitch(false);
    setpodcastswitch(false);
    setsemiarswitch(false);
  };

  const showmusicsection = () => {
    setcontentswitch(false);
    setbooksswitch(false);
    setmusicswitch(true);
    setpodcastswitch(false);
    setsemiarswitch(false);
  };

  const showseminarsection = () => {
    setcontentswitch(false);
    setbooksswitch(false);
    setmusicswitch(false);
    setpodcastswitch(false);
    setsemiarswitch(true);
  };

  const showpodcastsection = () => {
    setcontentswitch(false);
    setbooksswitch(false);
    setmusicswitch(false);
    setpodcastswitch(true);
    setsemiarswitch(false);
  };

  const showbooksection = () => {
    setcontentswitch(false);
    setbooksswitch(true);
    setmusicswitch(false);
    setpodcastswitch(false);
    setsemiarswitch(false);
  };

  const geteducontents = async () => {
    
  };
  useEffect(() => {
    geteducontents();
  }, []);
  //const contentsRef = databaseRef.child(`contents/${grade}/${subject}/lesson${lessonNumber}`)

  return (
    <React.Fragment>
      <div className=" mt-3">
        <div className="row">
          <div className="col-3">
            <div className="row" id="editconbtnsection">
              <div className="col-12" id="editconbutton" onClick={showcontentsection}>
                Education
              </div>
            </div>
            <div className="row" id="editconbtnsection">
              <div className="col-12" id="editconbutton" onClick={showpodcastsection}>
                Podcasts
              </div>
            </div>
            <div className="row" id="editconbtnsection">
              <div className="col-12" id="editconbutton" onClick={showmusicsection}>
                Music
              </div>
            </div>
            <div className="row" id="editconbtnsection">
              <div className="col-12" id="editconbutton" onClick={showseminarsection}>
                Seminars
              </div>
            </div>
            <div className="row" id="editconbtnsection">
              <div className="col-12" id="editconbutton" onClick={showbooksection}>
                Library
              </div>
            </div>
          </div>
          <div className="col-8">
            {contentSwitch ? (
              <>
                <Editeducontents />
              </>
            ) : musicswitch ? (
              <>
                <Editmusic />
              </>
            ) : podcastswitch ? (
              <>
                <Editpodcasts />
              </>
            ) : seminarswitch ? (
              <>
                <Editseminars />
              </>
            ) : booksswitch ? (
              <>
                <Editlibrary />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Editcontents;
