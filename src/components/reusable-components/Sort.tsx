import {Select, Space, Tooltip} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';

type Props<T extends string, U extends string> = {
    sort: T;
    order: U;
    sortOptions: { value: T; label: string }[];
    orderOptions: { value: U; label: string }[];
    onSortChange: (sort: T, order: U) => void;
};

export default function SortRepo<T extends string, U extends string>({
                                                                         sort,
                                                                         order,
                                                                         sortOptions,
                                                                         orderOptions,
                                                                         onSortChange,
                                                                     }: Props<T, U>) {
    return (
        <Space className="flex flex-wrap">
            <Space>
                <Select
                    value={sort || undefined}
                    placeholder="Sort by"
                    onChange={(value) => onSortChange(value, order)}
                    options={sortOptions}
                    style={{width: 140}}
                />
                <Tooltip title="Choose how to sort the repositories">
                    <InfoCircleOutlined style={{color: '#999', cursor: 'pointer'}}/>
                </Tooltip>
            </Space>

            <Space>
                <Select
                    value={order || undefined}
                    placeholder="Order"
                    onChange={(value) => onSortChange(sort, value)}
                    options={orderOptions}
                    style={{width: 140}}
                />
                <Tooltip title="Select sorting direction">
                    <InfoCircleOutlined style={{color: '#999', cursor: 'pointer'}}/>
                </Tooltip>
            </Space>
        </Space>
    );
}
