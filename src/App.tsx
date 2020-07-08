import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { ROUTES } from './routes';
import { TokenPage } from './pages/Token';
import { ScenarioPage } from './pages/Scenario';
import { ConfigPage } from './pages/Config';
import { MainPage } from './pages/Main';
import './App.scss';
import { BasicLayout } from './components/BasicLayout';

export interface IAppProps {}

export const App: React.FC<IAppProps> = (props: IAppProps) => {
    return (
        <Router>
            <BasicLayout>
                <Switch>
                    <Route path={[ROUTES.TOKEN]} component={TokenPage} />
                    <Route path={ROUTES.SCENARIO} component={ScenarioPage} />
                    <Route path={ROUTES.CONFIG} component={ConfigPage} />
                    <Route path={ROUTES.MAIN} component={MainPage} />
                    <Redirect to={ROUTES.TOKEN} />
                </Switch>
            </BasicLayout>
        </Router>
    );
};
