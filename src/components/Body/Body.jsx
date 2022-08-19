import React, { useEffect, useState } from "react";
import "./body.css";
import Addcontent from "./bodysections/addcontent/Addcontent";
import Analytics from "./bodysections/analytics/Analytics";
import Contentsection from "./bodysections/contentsection/Contentsection";
import Editcontents from "./bodysections/editcontents/Editcontents";
import Viewcontents from "./bodysections/viewcontents/Viewcontents";
const Body = () => {
    
        const [sectionone, setSectionone] = useState(true);
        const [sectiontwo, setSectiontwo] = useState(false);
        const [sectionthree, setSectionthree] = useState(false);
        const [sectionfour, setSectionfour] = useState(false);
    
     
    
    
  

  const handleSections = (number) => {
    if (number == 1) {
      setSectionone(true);
      setSectiontwo(false);
      setSectionthree(false);
      setSectionfour(false);
    } else if (number == 2) {
      setSectionone(false);
      setSectiontwo(true);
      setSectionthree(false);
      setSectionfour(false);
    } else if ((number == 3)) {
      setSectionone(false);
      setSectiontwo(false);
      setSectionthree(true);
      setSectionfour(false);
    } else if ((number == 4)) {
      setSectionone(false);
      setSectiontwo(false);
      setSectionthree(false);
      setSectionfour(true);
     
    } else {
    }
  };
  return (
    <div className="container-fluid">
      <div className="row" id="bodysection">
        <div className="col-3">
          <div className="sidemenu">
            <div className="itemlist">
              <div className="row" onClick={()=> {handleSections(1)}} id="menuitem">
                Add Contents
              </div>
              <div className="row" onClick={()=> {handleSections(2)}} id="menuitem">
                Analytics
              </div>
              <div className="row" onClick={()=> {handleSections(3)}} id="menuitem">
                Edit Contents
              </div>
              <div className="row" onClick={()=> {handleSections(4)}} id="menuitem">
                View Contents
              </div>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="viewMenuSection">
              
            {sectionone ? (
              <>
                <Contentsection />{" "}
              </>
            ) : sectiontwo ? (
              <>
                <Analytics />
              </>
            ): sectionfour ? (
              <>
                <Viewcontents />
              </>
            ): sectionthree ? (
              <>
                <Editcontents />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
