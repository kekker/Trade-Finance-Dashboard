import React, { useCallback } from 'react';
import { Deal, DealFile } from '../../types';
import { downloadFile } from '../../api';
import './style.scss';

export interface IDealProps {
    deal: Deal;
    clientUrl: string;
}

export const DealInfo: React.FC<IDealProps> = (props: IDealProps) => {
    const { deal, clientUrl } = props;
    const handleDownloadFile = useCallback(
        (file: DealFile) => () => {
            downloadFile(deal.dealId, file, clientUrl);
        },
        [clientUrl, deal.dealId],
    );
    return (
        <div>
            <div>
                <h4>
                    <b>Deal</b>
                </h4>
            </div>
            <div className="row">
                <div className="col titleWidth">
                    <b>UID:</b>{' '}
                </div>
                <div className="col" style={{ wordBreak: 'break-all' }}>
                    {deal.dealId}
                </div>
            </div>
            <div className="row">
                <div className="col titleWidth">
                    <b>STATUS:</b>{' '}
                </div>
                <div className="col">{deal.status}</div>
            </div>

            <div className="h4 mt-4">
                <b>Parameters</b>
            </div>
            {deal.parameters.map(param => {
                return (
                    <div className="row" key={param.key}>
                        <div className="col-3 titleWidth">
                            <b>{`${param.key}: `}</b>
                        </div>
                        <div className="col">{param.value}</div>
                    </div>
                );
            })}
            {deal.files ? (
                <div className="mt-4">
                    <div className="h4">
                        <b>Files</b>
                    </div>
                    {deal.files.length ? (
                        deal.files.map(file => (
                            <div>
                                File
                                <button
                                    type="button"
                                    className="btn btn-link"
                                    onClick={handleDownloadFile(file)}>
                                    {file.kind}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div> No files</div>
                    )}
                </div>
            ) : null}
        </div>
    );
};
