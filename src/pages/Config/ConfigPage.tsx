import React, { useCallback, useState, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import {
    NETWORK_TYPES,
    ROLES_ARR,
    DEFAULT_PARTY,
    DEFAULT_PARAMETER,
    NETWORK_TYPES_LIST,
    Deal,
    ClientFull,
} from '../../types';
import { fetchClients, fetchCreateDealFree } from '../../api';
import { getCurrentScenario, setNetworkType, waitCreateDeal } from '../../utils';
import { ROUTES } from '../../routes';

import './style.scss';

export const ConfigPage: React.FC = () => {
    const history = useHistory();
    const scenario = useMemo(getCurrentScenario, []);
    const [deal, setDeal] = useState<Partial<Deal>>({ ...scenario.deal });
    const [type, setType] = useState<NETWORK_TYPES>(NETWORK_TYPES.Quorum);
    const [clients, setClients] = useState<ClientFull[]>([]);
    const [showLoading, setShowLoading] = useState<boolean>(false);

    const handleAppendParticipant = useCallback(
        e => {
            e.preventDefault();
            setDeal(_deal => {
                return {
                    ...deal,
                    parties: [...(_deal.parties || []), { ...DEFAULT_PARTY }],
                };
            });
        },
        [deal],
    );

    const handleSelectType = useCallback(
        (_typeID: NETWORK_TYPES) => () => {
            setType(_typeID);
        },
        [setType],
    );

    useEffect(() => {
        setNetworkType(type);
    }, [type]);

    const handleSelectParticipantClient = useCallback(
        index => (e: React.ChangeEvent<HTMLSelectElement>) => {
            const key = e.target.value;
            setDeal(_deal => {
                const newParties = _deal.parties || [];
                newParties[index] = { ...newParties[index], key };
                return {
                    ..._deal,
                    parties: newParties,
                };
            });
        },
        [],
    );

    const handleSelectParticipantRole = useCallback(
        index => (e: React.ChangeEvent<HTMLSelectElement>) => {
            const role = e.target.value;
            setDeal(_deal => {
                const newParties = _deal.parties || [];
                newParties[index] = { ...newParties[index], role };
                return {
                    ..._deal,
                    parties: newParties,
                };
            });
        },
        [],
    );

    const handleDeleteParticipant = useCallback(
        index => () => {
            setDeal(_deal => {
                const newParties = _deal.parties || [];
                return {
                    ..._deal,
                    parties: newParties.filter((_el, _index) => _index !== index),
                };
            });
        },
        [],
    );

    useEffect(() => {
        (async () => {
            const newClients = await fetchClients(type);
            setClients(newClients);
            setDeal(_deal => {
                const newParties = _deal.parties || [];
                return {
                    ..._deal,
                    parties: newParties.map((_el, index) => ({
                        ..._el,
                        key: newClients[index]?.key || newClients[0]?.key,
                    })),
                };
            });
        })();
    }, [type]);

    const handleClickAppendParameter = useCallback(() => {
        setDeal(_deal => {
            return {
                ..._deal,
                parameters: [...(_deal.parameters || []), { ...DEFAULT_PARAMETER }],
            };
        });
    }, []);

    const handleClickDeleteParameter = useCallback(
        index => () => {
            setDeal(_deal => {
                return {
                    ..._deal,
                    parameters: (_deal.parameters || []).filter((_el, _index) => _index !== index),
                };
            });
        },
        [],
    );

    const handleChangeParameterKey = useCallback(
        index => (e: React.ChangeEvent<HTMLInputElement>) => {
            const key = e.target.value;
            setDeal(_deal => {
                const newParameters = _deal.parameters || [];
                newParameters[index] = { ...newParameters[index], key };
                return {
                    ..._deal,
                    parameters: newParameters,
                };
            });
        },
        [],
    );

    const handleChangeParameterValue = useCallback(
        index => (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setDeal(_deal => {
                const newParameters = _deal.parameters || [];
                newParameters[index] = { ...newParameters[index], value };
                return {
                    ..._deal,
                    parameters: newParameters,
                };
            });
        },
        [],
    );

    const handleClickStart = useCallback(() => {
        (async () => {
            const result = await fetchCreateDealFree(deal);
            setShowLoading(true);
            await waitCreateDeal(result.queueId);
            setShowLoading(false);
            history.push(ROUTES.MAIN);
        })();
    }, [deal, history]);

    return (
        <div className="row d-flex h-100 justify-content-center align-items-center">
            {showLoading ? <div className="loading">Processing</div> : null}
            <div className="card col-lg-8 col-md-12 col-sm-12">
                <div className="card-body">
                    <div>
                        <h3 className="card-title   ">
                            <b>Step 2.</b>
                            Configuring the scenario
                        </h3>
                        <div className="mb-3 pb-3 ">
                            <h5 className="card-title">Technology</h5>
                            <div>
                                <ul className="list-group list-group-horizontal list-types">
                                    {NETWORK_TYPES_LIST.map(_type => (
                                        <li
                                            key={_type.id}
                                            role="presentation"
                                            className={cn([
                                                'list-group-item list-group-item-action text-center ',
                                                type === _type.id && 'active',
                                            ])}
                                            onClick={handleSelectType(_type.id)}>
                                            <strong>{_type.value}</strong>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/* Participant */}
                        <div className="mb-3 pb-3 ">
                            <h5 className="card-title">Parties</h5>
                            <div>
                                {deal?.parties?.map((party, index) => (
                                    <div key={`${party?.key}${party?.role}`} className="form-row">
                                        <div className="col-sm-2 col-form-label">{`Party ${index + 1}`}</div>
                                        <div className="form-group col-md-5">
                                            <select
                                                className="form-control"
                                                onChange={handleSelectParticipantClient(index)}
                                                value={party.key}>
                                                {clients.map(_client => (
                                                    <option key={_client.key} value={_client.key}>
                                                        {_client.info}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <select
                                                disabled={!scenario.canChangePartyRole}
                                                className="form-control"
                                                onChange={handleSelectParticipantRole(index)}
                                                value={party.role}>
                                                <option> -- Choose Role</option>
                                                {ROLES_ARR.map(_role => (
                                                    <option key={_role} value={_role}>
                                                        {_role}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {scenario.canDeleteParty ? (
                                            <div className="form-group col-md-1">
                                                {index > 0 ? (
                                                    <button
                                                        type="button"
                                                        className="btn  btn-outline-danger"
                                                        onClick={handleDeleteParticipant(index)}>
                                                        Delete
                                                    </button>
                                                ) : null}
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                                {scenario.canAppendParty ? (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleAppendParticipant}>
                                        Append participant
                                    </button>
                                ) : null}
                            </div>
                        </div>
                        {/* Parameters */}
                        <div className="mb-3 ">
                            <h5 className="card-title">Parameters</h5>
                            <div>
                                {deal.parameters?.length === 0 ? (
                                    <div className="text-muted mb-3">
                                        Parameters are empty, set parameters
                                    </div>
                                ) : (
                                    deal.parameters?.map((parameter, index) => (
                                        <div key={parameter.key} className="form-row">
                                            <div className="col-sm-2 col-form-label">
                                                {`Parameter ${index + 1}`}
                                            </div>
                                            <div className="form-group col-md-5">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Field name"
                                                    onChange={handleChangeParameterKey(index)}
                                                    value={parameter.key}
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Field value"
                                                    onChange={handleChangeParameterValue(index)}
                                                    value={parameter.value}
                                                />
                                            </div>
                                            <div className="form-group col-md-1">
                                                <button
                                                    type="button"
                                                    className="btn  btn-outline-danger"
                                                    onClick={handleClickDeleteParameter(index)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleClickAppendParameter}>
                                    Append Parameter
                                </button>
                            </div>
                        </div>
                        {/* STATUSES */}
                        <div className="mb-3 ">
                            <h5 className="card-title">Status map</h5>
                            <div>
                                {deal.transitions?.map((statusItem, index) => (
                                    <div
                                        className="form-row"
                                        key={
                                            statusItem.status + statusItem.statusNext + statusItem.roles?.[0]
                                        }>
                                        <div className="col-sm-2 col-form-label">{`Status ${index + 1}`}</div>
                                        <div className="form-group col-md-3">
                                            <input
                                                disabled={!scenario.canChangeStatusMap}
                                                type="text"
                                                className="form-control"
                                                placeholder="Status"
                                                value={statusItem.status}
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <input
                                                disabled={!scenario.canChangeStatusMap}
                                                type="text"
                                                className="form-control"
                                                placeholder="Next Status"
                                                value={statusItem.statusNext}
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <select
                                                className="form-control"
                                                disabled={!scenario.canChangeStatusMap}
                                                value={statusItem.roles?.[0]}>
                                                {ROLES_ARR.map(_role => (
                                                    <option
                                                        key={_role}
                                                        value={_role}
                                                        disabled={!scenario.canChangeStatusMap}>
                                                        {_role}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {scenario.canChangeStatusMap ? (
                                            <div className="form-group col-md-1">
                                                <button type="button" className="btn  btn-outline-danger">
                                                    Delete
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                                {scenario.canChangeStatusMap ? (
                                    <button type="button" className="btn btn-outline-primary">
                                        Append transition
                                    </button>
                                ) : null}
                            </div>
                        </div>
                        <div className="mb-3 ">
                            <button
                                type="button"
                                className="btn btn-lg btn-primary"
                                onClick={handleClickStart}>
                                Start Scenario
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
