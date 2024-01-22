import './projects.css'
import projects_json from '../assets/projects.json';

function ProjectTemplate(props: {n: number, title: string, direction: boolean, img: string}) {
  return (
    <div id={`Proj-${props.n}`} className={`Project ${props.direction ? "dirLR" : "dirRL"}`}>
      <h2>{props.title}</h2>
      <div className="ProjectContent">
          <div className="ProjectPreview">
            <img src={props.img}></img>
          </div>
          <div className="ProjectInfo">
            Info
          </div>
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
            return <ProjectTemplate n={index} title={proj[0]} direction={index % 2 == 0} img={proj[1]}/>
          })
        }
      </div>
    </>
  );
};
