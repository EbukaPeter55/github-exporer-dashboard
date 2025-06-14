import React, {Suspense} from "react";
import {Layout, theme} from 'antd';
import {Route, Routes} from "react-router-dom";
import SideBar from "../components/dashboard-layouts/Sidebar";

const Home = React.lazy(() => import("./Home"));

const {Header, Content, Footer} = Layout;

export default function Dashboard() {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <div>
            {/*<Router>*/}
            <Layout style={{minHeight: '100vh'}}>
                <SideBar/>
                <Layout>
                    <Header
                        style={{
                            padding: "0 16px",
                            background: colorBgContainer,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <h3 style={{margin: 0, fontSize: "18px"}}>Hello, Admin</h3>
                    </Header>
                    <Content style={{margin: '0 16px', backgroundColor: "white"}}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <div>
                                <Routes>
                                    <Route path="/"
                                           element={
                                               <Home/>
                                           }
                                    />
                                </Routes>
                            </div>
                        </Suspense>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        GitHub Explorer © {new Date().getFullYear()}
                    </Footer>
                </Layout>
            </Layout>

        </div>
    )
}
