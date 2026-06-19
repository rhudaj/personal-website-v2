/**
 * Export all of the pages (react-components) in this directory
 * in an array called 'routes'
*/

import Home from './home/home';
import Projects from './projects/projects';
import School from './school/school';
import Art  from './art/art';

export interface PageRoute {
    name: string,
    path: string, // by default; `/${name}`
    component: ()=>JSX.Element,

}

export const routes: PageRoute[] = [
    {
        name: "Home",
        path: "/",
        component: Home
    },
    {
        name: "Projects",
        path: "/projects",
        component: Projects
    },
    {
        name: "School",
        path: "/school",
        component: School
    },
    {
        name: "Art",
        path: "/art",
        component: Art
    }
];