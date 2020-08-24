import React from 'react';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import { Event } from '../../types';

export interface EventModalProps extends ModalProps {
    event: Event;
}

export const EventModal: React.FC<EventModalProps> = (props: EventModalProps) => {
    const { event, onHide, ...otherProps } = props;
    const { category, dealId, event: eventId, eventUid, timestamp, objectId } = event;
    return (
        <Modal {...otherProps} onHide={onHide} show size="lg">
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title>Event information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div>
                        <b>Event info</b>
                    </div>
                    <div>
                        <b>category:</b> <span>{category}</span>
                    </div>
                    <div>
                        <b>Deal Uid:</b> <span>{dealId}</span>
                    </div>
                    <div>
                        <b>Event name:</b> <span>{eventId}</span>
                    </div>
                    <div>
                        <b>Event uid:</b> <span>{eventUid}</span>
                    </div>
                    <div>
                        <b>Object id:</b> <span>{objectId}</span>
                    </div>
                    <div>
                        <b>Timestamp:</b> <span>{timestamp}</span>
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
