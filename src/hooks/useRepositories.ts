import {useEffect, useReducer, useCallback} from 'react';
import type {FlatRepo, Filters, Repo} from '../types/repo';
import {message} from "antd";

type State = {
    data: FlatRepo[];
    totalCount: number;
    loading: boolean;
    error: string | null;
    filters: Filters;
};

type Action =
    | { type: 'SET_DATA'; payload: FlatRepo[] }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_TOTAL_COUNT'; payload: number }
    | { type: 'SET_FILTER'; payload: Partial<Filters> };

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

const initialState: State = {
    data: [],
    totalCount: 0,
    loading: false,
    error: null,
    filters: initialFilters,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_DATA':
            return {...state, data: action.payload};
        case 'SET_LOADING':
            return {...state, loading: action.payload};
        case 'SET_ERROR':
            return {...state, error: action.payload};
        case 'SET_TOTAL_COUNT':
            return {...state, totalCount: action.payload};
        case 'SET_FILTER':
            return {...state, filters: {...state.filters, ...action.payload}};
        default:
            return state;
    }
}

export function useRepositories() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchRepositories = useCallback(async (filters: Filters) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        const { query, sort, order, page, perPage, language, stars, license } = filters;
        let searchQuery = query || 'react';

        if (language) searchQuery += `+language:${language}`;
        if (stars) searchQuery += `+stars:${stars}`;
        if (license) searchQuery += `+license:${license}`;

        try {
            const response = await fetch(
                `https://api.github.com/search/repositories?q=${searchQuery}&sort=${sort}&order=${order}&page=${page}&per_page=${perPage}`
            );

            const result = await response.json();
            console.log('response', result);

            if (result?.errors) {
                message.error(result.errors[0].message || 'Failed to fetch data.');
                dispatch({ type: 'SET_DATA', payload: [] });
                dispatch({ type: 'SET_TOTAL_COUNT', payload: 0 });
                return;
            }

            if (result.items.length === 0) {
                dispatch({ type: 'SET_DATA', payload: [] });
                dispatch({ type: 'SET_TOTAL_COUNT', payload: 0 });
                return;
            }

            const flatData: FlatRepo[] = result.items.map((repo: Repo) => ({
                id: repo.id,
                name: repo.name,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                updated: new Date(repo.updated_at).toLocaleDateString(),
                language: repo.language,
                license: repo.license?.name || 'No license',
                html_url: repo.html_url
            }));

            dispatch({ type: 'SET_DATA', payload: flatData });
            dispatch({ type: 'SET_TOTAL_COUNT', payload: result.total_count });
        } catch (error: any) {
            message.error(error.message || 'Failed to fetch data');
            dispatch({ type: 'SET_DATA', payload: [] });
            dispatch({ type: 'SET_TOTAL_COUNT', payload: 0 });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []); // no dependencies needed now

    useEffect(() => {
        fetchRepositories(state.filters);
    }, [fetchRepositories, state.filters]);

    const setFilter = (payload: Partial<Filters>) =>
        dispatch({type: 'SET_FILTER', payload});

    return {
        data: state.data,
        totalCount: state.totalCount,
        loading: state.loading,
        error: state.error,
        filters: state.filters,
        setFilter,
    };
}
