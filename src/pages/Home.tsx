import './Home.css'
import image from '../assets/me.png';
import work_1_img from '../assets/work-1.png'
import work_2_img from '../assets/work-2.jpeg'
import work_3_img from '../assets/work-3.png'
import { useState } from 'react';
import {useTypingEffect } from "../hooks/typing-effect"
import { useNavigate } from "react-router-dom";
//------------------


//Course info is stored in a JSON file
import resume_json from '../assets/resume.json';

function AboutMe() {
  const [curSec, setCurSec] = useState("Skills");

  const outputContent = (section: any[])=> {
    return (
      <div style={{display: "flex", gap: 40}}>
        {
          section.map((item, index) => {
            return (
              <>
                <p style={index == 0 ? {fontWeight: "800", color: "#DDDDDD"}: {color: "darkgrey"}}>{item}</p>
              </>
            );
          })
        }
      </div>
    );
  };

  return (
    <div id="AboutMe">
        <img src={image}/>
        <div className="content">
            <h1>About Me</h1>
            <p>CS student at the University of Waterloo who loves tackling cool and creative projects. Check out what I've been up to on this site!</p>
            <div id="resume-section-select" style={{display: "flex", gap: 40, fontWeight: "bold"}}>
                <h3 onClick={()=>setCurSec("Skills")}>Skills</h3>
                <h3 onClick={()=>setCurSec("Experience")}>Experience</h3>
                <h3 onClick={()=>setCurSec("Education")}>Education</h3>
            </div>
            <div id="resume-section" style={{display: "flex", flexDirection: "column", rowGap: 20}}>
              {
                (curSec == "Skills") ?
                  resume_json.skills.map(outputContent) :
                  (curSec == "Experience") ?
                  resume_json.Experience.map(outputContent) :
                  resume_json.Education.map(outputContent)
              }
            </div>
        </div>
    </div>
  );
}


function MyWorkItem(props: {img: string, page: string}) {
  let navigate = useNavigate();

  const go2page = () => {
    console.log('switching pages');
    navigate(props.page);
  };

  return(
    <div className="MyWorkItem" onClick={go2page}>
      <img src={props.img}/>
    </div>
  );
}

export function MyWork() {
  return (
    <div id="MyWork">
      <h1>My Work</h1>
      <div id="WorkItems">
        <MyWorkItem img={work_1_img} page='/Projects'/>
        <MyWorkItem img={work_2_img} page='/School' />
        <MyWorkItem img={work_3_img} page='/Art'/>
      </div>
    </div>
  );
}




export function Home() {

  // Text that is typed out in real time.
  const head_text = useTypingEffect("Hi, I'm Roman.", 100);

  return (
    <div id='Home'>
      <div id='Head'>
        <h1 id="IntroText">{head_text}</h1>
      </div>
      <AboutMe/>
      <MyWork/>
    </div>
  );
};
