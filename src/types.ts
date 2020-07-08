import { AxiosRequestConfig } from 'axios';

export enum NETWORK_TYPES {
    Quorum = 'Quorum',
    Hyperledger = 'Hyperledger',
    Ethereum = 'Ethereum',
}
export const NETWORK_TYPES_LIST = [
    {
        id: NETWORK_TYPES.Quorum,
        value: NETWORK_TYPES.Quorum,
    },
    {
        id: NETWORK_TYPES.Hyperledger,
        value: NETWORK_TYPES.Hyperledger,
    },
    {
        id: NETWORK_TYPES.Ethereum,
        value: NETWORK_TYPES.Ethereum,
    },
];

export interface Client {
    key: string;
    data: string;
    url: string;
}

export interface DealParty {
    key: string;
    role: string;
}
export interface DealParameter {
    key: string;
    value: string;
}
export interface DealTransition {
    status: string;
    statusNext: string;
    role: Roles;
}
export type StatusMap = DealTransition;
export interface DealFile {
    fileKind: string;
    filePath: string;
    fileUid: string;
    state: string;
    version: number;
}
export interface DealHistory {
    party: {
        key: string;
        role: string;
    };
    key: string;
    role: string;
    remark: string;
    status: string;
    version: number;
}
export interface Deal {
    uid: string;
    files: DealFile[];
    history: DealHistory[];
    kind: string;
    parameters: DealParameter[];
    parties: DealParty[];
    remark: string;
    status: string;
    statusMap: StatusMap[];
    transitions?: StatusMap[];
}

export interface Scenario {
    id: string;
    name: string;
    description: string;
    controlled: boolean;
    canChangePartyClients: boolean;
    canChangePartyRole: boolean;
    canDeleteParty: boolean;
    canAppendParty: boolean;
    canChangeStatusMap: boolean;
    canDeleteStatusMap: boolean;
    scenario: ScenarioParams;
    deal: Partial<Deal>;
}
export interface ScenarioParamsItem {
    changeFields?: string[];
    title: string;
    description: string;
    needUploadFile?: boolean;
    recipients?: string[];
    fileKindName?: string;
    fileKindExtension?: string;
}
export interface ScenarioParams {
    [key: string]: ScenarioParamsItem;
}

export enum Roles {
    Seller = 'Seller',
    Buyer = 'Buyer',
    Bank = 'Bank',
}
export const ROLES_ARR = [Roles.Seller, Roles.Buyer, Roles.Bank];

export const DEFAULT_PARTY: DealParty = {
    key: '',
    role: '',
};
export const DEFAULT_PARAMETER: DealParameter = {
    key: '',
    value: '',
};

export const DEFAULT_SCENARIO: ScenarioParamsItem = {
    title: '',
    description: '',
};

export interface RequestItem extends AxiosRequestConfig {
    time?: number;
    response?: any;
}
