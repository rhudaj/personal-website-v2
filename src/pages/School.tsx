import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import './school.css'

const opacity_transition = "0.7s";

function CourseNotes(props: {visible: boolean}) {
  const [hasFocus, setHasFocus] = useState(false); //Changes style

  const handleClick=()=>{
    window.open(
      'https://drive.google.com/drive/folders/1-WDptiqavrrtxHo7Um0KEdzXrNABIuRt?usp=sharing',
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  return (
    <div className="ReviewNotes"
      onMouseEnter={()=>setHasFocus(true)}
      onMouseLeave={()=>setHasFocus(false)}
      onClick={handleClick}
      style={{
        fontSize: 30,
        marginLeft: "auto",
        opacity: props.visible ? 1 : 0,
        transition: opacity_transition,
    }}
  >
    <i className={`fa-${hasFocus ? "regular" : "solid"} fa-folder-${hasFocus ? "open" : "closed"}`}/>
  </div>
  );
}

function Course(props: {id: string, title: string, desc: string}) {
  const [hasFocus, setHasFocus] = useState(false); //Changes style
  const [toggleInfo, setToggleInfo] = useState(false); //Course Description

  const nonFocusStyle = {
    backgroundColor: "transparent",
    color: "grey",
    padding: 20
  };

  const focusStyle = {
    backgroundColor: "#2b2b2b",
    color: "white",
    padding: nonFocusStyle.padding * 1.5
  };

  return (
    <div
      key={props.id}
      className={`Course ${hasFocus ? "focus" : "nonFocus"}`}
      onMouseEnter={()=>setHasFocus(true)}
      onMouseLeave={()=>{setHasFocus(false); setToggleInfo(false)}}
    >
      <p className="ToggleInfo"
        onClick={()=>setToggleInfo(!toggleInfo)}
        style={{
          userSelect: "none",
          transition: opacity_transition,
          opacity: hasFocus ? 1 : 0,
          width: hasFocus ? 20 : 0
        }}
      >
        {toggleInfo ? "▼" : "▶"}
      </p>
      <p className="CourseID">{props.id}</p>
      <p className="CourseTitle">{props.title}</p>
      <CourseNotes visible={hasFocus}/>
      <div className="ToggleInfo"
        style={{
          maxHeight: toggleInfo ? 100 : 0,
          marginTop: toggleInfo ? 20 : 0,
          flexBasis: "100%",
          overflow: "hidden",
          color: "#bcbcbc",
          transition: toggleInfo ? "max-height 1.5s ease-out" : ""
        }}
      >
        {props.desc}
      </div>
    </div>
  );
}

//Course info is stored in a JSON file
import courses_json from '../assets/courses.json';
let courses = courses_json.slice(1);

export function School() {
  return (
    <div id="Courses">
      <>
      {
        courses.map((c)=>{
          return <Course id={c[0].toUpperCase()} title={c[1]} desc={c[2]}></Course>
        })
      }
      </>
    </div>
  );
}