import axios from 'axios';
import { SCENARIOS } from './scenarios';
import { NETWORK_TYPES, ClientFull } from './types';
import { API_URLS, fetchDealByUid } from './api';

export const getCurrentScenario = () => {
    const scenarioId = localStorage.getItem('scenarioId');
    return SCENARIOS.find(scenario => scenario.id === scenarioId) || SCENARIOS[0];
};

export const setScenarioId = (scenarioId: string) => {
    localStorage.setItem('scenarioId', scenarioId);
};
export const getNetworkType = () => {
    return localStorage.getItem('type') as NETWORK_TYPES;
};

export const setNetworkType = (type: NETWORK_TYPES) => {
    localStorage.setItem('type', type);
};

export const getDealUid = () => {
    return localStorage.getItem('dealUid') as string;
};

export const setDealUid = (localDealId: number) => {
    localStorage.setItem('dealUid', String(localDealId));
};

export const waitCreateDeal = async (queueId: number) => {
    const type = getNetworkType();
    try {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-await-in-loop
            const response = await axios({
                url: `${API_URLS[type][0]}/api/queue/${queueId}`,
                headers: getAuthHeaders(),
            });
            // eslint-disable-next-line no-await-in-loop
            await new Promise(resolve => {
                setTimeout(resolve, 3000);
            });
            if (response.data.status === 'Success') {
                setDealUid(response.data.dealId);
                return;
            }
        }
    } catch (err) {
        console.error(err);
    }
};

export const getAuthHeaders = () => {
    return {
        Authorization: 'Basic S2Vra2VyVXNlcjp6RGZqbTMz',
        Channel: 'isychev199@gmail.com',
        'x-api-version': '2.0',
    };
};

export const fetchCurrentDeal = async (url?: string) => {
    const dealUid = getDealUid();
    return fetchDealByUid(dealUid, url);
};

export const findClientByKey = (clients: ClientFull[], key: string): ClientFull => {
    return clients.find(client => client.key === key) as ClientFull;
};
