import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { SCENARIOS } from '../../scenarios';
import { Scenario } from '../../types';
import { setScenarioId } from '../../utils';
import './style.scss';

export const ScenarioPage: React.FC = () => {
    const history = useHistory();
    const onClickScenario = useCallback(
        (scenario: Scenario) => () => {
            setScenarioId(scenario.id);
            history.push(ROUTES.CONFIG);
        },
        [history],
    );
    return (
        <div className="row d-flex h-100 justify-content-center align-items-center">
            <div className="card col-lg-4 col-md-8 col-sm-10">
                <div className="card-body">
                    <h5 className="card-title">
                        <h3>
                            <b>Step 2.</b>
                            Scenario
                        </h3>
                    </h5>
                    <div>
                        <div className="list-group list-group-flush list-scenario border">
                            {SCENARIOS.map(scenario => (
                                <div
                                    role="presentation"
                                    key={scenario.id}
                                    className="list-group-item list-group-item-action"
                                    onClick={onClickScenario(scenario)}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">
                                            <b>{scenario.name}</b>
                                        </h5>
                                        <small>{scenario.controlled ? 'controlled' : 'uncontrolled'}</small>
                                    </div>
                                    <p className="mb-1">{scenario.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
