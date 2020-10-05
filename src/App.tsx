import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { ROUTES } from './routes';
import { ScenarioPage } from './pages/Scenario';
import { ConfigPage } from './pages/Config';
import { MainPage } from './pages/Main';
import { BasicLayout } from './components/BasicLayout';
import './App.scss';

export const App: React.FC = () => {
    return (
        <Router>
            <BasicLayout>
                <Switch>
                    <Route path={ROUTES.SCENARIO} component={ScenarioPage} />
                    <Route path={ROUTES.CONFIG} component={ConfigPage} />
                    <Route path={ROUTES.MAIN} component={MainPage} />
                    <Redirect to={ROUTES.SCENARIO} />
                </Switch>
            </BasicLayout>
        </Router>
    );
};
