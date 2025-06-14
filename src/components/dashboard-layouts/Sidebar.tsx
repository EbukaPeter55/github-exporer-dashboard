import {useState} from 'react';
import {Layout, Menu} from 'antd';
import {HomeOutlined, LogoutOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

interface MenuItem {
    key: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
    label: string;
    onClick?: () => void;
}

const {Sider} = Layout;

function getItem(label: string, key: string, icon?: React.ReactNode, onClick?: () => void): MenuItem {
    return {
        key,
        icon,
        children: undefined,
        label,
        onClick
    };
}

export default function SideBar() {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate();

    const handleMenuClick = ({key}: { key: string }) => {
        if (key === '/logout') {
            // Handle logout functionality if needed
            return;
        }
        navigate(key);
    };

    const handleLogout = () =>{
        navigate('/');
    }

    const items: MenuItem[] = [
        getItem('Dashboard', '/dashboard', <HomeOutlined/>),
        getItem('Logout', 'logout', <LogoutOutlined/>, handleLogout),
    ];

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
               className='custom-brand-colour'>
            <div className="demo-logo-vertical"/>
            <Menu
                className='custom-brand-colour-menu'
                selectedKeys={[window.location.pathname]}
                mode="inline"
                items={items}
                onClick={handleMenuClick}
            />
        </Sider>
    )
}
