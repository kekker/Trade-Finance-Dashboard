import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { RequestItem } from '../../types';
import './style.scss';
import { RequestModal } from '../../components/RequestModal';

export interface IRequestsListProps {
    requests: RequestItem[];
}

export const RequestsList: React.FC<IRequestsListProps> = (props: IRequestsListProps) => {
    const { requests } = props;
    const [currentRequest, setCurrentRequest] = useState<RequestItem | null>(null);

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
                <b>{`Requests ${requests?.length ? `(${requests?.length})` : ''}`}</b>
            </div>
            {requests?.length ? (
                <ul className="list-group custom-list border">
                    {requests.map(request => {
                        const time = request.time ? new Date(request.time) : new Date();
                        const renderTime = time.toTimeString().split(' ')[0];
                        return (
                            <li
                                key={request.time}
                                role="presentation"
                                className={cn(['list-group-item request-item'])}
                                onClick={handleShowRequestModal(request)}>
                                <div style={{ wordBreak: 'break-all' }}>{request.response?.config?.url}</div>
                                <div className="d-flex justify-content-between">
                                    <small>{`${renderTime} ${request.response?.config?.method}`}</small>
                                    <button type="button" className="btn btn-sm btn-link small">
                                        more
                                    </button>
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
