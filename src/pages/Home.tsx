import React, {lazy, Suspense, useCallback, useEffect, useState} from 'react';
import { useRepositories } from '../hooks/useRepositories';
import {Skeleton, Spin, type TablePaginationConfig} from 'antd';
import type { FlatRepo } from "../types/repo";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import {repoTableColumns} from "../constants/app-constant";
import ReusableTable from "../components/reusable-components/Table";

const SortRepo = lazy(() => import("../components/reusable-components/Sort"));
const Filter = lazy(() => import("../components/reusable-components/Filter"));
const ReusableSearchBar = lazy(() => import("../components/reusable-components/Search"));

const Home: React.FC = () => {
    const {
        data,
        totalCount,
        loading,
        filters,
        setFilter,
        resetFilters
    } = useRepositories();

    const [pendingFilters, setPendingFilters] = useState({
        language: null,
        stars: null,
        license: null
    });

    const [hasFiltered, setHasFiltered] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.query || '');
    const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);

    /**
     * Debounce search triggers fetch independently
     */
    useEffect(() => {
        setFilter({ query: debouncedSearchTerm, page: 1 });
    }, [debouncedSearchTerm]);

    const handleFilterChange = useCallback((key: string, value: string | null) => {
        setPendingFilters((prev) => ({ ...prev, [key]: value }));
    }, []);

    const handleApplyFilters = useCallback(() => {
        setFilter(pendingFilters);
        setHasFiltered(true);
    }, [pendingFilters, setFilter]);

    const handleResetFilters = useCallback(() => {
        setPendingFilters({ language: null, stars: null, license: null });
        resetFilters();
        setSearchTerm('');
        setHasFiltered(false);
    }, [resetFilters]);

    const handlePageChange = useCallback((pag: TablePaginationConfig) => {
        setFilter({
            page: pag.current || 1,
            perPage: pag.pageSize || 10
        });
    }, [setFilter]);

    return (
        <div className="p-4">
            <div className="flex flex-row flex-wrap items-center gap-4 mb-6">
                <Suspense fallback={<Spin />}>
                <ReusableSearchBar
                    showSearch
                    searchPlaceholder="Search repositories..."
                    value={searchTerm}
                    onChange={setSearchTerm}
                />
                </Suspense>
                <Suspense fallback={<Spin />}>
                <SortRepo
                    sort={filters.sort}
                    order={filters.order}
                    sortOptions={[
                        { value: 'stars', label: 'Stars' },
                        { value: 'forks', label: 'Forks' },
                        { value: 'updated', label: 'Last Updated' },
                    ]}
                    orderOptions={[
                        { value: 'asc', label: 'Ascending' },
                        { value: 'desc', label: 'Descending' },
                    ]}
                    onSortChange={(sort, order) => {
                        if (order === 'asc' || order === 'desc') {
                            setFilter({ sort, order });
                        }
                    }}
                />
                </Suspense>
            </div>
            <Suspense fallback={<Skeleton active />}>
            <Filter
                languageOptions={['JavaScript', 'TypeScript', 'Python']}
                licenseOptions={['MIT', 'Apache']}
                starsOptions={['>1000', '1000-5000', '<1000']}
                language={pendingFilters.language}
                stars={pendingFilters.stars}
                license={pendingFilters.license}
                isSearching={loading}
                hasSearched={hasFiltered}
                onFilterChange={handleFilterChange}
                onSearch={handleApplyFilters}
                onReset={handleResetFilters}
            />
            </Suspense>
            <ReusableTable
                columns={repoTableColumns}
                dataSource={data as FlatRepo[]}
                loading={loading}
                pagination={{
                    current: filters.page,
                    pageSize: filters.perPage,
                    total: totalCount,
                }}
                onTableChange={handlePageChange}
            />
        </div>
    );
};

export default Home;
