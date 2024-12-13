// ---- CSS
import "./home.css";
// ---- MODULES
import { useEffect, useState } from "react";
import { useTypingEffect } from "../../hooks/typing-effect";
import { AnimatedCover } from "../../components/animatedCover/AnimatedCover";
import { NavLink } from "react-router-dom";
// ---- ASSETS
import { Resume } from "../../types/types";
import { loadJson } from "../../util/loadJson";
// ----------------------------------

const assetsPath = "/home-assets";

function AboutMe() {
    const [curSec, setCurSec] = useState("Skills");
    const [resume, setResume] = useState<Resume | null>(null);

    useEffect(() => {
        loadJson<Resume>("resume").then(setResume);
    }, []);

    const resumeSection = (sectionItems: string[][]) =>
        sectionItems.map((sectionItem, sec) => (
            <div className="SectionItem" key={sec}>
                {sectionItem.map((item, i) => (
                    <p key={i} className={i == 0 ? "title" : "description"}>
                        {item}
                    </p>
                ))}
            </div>
        ));



    if (resume == null) return <div>Loading...</div>;
    return (
		<div id="AboutMe">
			<img src={`${assetsPath}/me.png`} />
			<div className="content">
				<h1>About Me</h1>
				<p>{resume.summary}</p>
				<div id="resume-section-select">
					<h3 key={1} onClick={() => setCurSec("Skills")}>
						Skills
					</h3>
					<h3 key={2} onClick={() => setCurSec("Experience")}>
						Experience
					</h3>
					<h3 key={3} onClick={() => setCurSec("Education")}>
						Education
					</h3>
				</div>
				<div id="resume-section">
					{curSec == "Skills"
						? resumeSection(resume.skills)
						: curSec == "Experience"
						? resumeSection(resume.experience)
						: resumeSection(resume.education)}
				</div>
			</div>
		</div>
    );
}

function MyWorkItem(props: {
    img: string;
    page: string;
    heading: string;
    body: string;
}) {
    return (
        <div className="MyWorkItem">
            <img src={props.img} />
            <AnimatedCover>
                <h3>{props.heading}</h3>
                <p>{props.body}</p>
                <NavLink id="NavLink" to={props.page}>
                    <i className="fa-solid fa-link" />
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
                <MyWorkItem
                    img={`${assetsPath}/work-1.png`}
                    page="/projects"
                    heading="Projects"
                    body="Check them out"
                />
                <MyWorkItem
                    img={`${assetsPath}/work-2.png`}
                    page="/school"
                    heading="School"
                    body="See my Coursework"
                />
                <MyWorkItem
                    img={`${assetsPath}/work-3.png`}
                    page="/art"
                    heading="Art"
                    body="View my Artwork"
                />
            </div>
        </div>
    );
}

export function Home() {
    // Text that is typed out in real time.
    const head_text = useTypingEffect("Hi, I'm Roman.", 80);

    return (
        <div id="Home">
            <div id="Head">
                <h1 id="IntroText">{head_text}</h1>
            </div>
            <AboutMe />
            <MyWork />
        </div>
    );
}
