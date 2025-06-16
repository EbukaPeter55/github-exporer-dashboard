import useSWR from 'swr';
import { useReducer, useEffect } from 'react';
import { message } from 'antd';
import type { FlatRepo, Filters, Repo } from '../types/repo';
import {fetcher} from "../utils/fetcher";


const initialFilters: Filters = {
    language: null,
    stars: null,
    license: null,
    sort: 'stars',
    order: 'desc',
    page: 1,
    perPage: 10,
    query: '',
};

function reducer(state: Filters, action: { type: string; payload?: Partial<Filters> }): Filters {
    switch (action.type) {
        case 'SET_FILTER':
            return { ...state, ...action.payload };
        case 'RESET_FILTERS':
            return initialFilters;
        default:
            return state;
    }
}

export function useRepositories() {
    const [filters, dispatch] = useReducer(reducer, initialFilters);

    const buildQuery = (filters: Filters) => {
        let searchQuery = filters.query || 'react';
        if (filters.language) searchQuery += `+language:${filters.language}`;
        if (filters.stars) searchQuery += `+stars:${filters.stars}`;
        if (filters.license) searchQuery += `+license:${filters.license}`;
        return `https://api.github.com/search/repositories?q=${searchQuery}&sort=${filters.sort}&order=${filters.order}&page=${filters.page}&per_page=${filters.perPage}`;
    };

    const { data, error, isValidating } = useSWR(
        () => buildQuery(filters),
        fetcher,
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false
        }
    );

    useEffect(() => {
        if (error) {
            message.error(error.message || 'Failed to fetch data');
        }
    }, [error]);

    const flatData: FlatRepo[] = data?.items?.map((repo: Repo) => ({
        id: repo.id,
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated: new Date(repo.updated_at).toLocaleDateString(),
        language: repo.language,
        license: repo.license?.name || 'No license',
        html_url: repo.html_url,
    })) || [];

    const setFilter = (payload: Partial<Filters>) => {
        dispatch({ type: 'SET_FILTER', payload });
    };

    const resetFilters = () => {
        dispatch({ type: 'RESET_FILTERS' });
    };

    return {
        data: flatData,
        totalCount: data?.total_count || 0,
        loading: isValidating,
        error,
        filters,
        setFilter,
        resetFilters
    };
}
