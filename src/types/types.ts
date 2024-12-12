export interface Course {
    code: string,
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