// ---- CSS
import "./home.sass";
// ---- MODULES
import { useEffect, useState } from "react";
import { useTypingEffect } from "../../hooks/typing-effect";
import { AnimatedCover } from "../../components/animatedCover/AnimatedCover";
import { NavLink } from "react-router-dom";
// ---- ASSETS
import { Resume, ResumeSection, SectionItem } from "../../types/types";
import { loadJson } from "../../util/loadJson";
import { LazyLoadImage } from "react-lazy-load-image-component";
// --------------------------------------

const assetsPath = "/home-assets";

const SectionItemUI = (props: SectionItem & { className?: string;}) => {
    const logoUI = props.logo && (
        <LazyLoadImage className="logo" src={`${assetsPath}/resume/${props.logo}`} />
    );

    const classNames = [
        "SectionItem",
        props.className
    ].join(" ");

    const descrUIs = props.descr.map((str, i) => (
        <p key={i} className="descr">
            {str}
        </p>
    ));

    return (
        <div className={classNames}>
            {logoUI && <div className="col1">{logoUI}</div>}
            <div className="col2">
                <p className="title">{props.title}</p>
                {descrUIs}
            </div>
        </div>
    );
};

const SectionUI = (props: ResumeSection) => {

    // const alternateFlexDir = props.items[0].logo !== undefined
    const alternateFlexDir = false;

    const classNames = [
        `sec-${props.title}`,
        alternateFlexDir && "alternate-flex-dir",
    ];

    const getClassNames = (i: number) => ([
        i%2===0 || !alternateFlexDir ? "even" : "odd",
        i==props.items?.length-1 ? "last" : ""
    ].join(" "))

    return (
        <div id="resume-section" className={classNames.join(" ")}>
            {props.items?.map((item, i) => (
                <SectionItemUI key={i} {...item} className={getClassNames(i)} />
            ))}
        </div>
    );
};

function ResumeUI() {
    const [resume, setResume] = useState<Resume | null>(null);
    const [curSecTitle, setCurSecTitle] = useState<string>("");
    const [curSec, setCurSec] = useState<ResumeSection | null>(null);

    useEffect(() => {
        let isMounted = true; // To prevent setting state if unmounted
        loadJson<Resume>("resume").then((data) => {
            if (isMounted) setResume(data);
        });
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (resume) {
            if (!curSecTitle) setCurSecTitle("skills");
        }
    }, [resume, curSecTitle]);

    useEffect(() => {
        if (!resume || !curSecTitle) return;
        const sec = resume.sections.find((sec) => sec.title === curSecTitle);
        setCurSec(sec ?? null);
    }, [resume, curSecTitle]);

    if (!resume) return <div>Check back later...</div>;

    const secSelectHeads = resume.sections.map((sec, i) => (
        <h3
            key={i}
            className={sec.title === curSecTitle ? "selected" : ""}
            onClick={() => setCurSecTitle(sec.title)}
        >
            {sec.title.charAt(0).toUpperCase() + sec.title.slice(1)}
        </h3>
    ));

    return (
        <div className="resume-content">
            <h1>About Me</h1>
            <p>{resume.summary}</p>
            <div id="resume-section-select">{secSelectHeads}</div>
            {curSec && <SectionUI {...curSec} />}
        </div>
    );
}

function AboutMe() {
    return (
        <div id="about-me-div">
            <LazyLoadImage src={`${assetsPath}/me.jpg`} effect="blur"/>
            <ResumeUI />
        </div>
    );
}

function MyWork() {
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
                    img={`${assetsPath}/work-2.jpg`}
                    page="/school"
                    heading="School"
                    body="See my Coursework"
                />
                <MyWorkItem
                    img={`${assetsPath}/work-3.jpg`}
                    page="/art"
                    heading="Art"
                    body="View my Artwork"
                />
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
            <LazyLoadImage src={props.img} />
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

export default function Home() {
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
