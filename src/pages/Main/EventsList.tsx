import React, { useMemo, useCallback, useState } from 'react';
import cn from 'classnames';
import { Event, RequestItem } from '../../types';
import { EventModal } from '../../components/EventModal';

export interface EventsListProps {
    events: Event[];
}

export const EventsList: React.FC<EventsListProps> = (props: EventsListProps) => {
    const { events } = props;
    const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
    const onClick = useCallback(
        (event: Event) => () => {
            setCurrentEvent(event);
        },
        [],
    );
    const onHideModal = useCallback(() => {
        setCurrentEvent(null);
    }, []);
    return (
        <div>
            {currentEvent ? <EventModal show onHide={onHideModal} event={currentEvent} /> : null}
            <div className="h4 mt-4">
                <b>{`Events ${events?.length ? `(${events?.length})` : ''}`}</b>
            </div>
            <ul className="list-group custom-list border">
                {events.map(event => {
                    const time = new Date(event.timestamp).toTimeString().split(' ')[0];
                    return (
                        <li
                            key={time}
                            role="presentation"
                            className={cn(['list-group-item request-item'])}
                            onClick={onClick(event)}>
                            <div>{event.eventUid}</div>
                            <div className="d-flex justify-content-between">
                                <small>{`${time}`}</small>
                                <button type="button" className="btn btn-sm btn-link small">
                                    more
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
