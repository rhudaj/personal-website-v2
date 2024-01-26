import './Home.css'
import image from '../assets/me.png';
import work_1_img from '../assets/work-1.png'
import work_2_img from '../assets/work-2.jpeg'
import work_3_img from '../assets/work-3.png'
import { useState } from 'react';
import { useTypingEffect } from "../hooks/typing-effect"
import { AnimatedCover } from '../components/AnimatedCover';
import { NavLink } from "react-router-dom";
import resume_json from '../assets/resume.json'; //Course info is stored in a JSON file
//------------------

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

interface MyWorkItem_Props {
  img: string;
  page: string;
  heading: string;
  body: string;
};

function MyWorkItem(props: MyWorkItem_Props) {
  return(
    <div className="MyWorkItem">
      <img src={props.img}/>
      <AnimatedCover>
        <h3>{props.heading}</h3>
        <p>{props.body}</p>
        <NavLink id='NavLink' to={props.page}>
          <i className="fa-solid fa-link"/>
        </NavLink>
      </AnimatedCover>
    </div>
  );
}

export function MyWork() {
  return (
    <div id="MyWork">
      <h1>My Work</h1>
      <div id="WorkItems">
        <MyWorkItem img={work_1_img} page='/Projects' heading='Projects' body='Check them out'/>
        <MyWorkItem img={work_2_img} page='/School' heading='School' body='See my Coursework'/>
        <MyWorkItem img={work_3_img} page='/Art' heading='Art' body = 'View my Artwork'/>
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
