import type {FlatRepo} from "../types/repo";
import type {ColumnsType} from "antd/es/table";

export const repoTableColumns: ColumnsType<FlatRepo> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (_, r) => (
            <a href={r.html_url} target="_blank" rel="noopener noreferrer">
                {r.name || 'NIL'}
            </a>
        ),
    },
    {
        title: 'Stars',
        dataIndex: 'stars',
        key: 'stars',
        render: (value) => value ?? 'NIL',
    },
    {
        title: 'Forks',
        dataIndex: 'forks',
        key: 'forks',
        render: (value) => value ?? 'NIL',
    },
    {
        title: 'Updated',
        dataIndex: 'updated',
        key: 'updated',
        render: (value) => value || 'NIL',
    },
    {
        title: 'Language',
        dataIndex: 'language',
        key: 'language',
        render: (value) => value || 'NIL',
    },
    {
        title: 'License',
        dataIndex: 'license',
        key: 'license',
        render: (value) => value || 'NIL',
    },
];
