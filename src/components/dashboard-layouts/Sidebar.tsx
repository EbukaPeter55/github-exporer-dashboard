import { Layout, Menu } from 'antd';
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface MenuItem {
    key: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
    label: string;
    onClick?: () => void;
}

interface SideBarProps {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
}

const { Sider } = Layout;

function getItem(label: string, key: string, icon?: React.ReactNode, onClick?: () => void): MenuItem {
    return {
        key,
        icon,
        children: undefined,
        label,
        onClick
    };
}

export default function SideBar({ collapsed, setCollapsed }: SideBarProps) {
    const navigate = useNavigate();

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === 'logout') {
            navigate('/');
            return;
        }
        navigate(key);
    };

    const items: MenuItem[] = [
        getItem('Dashboard', '/dashboard', <HomeOutlined />),
        getItem('Logout', 'logout', <LogoutOutlined />),
    ];

    return (
        <Sider
            width={200}
            collapsedWidth={0}
            collapsed={collapsed}
            breakpoint="md"
            onBreakpoint={(broken) => {
                setCollapsed(broken);
            }}
            className="custom-brand-colour"
            trigger={null}
        >
            <div className="demo-logo-vertical" />
            <Menu
                className='custom-brand-colour-menu'
                selectedKeys={[window.location.pathname]}
                mode="inline"
                items={items}
                onClick={handleMenuClick}
            />
        </Sider>
    );
}
