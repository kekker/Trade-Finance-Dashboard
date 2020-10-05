import React from 'react';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import { RequestItem } from '../../types';

export interface RequestModalProps extends ModalProps {
    request: RequestItem;
}

export const RequestModal: React.FC<RequestModalProps> = (props: RequestModalProps) => {
    const { request, onHide, ...otherProps } = props;
    return (
        <Modal {...otherProps} onHide={onHide} show size="lg">
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title>Request information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div>
                        <div>
                            <b>Request</b>
                        </div>
                        <div>{`${request?.response?.config?.method} ${request?.response?.config?.url}`}</div>
                        {request.data ? (
                            <pre className="custom-item-content">{JSON.stringify(request.data, null, 2)}</pre>
                        ) : null}
                    </div>

                    <div>
                        <div>
                            <b>Response</b>
                        </div>
                        <pre className="custom-item-content ml-5">
                            {JSON.stringify(request.response, null, 2) || 'Empty'}
                        </pre>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-primary" onClick={onHide}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};
