import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { ClientFull, DEFAULT_SCENARIO, ScenarioParamsItem } from '../../types';
import { getCurrentScenario, getDealUid } from '../../utils';
import { DealInfo } from './DealInfo';
import { NEW_STATUS, START_STATUS } from '../../scenarios';
import { fetchEditDeal, fetchUploadFile } from '../../api';
import { ModalSetStatus, ModalSubmitParams } from './ModalSetStatus';
import { RequestsList } from './RequestsList';
import { useDeal } from '../../hooks/useDeal';
import { EventsList } from './EventsList';

export interface ClientNodeProps {
    client: ClientFull;
}

export const ClientNode: React.FC<ClientNodeProps> = (props: ClientNodeProps) => {
    const { client } = props;

    const [showModalName, setShowModalName] = useState<string>('');
    const [applyStatuses, setApplyStatuses] = useState<string[]>([]);
    const clientUrl = client?.url || '';

    // const dealUid = deal?.uid || '';
    const dealUid = getDealUid();
    const { deal, requests, events, setRequests } = useDeal(clientUrl);
    const dealStatus = deal?.status === START_STATUS ? NEW_STATUS : deal?.status || '';
    const scenario = useMemo(() => {
        return getCurrentScenario();
    }, []);

    useEffect(() => {
        setApplyStatuses([]);
    }, [deal?.status]);

    const currentRole = useMemo(() => {
        if (deal) {
            return deal?.parties.find(party => party.key === client.key)?.role;
        }
        return '';
    }, [client, deal]);

    const nextStatusObjArr = useMemo(() => {
        return (
            deal?.transitions?.filter(
                _statusMap =>
                    _statusMap.status === dealStatus && _statusMap.roles.includes(currentRole || ''),
            ) || []
        );
    }, [currentRole, deal, dealStatus]);

    const handleClickStatusButton = useCallback(
        modalName => () => {
            setShowModalName(modalName);
        },
        [],
    );
    const handleCloseModal = useCallback(() => {
        setShowModalName('');
    }, []);
    const handleSubmitModal = useCallback(
        (nextStatus: string, scenarioParams: ScenarioParamsItem) => (data?: ModalSubmitParams) => {
            setApplyStatuses(statuses => [...statuses, nextStatus]);
            (async () => {
                let fileObj: any = null;
                if (data && data.file) {
                    const nativeFileName = data.file.name;
                    const arrSplitFileName = nativeFileName.split('.');
                    const nativeFileExtension = arrSplitFileName.slice(-1);
                    const fileExtension = scenarioParams.fileKindExtension || nativeFileExtension;
                    const fileName = scenarioParams.fileKindName || arrSplitFileName.slice(0, -1);
                    const fileResponse = await fetchUploadFile(
                        dealUid,
                        {
                            file: data.file,
                        },
                        clientUrl,
                    );
                    setRequests(fileResponse);

                    fileObj = {
                        kind: Array.isArray(fileName) ? fileName[0] : fileName,
                        mediaType: Array.isArray(fileExtension) ? fileExtension[0] : fileExtension,
                        receivers: scenarioParams.recipients || undefined,
                        localId: fileResponse.data,
                    };
                }
                if (deal) {
                    const newDeal = {
                        dealUid,
                        status: nextStatus || '',
                        parameters: data?.dealParameters || undefined,
                    };
                    if (fileObj) {
                        // @ts-ignore
                        newDeal.files = [fileObj];
                    }
                    const responseEdit = await fetchEditDeal(newDeal, clientUrl);
                    setRequests(responseEdit);
                }
                handleCloseModal();
            })();
        },
        [clientUrl, deal, dealUid, handleCloseModal, setRequests],
    );
    const isDisabledButton = nextStatusObjArr
        ? nextStatusObjArr.some(nextStatusObj => {
              return applyStatuses.includes(nextStatusObj.statusNext);
          })
        : false;
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
                                <div className="action-block">
                                    {nextStatusObjArr.map(nextStatusObj => {
                                        const { statusNext } = nextStatusObj;
                                        const currScenarioParams =
                                            scenario.scenario[statusNext] || DEFAULT_SCENARIO;
                                        return (
                                            <>
                                                <button
                                                    disabled={isDisabledButton}
                                                    type="button"
                                                    className="btn btn-primary mr-2"
                                                    onClick={handleClickStatusButton(statusNext)}>
                                                    {isDisabledButton
                                                        ? 'Processing...'
                                                        : `Set ${statusNext} status`}
                                                </button>
                                                {showModalName === statusNext ? (
                                                    <ModalSetStatus
                                                        deal={deal}
                                                        show
                                                        size="lg"
                                                        scenarioParams={currScenarioParams}
                                                        onHide={handleCloseModal}
                                                        onSubmit={handleSubmitModal(
                                                            statusNext,
                                                            currScenarioParams,
                                                        )}
                                                    />
                                                ) : null}
                                            </>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="action-block">No Actions</div>
                            )}
                        </div>
                        <div>
                            <EventsList events={events} />
                        </div>
                        {/* REQUESTS */}
                        <div>
                            <RequestsList requests={requests} />
                        </div>
                    </div>
                ) : (
                    'Waiting information...'
                )}
            </div>
        </div>
    );
};
