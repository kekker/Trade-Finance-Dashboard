import { AxiosRequestConfig, Method } from 'axios';
import { RequestItem } from '../types';

export const REQUESTS: { [key: string]: RequestItem[] } = {};

export const appendRequest = (params: AxiosRequestConfig, url?: string, response?: any) => {
    if (!url) {
        return REQUESTS;
    }
    const currRequests = REQUESTS[url] || [];
    const paramsWithTime = {
        ...params,
        method: params.method || ('GET' as Method),
        time: Date.now(),
        response,
    };
    if (currRequests.length) {
        const lastRequest = currRequests[currRequests.length - 1];
        if (lastRequest.url !== paramsWithTime.url) {
            REQUESTS[url] = [...REQUESTS[url], paramsWithTime];
        } else {
            lastRequest.time = Date.now();
        }
    } else {
        REQUESTS[url] = [paramsWithTime];
    }

    return REQUESTS[url];
};

export const getRequests = (clientUrl: string): RequestItem[] => {
    return REQUESTS[clientUrl] || [];
};
