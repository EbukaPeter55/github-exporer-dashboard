export type Repo = {
    id: number;
    name: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    language: string;
    license: { name: string } | null;
    html_url: string;
};

export type FlatRepo = {
    id: number;
    name: string;
    stars: number;
    forks: number;
    updated: string;
    language: string;
    license: string;
    html_url: string;
};

export type Filters = {
    language: string | null;
    stars: string | null;
    license: string | null;
    sort: string;
    order: 'asc' | 'desc';
    page: number;
    perPage: number;
    query: string;
};
