import { SCENARIOS } from './scenarios';
import { NETWORK_TYPES, Client } from './types';
import { fetchDealByUid } from './api';

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

export const setDealUid = (dealUid: string) => {
    localStorage.setItem('dealUid', dealUid);
};

export const setAuthData = (token: string, channel: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('channel', channel);
};
export const getAuthData = () => {
    const token = localStorage.getItem('token') || '';
    const channel = localStorage.getItem('channel') || '';
    return { token, channel };
};

export const getAuthHeaders = () => {
    const { token, channel } = getAuthData();
    return {
        Authorization: token || '',
        Channel: channel || '',
    };
};

export const fetchCurrentDeal = async (url?: string) => {
    const dealUid = getDealUid();
    const deal = await fetchDealByUid(dealUid, url);
    return deal;
};

export const findClientByKey = (clients: Client[], key: string): Client => {
    return clients.find(client => client.key === key) as Client;
};
