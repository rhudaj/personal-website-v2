import "./projects.css";
import { get_markdown } from "../../util/markdown";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { AnimatedCover } from "../../components/animatedCover/AnimatedCover";
import { loadJson } from "../../util/loadJson";
import { FocusedView } from "../../components/focusedView/focusedView";
import { Project } from "../../types/types";
//---------------------------------------------------------------------

function ProjectInfo(props: Project) {
    const comment_regex = /<!--[\s\S]*?-->/g;
    const markdown = get_markdown(props.readme).replace(comment_regex, "");

    return (
        <div className="ProjectInfo">
            <h1>{props.name}</h1>
            <ReactMarkdown className="Markdown" >{markdown}</ReactMarkdown>
        </div>
    );
}

function ProjectThumbnail(props: {
    title: string;
    img: string;
    n: number;
    onClick: () => void;
}) {
    return (
        <div id={`Project-${props.n}`} className="Thumbnail">
            <div className="ProjectPreview">
                <img src={props.img} />
                <AnimatedCover>
                    <h3 onClick={props.onClick}>Read More</h3>
                </AnimatedCover>
            </div>
            <h3>{props.title}</h3>
        </div>
    );
}

//---------------------------------------------------------------------

export function Projects() {

    const thumbnails_dir = "/projects-assets";
    const [selected, setSelected] = useState<number>(-1);
	const [projects, setProjects] = useState<Project[]>([]);

	// Load Assets
    useEffect(() => {
        loadJson<Project[]>("projects").then(setProjects);
    }, []);

    // Display the FocusedView on top of the grid (if a project is selected)
    return (
        <>
        {
            (selected !== -1) && (
                <FocusedView onClose={()=>setSelected(-1)}>
                    <ProjectInfo {...projects[selected]}/>
                </FocusedView>
            )
        }
        <div id="MyProjects">
            <h1>My Projects</h1>
            <div id="ProjectsGrid">
                {projects.map((proj, i) => (
                    <ProjectThumbnail
                        key={i}
                        title={proj.name}
                        img={`${thumbnails_dir}/proj-${i}.png`}
                        n={i}
                        onClick={() => setSelected(i)}
                    />
                ))}
            </div>
        </div>
        </>
    );
}
