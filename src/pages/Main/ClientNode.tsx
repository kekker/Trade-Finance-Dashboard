import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Client, Deal, DEFAULT_SCENARIO, ScenarioParamsItem } from '../../types';
import { fetchCurrentDeal, getCurrentScenario } from '../../utils';
import { DealInfo } from './DealInfo';
import { NEW_STATUS, START_STATUS } from '../../scenarios';
import { fetchSetSetStatus, fetchUploadFile } from '../../api';
import { ModalSetStatus, ModalSubmitParams } from './ModalSetStatus';
import { RequestsList } from './RequestsList';

export interface ClientNodeProps {
    client: Client;
}
const UPDATE = 2000;

export const ClientNode: React.FC<ClientNodeProps> = (props: ClientNodeProps) => {
    const { client } = props;
    const [isShowModal, setShowModal] = useState(false);
    const [applyStatuses, setApplyStatuses] = useState<string[]>([]);
    const [deal, setDeal] = useState<Deal>();
    const clientUrl = client?.url || '';
    const dealUid = deal?.uid || '';
    const dealStatus = deal?.status === START_STATUS ? NEW_STATUS : deal?.status || '';
    const scenario = useMemo(() => {
        return getCurrentScenario();
    }, []);
    const updateDeal = useCallback(() => {
        (async () => {
            if (client.url) {
                const newDeal = await fetchCurrentDeal(client.url);
                setDeal(newDeal);
            }
        })();
    }, [client]);

    useEffect(() => {
        if (client?.url) {
            setInterval(updateDeal, UPDATE);
        }
    }, [client, updateDeal]);

    const currentRole = useMemo(() => {
        if (deal) {
            return deal?.parties.find(party => party.key === client.key)?.role;
        }
        return '';
    }, [client, deal]);

    const nextStatusObjArr = useMemo(() => {
        return (
            deal?.statusMap.filter(
                _statusMap => _statusMap.status === dealStatus && _statusMap.role === currentRole,
            ) || []
        );
    }, [currentRole, deal, dealStatus]);

    const handleClickStatusButton = useCallback(() => {
        setShowModal(true);
    }, []);
    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);
    const handleSubmitModal = useCallback(
        (nextStatus: string, scenarioParams: ScenarioParamsItem) => (data?: ModalSubmitParams) => {
            setApplyStatuses(statuses => [...statuses, nextStatus]);
            (async () => {
                if (data && data.file) {
                    const nativeFileName = data.file.name;
                    const arrSplitFileName = nativeFileName.split('.');
                    const nativeFileExtension = arrSplitFileName.slice(-1);
                    const fileExtension = scenarioParams.fileKindExtension || nativeFileExtension;
                    const fileName = scenarioParams.fileKindName || arrSplitFileName.slice(0, -1);

                    await fetchUploadFile(
                        dealUid,
                        {
                            file: data.file,
                            fileKind: `${fileName}.${fileExtension}`,
                            recipients: scenarioParams.recipients,
                        },
                        clientUrl,
                    );
                }
                if (deal) {
                    await fetchSetSetStatus(
                        {
                            dealUid,
                            status: nextStatus || '',
                        },
                        clientUrl,
                    );
                    updateDeal();
                }
                handleCloseModal();
            })();
        },
        [clientUrl, deal, dealUid, handleCloseModal, updateDeal],
    );

    return (
        <div>
            <div className="pt-3">
                <h3>
                    <b>NODE</b>
                    {` ${client?.key || ''} ${currentRole || ''}`}
                    <div className="small" style={{ fontSize: '14px' }}>
                        {clientUrl}
                    </div>
                </h3>
            </div>
            <div>
                {deal ? (
                    <div>
                        <div>
                            <DealInfo deal={deal} clientUrl={clientUrl} />
                        </div>
                        {/* ACTIONS */}
                        <div>
                            <div className="h4 mt-4">
                                <b>Actions</b>
                            </div>
                            {nextStatusObjArr?.length ? (
                                nextStatusObjArr.map(nextStatusObj => {
                                    const currScenarioParams =
                                        scenario.scenario[nextStatusObj.statusNext] || DEFAULT_SCENARIO;
                                    const isDisabled = applyStatuses.includes(nextStatusObj.statusNext);
                                    return (
                                        <>
                                            <button
                                                disabled={isDisabled}
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={handleClickStatusButton}>
                                                {isDisabled
                                                    ? 'Processing...'
                                                    : `Set ${nextStatusObj.statusNext} status`}
                                            </button>
                                            {isShowModal ? (
                                                <ModalSetStatus
                                                    show
                                                    scenarioParams={currScenarioParams}
                                                    onHide={handleCloseModal}
                                                    onSubmit={handleSubmitModal(
                                                        nextStatusObj.statusNext,
                                                        currScenarioParams,
                                                    )}
                                                />
                                            ) : null}
                                        </>
                                    );
                                })
                            ) : (
                                <div>No Actions</div>
                            )}
                        </div>
                        {/* REQUESTS */}
                        <div>
                            <RequestsList clientUrl={clientUrl} />
                        </div>
                    </div>
                ) : (
                    'Waiting information...'
                )}
            </div>
        </div>
    );
};
