import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

interface ReusableSearchBarProps {
    showSearch?: boolean;
    searchPlaceholder?: string;
    onSearch?: (value: string) => void;
    buttonAddLabel?: string;
    onButtonClick?: () => void;
    customButtonIcon?: React.ReactNode;
}

export const ReusableSearchBar: React.FC<ReusableSearchBarProps> = ({
                                                                        showSearch = false,
                                                                        searchPlaceholder = 'Search...',
                                                                        onSearch,
                                                                        buttonAddLabel,
                                                                        onButtonClick,
                                                                        customButtonIcon,
                                                                    }) => {
    return (
        <div className="flex w-[20rem] justify-end gap-2 items-center mb-4">
            {showSearch && onSearch && (
                <Input
                    placeholder={searchPlaceholder}
                    prefix={<SearchOutlined />}
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-30 rounded-lg"
                />
            )}
            {buttonAddLabel && onButtonClick && (
                <Button
                    icon={customButtonIcon || <PlusOutlined />}
                    onClick={onButtonClick}
                    className="rounded-lg bg-[#FF6600] py-4 text-white"
                >
                    {buttonAddLabel}
                </Button>
            )}
        </div>
    );
};
