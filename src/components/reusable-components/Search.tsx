import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

interface ReusableSearchBarProps {
    showSearch?: boolean;
    searchPlaceholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    buttonAddLabel?: string;
    onButtonClick?: () => void;
    customButtonIcon?: React.ReactNode;
}

const ReusableSearchBar: React.FC<ReusableSearchBarProps> = ({
                                                                        showSearch = false,
                                                                        searchPlaceholder = 'Search...',
                                                                        value,
                                                                        onChange,
                                                                        buttonAddLabel,
                                                                        onButtonClick,
                                                                        customButtonIcon,
                                                                    }) => {
    return (
        <div className="flex w-[20rem] justify-end gap-2 items-center">
            {showSearch && (
                <Input
                    value={value}
                    placeholder={searchPlaceholder}
                    prefix={<SearchOutlined />}
                    onChange={(e) => onChange?.(e.target.value)}
                    className="w-30 rounded-lg"
                />
            )}
            {buttonAddLabel && (
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

export default React.memo(ReusableSearchBar);
