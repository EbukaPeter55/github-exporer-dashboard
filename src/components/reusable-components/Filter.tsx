import React from "react";
import {Select, Button, Spin} from "antd";

const {Option} = Select;

interface GenericFiltersProps {
    languageOptions: string[];
    licenseOptions: string[];
    starsOptions: string[];
    language: string | null;
    stars: string | null;
    license: string | null;
    isSearching: boolean;
    hasSearched: boolean;
    onFilterChange: (key: string, value: string) => void;
    onSearch: () => void;
    onReset: () => void;
}

const Filter: React.FC<GenericFiltersProps> = ({
                                                   languageOptions,
                                                   licenseOptions,
                                                   starsOptions,
                                                   language,
                                                   stars,
                                                   license,
                                                   isSearching,
                                                   hasSearched,
                                                   onFilterChange,
                                                   onSearch,
                                                   onReset,
                                               }) => {

    const isApplyDisabled = isSearching || (!language && !stars && !license);

    return (
        <div className="flex flex-wrap gap-2 items-center mb-4">
            {/* Language Filter */}
            <Select
                value={language}
                onChange={(value) => onFilterChange("language", value)}
                placeholder="Language"
                className="w-44"
                allowClear
            >
                {languageOptions.map((lang) => (
                    <Option key={lang} value={lang}>
                        {lang}
                    </Option>
                ))}
            </Select>

            {/* Stars Filter */}
            <Select
                value={stars}
                onChange={(value) => onFilterChange("stars", value)}
                placeholder="Stars"
                className="w-44"
                allowClear
            >
                {starsOptions.map((opt) => (
                    <Option key={opt} value={opt}>
                        {opt}
                    </Option>
                ))}
            </Select>

            {/* License Filter */}
            <Select
                value={license}
                onChange={(value) => onFilterChange("license", value)}
                placeholder="License"
                className="w-44"
                allowClear
            >
                {licenseOptions.map((lic) => (
                    <Option key={lic} value={lic}>
                        {lic}
                    </Option>
                ))}
            </Select>

            <Button
                type="primary"
                onClick={onSearch}
                className="ant-layout-sider-trigger rounded-lg text-white"
                disabled={isApplyDisabled}
            >
                {isSearching ? <Spin size="small"/> : "Apply Filters"}
            </Button>

            {hasSearched && (
                <Button type="default" onClick={onReset} className="rounded-lg">
                    Reset
                </Button>
            )}
        </div>
    );
};

export default React.memo(Filter);
