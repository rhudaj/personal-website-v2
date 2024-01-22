import './projects.css'
import projects_json from '../assets/projects.json';
import { get_markdown } from '../util/markdown'
import ReactMarkdown from 'react-markdown'

function ProjectTemplate(props: {
  n: number,
  title: string,
  direction: boolean,
  img: string,
  readme_url: string,
}) {
  const markdown = get_markdown(props.readme_url);
  return (
    <div id={`Proj-${props.n}`} className={`Project ${props.direction ? "dirLR" : "dirRL"}`}>
      <h1>{props.title}</h1>
      <div className="ProjectContent">
          <div className="ProjectPreview">
            <img src={props.img}></img>
          </div>
          <ReactMarkdown className="Markdown" children={markdown}/>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <>
      <h1>My Projects</h1>
      <div id='Projects'>
        {
          projects_json.map((proj, index)=>{
            return <ProjectTemplate
              n={index}
              title={proj[0]}
              direction={index % 2 == 0}
              img={proj[1]}
              readme_url={proj[3]}
            />
          })
        }
      </div>
    </>
  );
};
