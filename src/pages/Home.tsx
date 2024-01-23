import './Home.css'
import image from '../assets/me.png';
import work_1_img from '../assets/work-1.png'
import work_2_img from '../assets/work-2.jpeg'
import work_3_img from '../assets/work-3.png'
import { useState } from 'react';
import { useTypingEffect, useCoverEffect } from "../hooks/typing-effect"
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
            <p>{resume_json["Summary"]}</p>
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
  const coverEffect = useCoverEffect(100, 1);

  return(
    <div className="MyWorkItem" onMouseEnter={coverEffect.handleStart}>
      <img src={props.img}/>
      <div className="AnimatedCover">
        <h3>Work Type</h3>
        <p>More Info</p>
        <a href={props.page}><i className="fa-solid fa-link"></i> </a>
      </div>
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
