import React from "react";
import { useState } from "react";
import Addbooks from "../addbooks/Addbooks";
import Addcontent from "../addcontent/Addcontent";
import Addmusic from "../addmusic/Addmusic";
import Addpodcasts from "../addpodcasts/Addpodcasts";
import Addsemiars from "../addseminars/Addsemiars";
import "./contentsection.css";

const Contentsection = () => {
  const [contentSwitch, setcontentswitch] = useState(true);
  const [booksswitch, setbooksswitch] = useState(false);
  const [podcastswitch, setpodcastswitch] = useState(false);
  const [seminarswitch, setsemiarswitch] = useState(false);
  const [musicswitch, setmusicswitch] = useState(false);

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

  return (
    <React.Fragment>
      <div className=" mt-3">
        <div className="row">
          <div
            className="col-2"
            id="contentswitch"
            onClick={showcontentsection}
          >
            Add Contents
          </div>
          <div className="col-2" id="contentswitch" onClick={showmusicsection}>
            Add Music
          </div>
          <div
            className="col-2"
            id="contentswitch"
            onClick={showpodcastsection}
          >
            Add Podcasts
          </div>
          <div
            className="col-3"
            id="contentswitch"
            onClick={showseminarsection}
          >
            Add Seminars
          </div>
          <div className="col-2" id="contentswitch" onClick={showbooksection}>
            Add Books
          </div>
        </div>
        <div className="row">
          {contentSwitch ? (
            <>
              <Addcontent />
            </>
          ) : booksswitch ? (
            <><Addbooks/></>
          ) : seminarswitch ? (
            <><Addsemiars/></>
          ) : podcastswitch ? (
            <><Addpodcasts/></>
          ) : musicswitch ? (
            <><Addmusic/></>
          ) : (
            <></>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contentsection;
