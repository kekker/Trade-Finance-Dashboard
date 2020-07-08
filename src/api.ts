import axios, { AxiosRequestConfig } from 'axios';
import { Client, NETWORK_TYPES, Deal, DealFile } from './types';
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
export const fetchClients = async (type: NETWORK_TYPES): Promise<Client[]> => {
    const currNetwork = API_URLS[type];
    const response = await axios({
        url: `${currNetwork[0]}/api/clients`,
        headers: getAuthHeaders(),
    });
    return (response.data as Client[]).map((_net, index) => {
        return {
            ..._net,
            url: currNetwork[index],
        };
    });
};

export const fetchCreateDealFree = async (deal: object): Promise<string> => {
    const type = getNetworkType();
    const axiosParams: AxiosRequestConfig = {
        url: `${API_URLS[type][0]}/api/dealsfree`,
        method: 'POST',
        headers: getAuthHeaders(),
        data: deal,
    };
    const response = await axios(axiosParams);
    return response.data;
};
export const downloadFile = async (dealUid: string, file: DealFile, clientUrl: string) => {
    const axiosParams: AxiosRequestConfig = {
        url: `${clientUrl}/api/deals/${dealUid}/files/${file.fileUid}`,
        responseType: 'blob',
        headers: getAuthHeaders(),
    };
    const response = await axios(axiosParams);
    appendRequest(axiosParams, clientUrl, response.data);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file.fileKind);
    link.click();
};

export const fetchDealByUid = async (dealUid: string, clientUrl?: string): Promise<Deal> => {
    const type = getNetworkType();
    const finalUrl = clientUrl || API_URLS[type][0];
    const axiosParams: AxiosRequestConfig = {
        url: `${finalUrl}/api/deals/${dealUid}`,
        headers: getAuthHeaders(),
    };

    const response = await axios(axiosParams);
    appendRequest(axiosParams, clientUrl, response.data);
    return response.data;
};
interface StatusData {
    status: string;
    dealUid: string;
    [key: string]: string;
}
export const fetchSetSetStatus = async (data: StatusData, clientUrl: string): Promise<Deal> => {
    const axiosParams: AxiosRequestConfig = {
        url: `${clientUrl}/api/deals/setstatus`,
        headers: getAuthHeaders(),
        method: 'POST',
        data,
    };

    const response = await axios(axiosParams);
    appendRequest(axiosParams, clientUrl, response.data);
    return response.data;
};
export const fetchUploadFile = async (
    dealUid: string,
    fileData: { file: File; recipients?: string[]; fileKind: string },
    clientUrl: string,
): Promise<Deal> => {
    const formData = new FormData();
    formData.append('DealUid', dealUid);
    formData.append('formFile', fileData.file);
    if (fileData.recipients) {
        // TODO TYPO API
        formData.append('Recievers', JSON.stringify(fileData.recipients));
    }
    formData.append('FileKind', fileData.fileKind);
    const axiosParams: AxiosRequestConfig = {
        url: `${clientUrl}/api/deals/files`,
        headers: getAuthHeaders(),
        method: 'POST',
        data: formData,
    };

    const response = await axios(axiosParams);
    appendRequest(axiosParams, clientUrl, response.data);

    return response.data;
};
