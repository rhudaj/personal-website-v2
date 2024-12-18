export interface Course {
    code: string,
    sem_year: string,
    title: string,
    descr: string,
    tech?: string
}

export interface Resume {
    summary: string,
    skills: string[][],
    experience: string[][],
    education: string[][]
}

export interface Project {
    name: string,
    url: string,
    readme: string
}