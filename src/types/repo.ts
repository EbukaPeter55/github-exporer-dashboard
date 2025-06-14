export interface RepoItem {
    id: number;
    name: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    html_url: string;
    language: string;
    license?: {
        name: string;
    };
}

export interface Repo {
    applicationId: string;
    fullname: string;
    email: string;
    phone: string;
    cv: string;
    cover_letter: string;
    jobId: string;
    jobTitle: string;
    age?: number;
    key?: string | number;
}
