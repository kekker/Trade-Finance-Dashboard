import React, { useCallback, useEffect, useState, MouseEvent } from 'react';
import cn from 'classnames';
import { getRequests } from '../../services/requests';
import { RequestItem } from '../../types';
import './style.scss';
import { ArrowDown } from '../../components/ArrowDown';
import { RequestModal } from '../../components/RequestModal';

export interface IRequestsListProps {
    clientUrl: string;
}

export const RequestsList: React.FC<IRequestsListProps> = (props: IRequestsListProps) => {
    const { clientUrl } = props;
    const [requests, setRequests] = useState<RequestItem[]>([]);
    const [currentRequest, setCurrentRequest] = useState<RequestItem | null>(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRequests(getRequests(clientUrl));
        }, 2000);
        return () => clearInterval(intervalId);
    }, [clientUrl]);

    const handleShowRequestModal = useCallback(
        (request: RequestItem) => () => {
            setCurrentRequest(request);
        },
        [],
    );
    const handleCloseRequestModal = useCallback(() => {
        setCurrentRequest(null);
    }, []);
    return (
        <div>
            {currentRequest ? (
                <RequestModal request={currentRequest} onHide={handleCloseRequestModal} />
            ) : null}
            <div className="h4 mt-4">
                <b>Requests</b>
            </div>
            {requests?.length ? (
                <ul className="list-group requests-list border">
                    {requests.map(request => {
                        const time = request.time ? new Date(request.time) : new Date();
                        const renderTime = time.toTimeString().split(' ')[0];
                        return (
                            <li
                                key={renderTime}
                                role="presentation"
                                className={cn(['list-group-item request-item'])}
                                onClick={handleShowRequestModal(request)}>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <div>{request.url}</div>
                                        <div className="d-flex justify-content-between">
                                            <small>{`${renderTime} ${request.method}`}</small>
                                            <button type="button" className="btn btn-sm btn-link small">
                                                more
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                '-'
            )}
        </div>
    );
};
