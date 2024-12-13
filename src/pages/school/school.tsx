import "./school.css";
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
//Course info is stored in a JSON file
import { Course } from "../../types/types";
import { loadJson } from "../../util/loadJson";
import useToggle from "../../hooks/useToggle";

const opacity_transition = "0.7s";

/**
 * 3 Requirements
 * 1. c.code format: "[subject]( )+[couse number]" (e.g. 'CS 111')
 * 2. c.sem_year format: "[f|w|s][yy]" (e.g. 'f24')
 * 3. root html for course notes are in "course-notes/[...]/root.html"
 * @return path, relative to the public folder
 */
const course2path = (c: Course) => {
    let course_subdir = c.code.replace(/\s/g, "").toLowerCase() + `-${c.sem_year}`
    // path is relative to the public folder
    return `/course-notes/${course_subdir}/root.html`
};


function CourseNotes(props: { course: Course, visible: boolean }) {
    const [hasFocus, setHasFocus] = useState(false); //Changes style

    /* OLD FUNCTIONALITY
    const handleClick = () => {
        window.open(
            "https://drive.google.com/drive/folders/1-WDptiqavrrtxHo7Um0KEdzXrNABIuRt?usp=sharing",
            "_blank" // <- open in a new window.
        );
    };
    */

    // Open the notes (html) in a new tab
    const handleClick = () => {
        window.open(
            course2path(props.course),
            "_blank" // <- open in a new window.
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

function CourseComponent(props: Course ) {
    const [hasFocus, setHasFocus] = useState(false);    //Changes style
    const [infoShown, toggleInfoShown] = useToggle();


    const style_toggleInfo: React.CSSProperties = {
        userSelect: "none",
        transition: opacity_transition,
        opacity: hasFocus ? 1 : 0,
        width: hasFocus ? 20 : 0,
    };

    const style_courseInfo: React.CSSProperties = {
        maxHeight: infoShown ? "max-content" : 0,
        marginTop: infoShown ? 20 : 0,
        flexBasis: "100%",
        overflow: "hidden",
        color: "#bcbcbc",
        transition: infoShown ? "max-height 1.5s ease-out" : "",
    };

    /**
     * Inforation can be toggled on and off by:
     * 1. Double click anywhere
     * 2. Clicking the ▼/▶ icon */
    return (
        <div
            key={props.code}
            className={`Course ${hasFocus ? "focus" : "nonFocus"}`}
            onMouseEnter={() => setHasFocus(true)}
            onMouseLeave={() => {
                setHasFocus(false);
                if (infoShown) toggleInfoShown();
            }}
            onDoubleClick={toggleInfoShown}
        >
            <div
                className="ToggleInfo"
                onClick={toggleInfoShown}
                style={style_toggleInfo}
            >
                {infoShown ? "▼" : "▶"}
            </div>
            <p className="CourseID">{props.code.toUpperCase()}</p>
            <p className="CourseTitle">{props.title}</p>
            <CourseNotes visible={hasFocus} course={props} />
            <div className="CourseInfo" style={style_courseInfo}>
                <div>{props.descr}</div>
                {props.tech && <div className="techDiv">{props.tech}</div>}
            </div>
        </div>
    );
}

export function School() {

	const [courses, setCourses] = useState<Course[]>([]);

    // Load Assets
    useEffect(() => {
        loadJson<Course[]>("courses").then(setCourses)
    }, []);

    return (
        <div id="Courses">
            <>
                {courses.map((c: Course) => {
                    return <CourseComponent {...c} ></CourseComponent>;
                })}
            </>
        </div>
    );
}
