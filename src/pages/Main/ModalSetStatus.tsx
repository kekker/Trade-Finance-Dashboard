import React, { useState, useCallback } from 'react';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import { Deal, DealParameter, ScenarioParamsItem } from '../../types';

export interface ModalSubmitParams {
    file?: File;
    dealParameters?: DealParameter[];
}
export interface IModalSetStatusProps extends ModalProps {
    deal: Deal;
    scenarioParams: ScenarioParamsItem;
    onSubmit: (data?: ModalSubmitParams) => void;
}
export type FileEventTarget = EventTarget & { files: FileList };

export const ModalSetStatus: React.FC<IModalSetStatusProps> = (props: IModalSetStatusProps) => {
    const { scenarioParams, onHide, onSubmit, deal, ...otherProps } = props;
    const [file, setFile] = useState();
    const [dealParameters, setDealParameters] = useState<DealParameter[]>([...(deal.parameters || [])]);
    const { description, title, needUploadFile, changeFields } = scenarioParams;
    const handleSubmit = useCallback(() => {
        if (changeFields) {
            onSubmit({
                file,
                dealParameters,
            });
        } else {
            onSubmit({
                file,
            });
        }
    }, [changeFields, dealParameters, file, onSubmit]);

    const handleUploadFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }, []);
    const handleChangeForm = useCallback(
        (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e?.target?.value || '';
            setDealParameters(existDealParameters => {
                const result = [...existDealParameters];
                const findItem = result.find(item => item.key === key);
                if (findItem) {
                    findItem.value = value;
                }
                return result;
            });
        },
        [],
    );

    return (
        <Modal {...otherProps} centered onHide={onHide}>
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">{description}</div>
                {changeFields ? (
                    <div>
                        {dealParameters.map(dealParameter => {
                            return (
                                <div className="form-group">
                                    <label htmlFor={dealParameter.key}>{dealParameter.key}</label>
                                    <input
                                        id={dealParameter.key}
                                        type="text"
                                        className="form-control"
                                        onChange={handleChangeForm(dealParameter.key)}
                                        value={dealParameter.value}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : null}
                {needUploadFile ? (
                    <div className="form-group">
                        <label>File</label>
                        <input type="file" className="form-control" onChange={handleUploadFile} />
                    </div>
                ) : null}
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-outline--primary" onClick={onHide}>
                    Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    Apply Changes
                </button>
            </Modal.Footer>
        </Modal>
    );
};
