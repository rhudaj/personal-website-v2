import "./school.css";
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
//Course info is stored in a JSON file
import { Course } from "../../types/types";
import { loadJson } from "../../util/loadJson";
const opacity_transition = "0.7s";

function CourseNotes(props: { visible: boolean }) {
    const [hasFocus, setHasFocus] = useState(false); //Changes style

    const handleClick = () => {
        window.open(
            "https://drive.google.com/drive/folders/1-WDptiqavrrtxHo7Um0KEdzXrNABIuRt?usp=sharing",
            "_blank" // <- This is what makes it open in a new window.
        );
    };

    return (
        <div
            className="ReviewNotes"
            onMouseEnter={() => setHasFocus(true)}
            onMouseLeave={() => setHasFocus(false)}
            onClick={handleClick}
            style={{
                fontSize: 30,
                marginLeft: "auto",
                opacity: props.visible ? 1 : 0,
                transition: opacity_transition,
            }}
        >
            <i
                className={`fa-${hasFocus ? "regular" : "solid"} fa-folder-${
                    hasFocus ? "open" : "closed"
                }`}
            />
        </div>
    );
}

function CourseComponent(props: { c: Course }) {
    const [hasFocus, setHasFocus] = useState(false); //Changes style
    const [toggleInfo, setToggleInfo] = useState(false); //Course Description

    return (
        <div
            key={props.c.code}
            className={`Course ${hasFocus ? "focus" : "nonFocus"}`}
            onMouseEnter={() => setHasFocus(true)}
            onMouseLeave={() => {
                setHasFocus(false);
                setToggleInfo(false);
            }}
        >
            <p
                className="ToggleInfo"
                onClick={() => setToggleInfo(!toggleInfo)}
                style={{
                    userSelect: "none",
                    transition: opacity_transition,
                    opacity: hasFocus ? 1 : 0,
                    width: hasFocus ? 20 : 0,
                }}
            >
                {toggleInfo ? "▼" : "▶"}
            </p>
            <p className="CourseID">{props.c.code.toUpperCase()}</p>
            <p className="CourseTitle">{props.c.title}</p>
            <CourseNotes visible={hasFocus} />
            <div
                className="ToggleInfo"
                style={{
                    maxHeight: toggleInfo ? "max-content" : 0,
                    marginTop: toggleInfo ? 20 : 0,
                    flexBasis: "100%",
                    overflow: "hidden",
                    color: "#bcbcbc",
                    transition: toggleInfo ? "max-height 1.5s ease-out" : "",
                }}
            >
                <div>{props.c.descr}</div>
                {props.c.tech ? (
                    <div className="techDiv">{props.c.tech}</div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export function School() {

	const [courses, setCourses] = useState<Course[]>([]);

    // Load Assets
    useEffect(() => {
        loadJson<Course[]>("courses").then(setCourses);
    }, []);

    return (
        <div id="Courses">
            <>
                {courses.map((c: Course) => {
                    return <CourseComponent c={c}></CourseComponent>;
                })}
            </>
        </div>
    );
}
