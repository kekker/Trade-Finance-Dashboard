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
    clusterId: string;
    info: string;
    key: string;
    publicCertificate: string;
}
export interface ClientFull extends Client {
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
    roles: string[];
}
export type StatusMap = DealTransition;
export interface DealFile {
    appRef: string;
    kind: string;
    localId: string;
    localPath: string;
    mediaType: string;
    receivers: string[];
    status: string;
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
    appRef: string | null;
    parent: string | null;
    dealId: string;
    files: DealFile[];
    history: DealHistory[];
    kind: string;
    parameters: DealParameter[];
    parties: DealParty[];
    remark: string;
    status: string;
    // statusMap: StatusMap[];
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
    changeFields?: boolean;
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

export interface Event {
    category: string;
    dealId: string;
    event: string;
    eventUid: string;
    objectId: string;
    timestamp: string;
}
