import React, {useEffect, useState} from 'react';
import { ReusableSearchBar } from '../components/reusable-components/Search';
import { useRepositories } from '../hooks/useRepositories';
import {type TablePaginationConfig} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ReusableTable from "../components/reusable-components/Table";
import {Filter} from "../components/reusable-components/Filter";
import type {Filters, FlatRepo} from "../types/repo";
import {useDebouncedValue} from "../hooks/useDebouncedValue";
import SortRepo from "../components/reusable-components/Sort";


 const Home: React.FC = () => {
     const {
         data,
         totalCount,
         loading,
         // error,
         filters,
         setFilter
     } = useRepositories();
     const [pendingFilters, setPendingFilters] = useState({
         language: null,
         stars: null,
         license: null
     });
     const [hasFiltered, setHasFiltered] = useState(false);
     const [searchTerm, setSearchTerm] = useState(filters.query || '');
     const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);

     // Update API search filter when debounced value changes
     useEffect(() => {
         setFilter({ query: debouncedSearchTerm, page: 1 });
     }, [debouncedSearchTerm]);


     const initialFilters: Filters = {
         language: null,
         stars:    null,
         license:  null,
         sort:     'stars',
         order:    'desc',
         page:     1,
         perPage: 10,
         query:   '',
     };

     const columns: ColumnsType<FlatRepo> = [
         {
             title: 'Name',
             dataIndex: 'name',
             key: 'name',
             render: (_, r) => (
                 <a href={r.html_url} target="_blank" rel="noopener noreferrer">
                     {r.name}
                 </a>
             ),
         },
         { title: 'Stars', dataIndex: 'stars', key: 'stars' },
         { title: 'Forks', dataIndex: 'forks', key: 'forks' },
         { title: 'Updated', dataIndex: 'updated', key: 'updated' },
         { title: 'Language', dataIndex: 'language', key: 'language' },
         { title: 'License', dataIndex: 'license', key: 'license' },
     ];

     const handleFilterChange = (key: string, value: string | null) => {
         setPendingFilters((prev) => ({
             ...prev,
             [key]: value
         }));
     };

     const handleApplyFilters = () => {
         setFilter(pendingFilters);
         setHasFiltered(true);
     };

     const handleResetFilters = () => {
         setPendingFilters({ language: null, stars: null, license: null });
         setFilter(initialFilters);      // ← fully reset to initial
         setHasFiltered(false);
     };


     // const handleSort = (field: 'stars' | 'forks' | 'updated', order: 'ascend' | 'descend') => {
    //     setFilter({
    //         sortField: field,
    //         sortOrder: order === 'ascend' ? 'asc' : 'desc',
    //     });
    // };

    const handlePageChange = (pag: TablePaginationConfig) => {
        setFilter({
            page: pag.current || 1,
            perPage: pag.pageSize || 10,
        });
    };

    return (
        <div className="p-4">
            <div className="flex flex-row flex-wrap items-center gap-4 mb-6">
                <ReusableSearchBar
                    showSearch
                    searchPlaceholder="Search repositories..."
                    value={searchTerm}
                    onChange={setSearchTerm}
                />
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
                    onSortChange={(sort, order) => setFilter({ sort, order })}
                />
            </div>
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
            <ReusableTable
                title="Repositories"
                columns={columns}
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
