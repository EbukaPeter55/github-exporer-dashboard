import {Table, Button, Card, type TablePaginationConfig, Input, type TableProps, Typography} from "antd";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";

interface ReusableTableProps<T extends object> {
    columns: TableProps<T>["columns"];
    dataSource: T[];
    loading?: boolean;
    rowKey?: string;
    title?: string;
    buttonLabel?: string;
    buttonAdd?: string;
    onButtonClick?: () => void;
    pagination?: TablePaginationConfig;
    className?: string;
    showSearch?: boolean;
    searchPlaceholder?: string;
    onSearch?: (value: string) => void | Promise<void>;
    onTableChange?: (pagination: TablePaginationConfig) => void;
}

export default function ReusableTable<T extends object>({
                                                            columns,
                                                            dataSource,
                                                            loading = false,
                                                            rowKey = "id",
                                                            title,
                                                            buttonLabel,
                                                            onButtonClick,
                                                            pagination,
                                                            className = "",
                                                            showSearch = false,
                                                            searchPlaceholder = "Search...",
                                                            onSearch,
                                                            buttonAdd,
                                                            onTableChange
                                                        }: ReusableTableProps<T>) {
    return (
        <Card
            className={`shadow-sm rounded-lg ${className}`}
            bodyStyle={{padding: "16px"}}
        >
            <Typography.Title level={3}>Repositories</Typography.Title>
            <div className="flex justify-between items-center w-full">
                {title && <h2 className="text-lg font-bold">{title}</h2>}
                {buttonLabel && onButtonClick && (
                    <Button
                        icon={<PlusOutlined/>}
                        onClick={onButtonClick}
                        className="rounded-lg bg-[#FF6600] py-4 text-white"
                    >
                        {buttonLabel}
                    </Button>
                )}
            </div>
            <div className="flex w-[20rem] justify-end gap-2 items-center mb-4">
                {showSearch && onSearch && (
                    <Input
                        placeholder={searchPlaceholder}
                        prefix={<SearchOutlined/>}
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-30 rounded-lg"
                    />
                )}
                {buttonAdd && onButtonClick && (
                    <Button
                        icon={<PlusOutlined/>}
                        onClick={onButtonClick}
                        className="rounded-lg bg-[#FF6600] py-4 text-white"
                    >
                        {buttonAdd}
                    </Button>
                )}
            </div>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                rowKey={rowKey}
                pagination={pagination}
                scroll={{ x: 'max-content' }}
                bordered
                onChange={onTableChange}
            />
        </Card>
    );
}
