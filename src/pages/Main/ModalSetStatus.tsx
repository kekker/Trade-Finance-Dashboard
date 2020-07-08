import React, { useState, useCallback } from 'react';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import { ScenarioParamsItem } from '../../types';

export interface ModalSubmitParams {
    file?: File;
}
export interface IModalSetStatusProps extends ModalProps {
    scenarioParams: ScenarioParamsItem;
    onSubmit: (data?: ModalSubmitParams) => void;
}
export type FileEventTarget = EventTarget & { files: FileList };

export const ModalSetStatus: React.FC<IModalSetStatusProps> = (props: IModalSetStatusProps) => {
    const [file, setFile] = useState();
    const { scenarioParams, onHide, onSubmit, ...otherProps } = props;
    const { description, title, needUploadFile } = scenarioParams;
    const handleSubmit = useCallback(() => {
        onSubmit({
            file,
        });
    }, [file, onSubmit]);

    const handleUploadFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }, []);

    return (
        <Modal {...otherProps} centered onHide={onHide}>
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">{description}</div>
                {needUploadFile ? (
                    <div>
                        <input type="file" onChange={handleUploadFile} />
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
