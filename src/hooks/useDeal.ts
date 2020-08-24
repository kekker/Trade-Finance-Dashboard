import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { fetchCurrentDeal, getAuthHeaders, getDealUid } from '../utils';
import { Deal, RequestItem, Event } from '../types';

export const useDeal = (url: string) => {
    const dealUid = getDealUid();
    const [requests, setStateRequests] = useState<RequestItem[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [deal, setDeal] = useState<Deal>();

    const setRequests = useCallback((obj: any) => {
        setStateRequests(existResponse => [
            ...existResponse,
            {
                time: Date.now(),
                response: obj,
            },
        ]);
    }, []);

    useEffect(() => {
        const intervalFunction = () => {
            axios({
                url: `${url}/api/events`,
                headers: getAuthHeaders(),
            }).then(response => {
                setRequests(response);
                const newEvents = (response.data?.data || []) as Event[];
                const filterEvents = newEvents.filter(event => event.dealId === dealUid);
                const sortEvents = filterEvents.sort((a, b) => {
                    const aDate = new Date(a.timestamp);
                    const bDate = new Date(b.timestamp);
                    return Number(aDate) - Number(bDate);
                });
                setEvents(existEvents => {
                    if (existEvents.length !== sortEvents.length) {
                        return sortEvents;
                    }
                    return existEvents;
                });
            });
        };
        if (url) {
            intervalFunction();
            const intervalId = window.setInterval(intervalFunction, 15000);
            return () => clearInterval(intervalId);
        }
        return () => null;
    }, [dealUid, setRequests, url]);
    useEffect(() => {
        if (url) {
            fetchCurrentDeal(url).then(response => {
                setDeal(response.data);
                setRequests(response);
            });
        }
    }, [events, setRequests, url]);

    if (!url) {
        return { requests, events, deal, setRequests };
    }

    return { requests, events, deal: deal as Deal, setRequests };
};
