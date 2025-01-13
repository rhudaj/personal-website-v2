export interface Course {
    code: string,
    sem_year: string,
    title: string,
    descr: string,
    tech?: string
}

export interface SectionItem {
    title: string,
    descr: string[],
    logo?: string
}

export interface ResumeSection {
    title: string,
    items: SectionItem[]
};

export interface Resume {
    summary: string,
    sections: ResumeSection[]
}

export interface Project {
    name: string,
    github_url: string,
    url?: string,
    readme: string,
}