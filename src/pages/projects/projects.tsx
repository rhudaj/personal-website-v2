import "./projects.css";
import { get_markdown } from "../../util/markdown";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { AnimatedCover } from "../../components/animatedCover/AnimatedCover";
import { loadJson } from "../../util/loadJson";
//---------------------------------------------------------------------

interface InfoProps {
    title: string;
    img: string;
    readme_url: string;
    closeHandler: () => void;
}

function ProjectInfo(props: InfoProps) {
    const markdown = get_markdown(props.readme_url);

    return (
        <div className="ProjectInfo FullWidth">
            <h1>{props.title}</h1>
            <ReactMarkdown className="Markdown" children={markdown} />
            <span className="closeInfo" onClick={props.closeHandler}>
                X
            </span>
        </div>
    );
}

interface ThumbnailProps {
    title: string;
    img: string;
    n: number;
    onClick: () => void;
}

function ProjectThumbnail(props: ThumbnailProps) {
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
    const [selected, setSelected] = useState<number | undefined>(undefined);

	const [projects, setProjects] = useState<any[]>([]);

	// Load Assets
    useEffect(() => {
        loadJson<any[]>("projects").then(setProjects);
    }, []);

    const closeInfo = () => {
        setSelected(undefined);
    };

    const CreateGrid = (): JSX.Element[] => {
        // Map the json object to thumnails
        let target_proj = undefined; //selected project's info

        const grid = projects.map((proj, index) => {
            if (selected != undefined && index == selected) target_proj = proj;
            return (
                <ProjectThumbnail
                    title={proj[0]}
                    img={proj[1]}
                    n={index}
                    onClick={() => setSelected(index)}
                />
            );
        });

        //Inject the selected <ProjectThumbnail>'s corresponding <ProjectInfo> element
        if (selected != undefined && target_proj != undefined) {
            const element2add = (
                <ProjectInfo
                    title={target_proj[0]}
                    img={target_proj[1]}
                    readme_url={target_proj[3]}
                    closeHandler={closeInfo}
                />
            );
            grid.splice(selected, 0, element2add);
        }

        return grid;
    };

    return (
        <div id="MyProjects">
            <h1>My Projects</h1>
            <div id="ProjectsGrid"> {CreateGrid()} </div>
        </div>
    );
}
