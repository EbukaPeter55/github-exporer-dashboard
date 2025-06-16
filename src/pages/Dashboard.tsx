import React, { Suspense, useState } from "react";
import { Layout, theme, Button } from 'antd';
import { Route, Routes } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import SideBar from "../components/dashboard-layouts/Sidebar";

const Home = React.lazy(() => import("./Home"));

const { Header, Content, Footer } = Layout;

export default function Dashboard() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout>
                <Header
                    style={{
                        padding: "0 16px",
                        background: colorBgContainer,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Button
                        className="hamburger-menu"
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: '20px', marginRight: '16px', display: 'inline-flex' }}
                    />
                    <h3 style={{ margin: 0, fontSize: "18px" }}>Hello, Admin</h3>
                </Header>

                <Content style={{ margin: '0 16px', backgroundColor: "white" }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <div>
                            <Routes>
                                <Route path="/" element={<Home />} />
                            </Routes>
                        </div>
                    </Suspense>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    GitHub Explorer © {new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
}
