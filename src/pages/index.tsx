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
    component: any,
    path?: string, // by default; `/${name}`
}

const _routes: PageRoute[] = [
    {
        name: "home",
        path: "/",
        component: Home,
    },
    {
        name: "projects",
        component: Projects,
    },
    {
        name: "school",
        component: School,
    },
    {
        name: "art",
        component: Art,
    }
];

// Infers the name and path
export const routes = _routes.map(r=>({
    ...r,
    path: r.path ?? `/${r.name}`
}))