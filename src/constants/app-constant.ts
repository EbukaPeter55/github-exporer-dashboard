import type {Repo} from "../types/repo";
import type {ReactNode} from "react";

export const ApplicantsColumns: {
    title: string;
    dataIndex: keyof Repo;
    key: string;
    render?: (value: any) => ReactNode;
}[] = [
    {
        title: "Name",
        dataIndex: "fullname",
        key: "fullname",
        render: (fullname: string) => fullname || "Nil"
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
        render: (age: number | undefined) => (age !== undefined ? age : "Nil")
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (email: string) => email || "Nil"
    },
    {
        title: "Phone Number",
        dataIndex: "phone",
        key: "phone",
        render: (phone: string) => phone || "Nil"
    },
    {
        title: "Jobs Applied To",
        dataIndex: "jobTitle",
        key: "jobTitle",
        render: (jobTitle: string) => jobTitle || "Nil"
    }
];
