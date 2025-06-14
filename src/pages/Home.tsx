import React, { useState } from 'react';
import {type TablePaginationConfig } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ReusableTable from "../components/reusable-components/Table";
import {Filter} from "../components/reusable-components/Filter";
import {useDebouncedValue} from "../hooks/useDebouncedValue";
import {ReusableSearchBar} from "../components/reusable-components/Search";

interface RepoItem {
  id: number;
  name: string;
  stars: number;
  forks: number;
  updated: string;
  language: string;
  license: string;
}

const initialData: RepoItem[] = [
  {
    id: 1,
    name: 'react',
    stars: 210000,
    forks: 43000,
    updated: '12/06/2025',
    language: 'JavaScript',
    license: 'MIT',
  },
  {
    id: 2,
    name: 'vue',
    stars: 130000,
    forks: 27000,
    updated: '20/05/2025',
    language: 'JavaScript',
    license: 'MIT',
  },
  {
    id: 3,
    name: 'next.js',
    stars: 120000,
    forks: 22000,
    updated: '01/04/2025',
    language: 'TypeScript',
    license: 'MIT',
  },
];

 const Home: React.FC = () => {
  const [data, setData] = useState<RepoItem[]>(initialData);

  const [loading] = useState(false);
   const [searchValue, setSearchValue] = useState('');
   const debouncedSearchValue = useDebouncedValue(searchValue, 500);
   const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 3,
  });

   // filter states
   const [language, setLanguage] = useState<string | null>(null);
   const [stars, setStars] = useState<string | null>(null);
   const [license, setLicense] = useState<string | null>(null);
   const [isSearching, setIsSearching] = useState(false);
   const [hasSearched, setHasSearched] = useState(false);

   const handleFilterChange = (key: string, value: string) => {
     if (key === 'language') setLanguage(value);
     if (key === 'stars') setStars(value);
     if (key === 'license') setLicense(value);
   };

   const handleFilter = () => {
     setIsSearching(true);
     let filtered = [...initialData];

     if (language) {
       filtered = filtered.filter((item) => item.language === language);
     }

     if (license) {
       filtered = filtered.filter((item) => item.license === license);
     }

     if (stars) {
       if (stars === '>1000') {
         filtered = filtered.filter((item) => item.stars > 1000);
       } else if (stars === '1000-5000') {
         filtered = filtered.filter((item) => item.stars >= 1000 && item.stars <= 5000);
       } else if (stars === '<1000') {
         filtered = filtered.filter((item) => item.stars < 1000);
       }
     }

     setData(filtered);
     setPagination((prev) => ({ ...prev, total: filtered.length }));
     setIsSearching(false);
     setHasSearched(true);
   };

   const handleSearch = (value: string) => {
     setSearchValue(value);
   };

   const handleReset = () => {
     setLanguage(null);
     setStars(null);
     setLicense(null);
     setData(initialData);
     setPagination((prev) => ({ ...prev, total: initialData.length }));
     setHasSearched(false);
   };

   const handleTableChange = (pagination: TablePaginationConfig) => {
     setPagination(pagination);
   };

   // Apply debounced search to data
   const filteredData = data.filter((item) =>
       [
         item.name,
         item.language,
         item.license,
         String(item.stars),
         String(item.forks),
         item.updated
       ].some(field =>
           field.toLowerCase().includes(debouncedSearchValue.toLowerCase())
       )
   );

   const columns: ColumnsType<RepoItem> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a href="#">{text}</a>,
    },
    {
      title: 'Stars',
      dataIndex: 'stars',
      key: 'stars',
    },
    {
      title: 'Forks',
      dataIndex: 'forks',
      key: 'forks',
    },
    {
      title: 'Updated',
      dataIndex: 'updated',
      key: 'updated',
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: 'License',
      dataIndex: 'license',
      key: 'license',
    },
  ];



  return (
      <div className="p-4">
        <div className="w-full">
          <Filter
              languageOptions={['JavaScript', 'TypeScript']}
              licenseOptions={['MIT', 'Apache']}
              starsOptions={['>1000', '1000-5000', '<1000']}
              language={language}
              stars={stars}
              license={license}
              isSearching={isSearching}
              hasSearched={hasSearched}
              onFilterChange={handleFilterChange}
              onSearch={handleFilter}
              onReset={handleReset}
          />
        </div>
        <div className="w-full">
          <ReusableSearchBar
              showSearch
              searchPlaceholder="Search repositories..."
              onSearch={handleSearch}
          />
        </div>

        <ReusableTable
            title="Repositories"
            columns={columns}
            dataSource={filteredData}
            loading={loading}
            pagination={pagination}
            showSearch={false}
            searchPlaceholder="Search repositories..."
            onSearch={handleFilter}
            onTableChange={handleTableChange}
        />
      </div>
  );
};

export default Home;
