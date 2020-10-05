import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Client, NETWORK_TYPES, Deal, DealFile, DealParameter, ClientFull } from './types';
import { getAuthHeaders, getNetworkType } from './utils';
import { appendRequest } from './services/requests';

export const API_URLS = {
    [NETWORK_TYPES.Quorum]: ['http://qrm1.kekker.com', 'http://qrm2.kekker.com', 'http://qrm3.kekker.com'],
    [NETWORK_TYPES.Hyperledger]: [
        'http://hlf1.kekker.com',
        'http://hlf2.kekker.com',
        'http://hlf3.kekker.com',
    ],
    [NETWORK_TYPES.Ethereum]: ['http://eth1.kekker.com', 'http://eth2.kekker.com'],
};
export const fetchClients = async (type: NETWORK_TYPES): Promise<ClientFull[]> => {
    const currNetwork = API_URLS[type];
    const response = await axios({
        url: `${currNetwork[0]}/api/clients`,
        headers: getAuthHeaders(),
    });
    return (response.data?.data.reverse() as Client[]).map((_net, index) => {
        return {
            ..._net,
            url: currNetwork[index],
        };
    });
};

export const fetchCreateDealFree = async (
    deal: object,
): Promise<{ localDealId: number; queueId: number }> => {
    const type = getNetworkType();
    const axiosParams: AxiosRequestConfig = {
        url: `${API_URLS[type][0]}/api/deals`,
        method: 'POST',
        headers: getAuthHeaders(),
        data: deal,
    };
    const response = await axios(axiosParams);
    return response.data as { localDealId: number; queueId: number };
};
export const downloadFile = async (dealUid: string, file: DealFile, clientUrl: string) => {
    const axiosParams: AxiosRequestConfig = {
        url: `${clientUrl}/api/files/${file.localId}`,
        responseType: 'blob',
        headers: getAuthHeaders(),
    };
    const response = await axios(axiosParams);
    appendRequest(axiosParams, clientUrl, response.data);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file.kind);
    link.click();
};

export const fetchDealByUid = async (dealUid: string, clientUrl?: string): Promise<AxiosResponse<Deal>> => {
    const type = getNetworkType();
    const finalUrl = clientUrl || API_URLS[type][0];
    const axiosParams: AxiosRequestConfig = {
        url: `${finalUrl}/api/deals/${dealUid}`,
        headers: getAuthHeaders(),
    };

    return axios(axiosParams);
};
interface StatusData {
    status: string;
    dealUid: string;
    parameters?: DealParameter[];
}
export const fetchEditDeal = async (data: StatusData, clientUrl: string): Promise<AxiosResponse<Deal>> => {
    const axiosParams: AxiosRequestConfig = {
        url: `${clientUrl}/api/deals/${data.dealUid}`,
        headers: getAuthHeaders(),
        method: 'POST',
        data,
    };

    return axios(axiosParams);
};
export const fetchUploadFile = async (
    dealUid: string,
    fileData: { file: File },
    clientUrl: string,
): Promise<any> => {
    const formData = new FormData();
    formData.append('formFile', fileData.file);
    const axiosParams: AxiosRequestConfig = {
        url: `${clientUrl}/api/files`,
        headers: getAuthHeaders(),
        method: 'POST',
        data: formData,
    };
    const response = await axios(axiosParams);
    return response;
};
