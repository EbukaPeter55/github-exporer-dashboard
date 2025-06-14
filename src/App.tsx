import {lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Spin} from "antd";

const Dashboard = lazy(() => import('./pages/Dashboard.tsx'))

const App = () => {

    return (
        <Router>
            <Suspense fallback={<Spin size="large" style={{display: 'block', margin: '20vh auto'}}/>}>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/dashboard/*" element={
                        <Dashboard/>
                    }/>
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
