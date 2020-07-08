import { Roles, Scenario } from './types';

export const START_STATUS = '$Initiated';
export const NEW_STATUS = 'NEW';
export const SCENARIOS: Scenario[] = [
    {
        id: 'scenario1',
        name: 'Scenario 1',
        controlled: true,
        description:
            'The scenario demonstrates the implementation of a possible business process for a trade documentary credit.\n' +
            'Participants: Seller, Buyer, Bank',
        canChangePartyClients: true,
        canChangePartyRole: false,
        canDeleteParty: false,
        canAppendParty: false,
        canChangeStatusMap: false,
        canDeleteStatusMap: false,
        scenario: {
            OfferReq: {
                title: 'Change the status to OfferReq',
                description:
                    'Switch the transaction status to OfferReq with the file attachment (the commercial offer)',
                changeFields: [],
                // fileKindName: 'fileKind.dat',
                needUploadFile: true,
            },
            OfferOk: {
                title: 'Change the status to OfferOk',
                description: 'Switch the transaction status to OfferOk (acceptance of the commercial offer)',
            },
            LcReq: {
                title: 'Change the status to LcReq',
                description:
                    'Switch the transaction status in LcReq with the file attachment (application for a letter of credit to the Bank)',
                needUploadFile: true,
                // fileKindName: 'fileKind.dat',
            },
            LcFail: {
                title: 'Change the status to LcFail',
                description: 'OfferReq',
                needUploadFile: true,
                // fileKindName: 'fileKind.dat',
            },
            LcOk: {
                title: 'Change the status to LcOk',
                description: 'OfferReq',
                needUploadFile: true,
                // fileKindName: 'fileKind.dat',
            },
            CargoSent: {
                title: 'Change the status to CargoSent',
                description: 'OfferReq',
                needUploadFile: true,
                // fileKindName: 'fileKind.dat',
            },
            Payment: {
                title: 'Change the status to Payment',
                description: 'Payment',
                needUploadFile: true,
                // fileKindName: 'fileKind.dat',
            },
            Closed: {
                title: 'Change the status to Closed',
                description: 'Closed',
            },
        },
        deal: {
            kind: 'FirstDeal',
            status: NEW_STATUS,
            parties: [
                {
                    key: '',
                    role: Roles.Seller,
                },
                {
                    key: '',
                    role: Roles.Buyer,
                },
                {
                    key: '',
                    role: Roles.Bank,
                },
            ],
            parameters: [
                {
                    key: 'DocNumber',
                    value: '123',
                },
                {
                    key: 'Item',
                    value: 'Pepper',
                },
                {
                    key: 'DeliveryDate',
                    value: '2020-08-08',
                },
                {
                    key: 'Quantity',
                    value: '10',
                },
            ],
            transitions: [
                {
                    status: NEW_STATUS,
                    statusNext: 'OfferReq',
                    role: Roles.Seller,
                },
                {
                    status: 'OfferReq',
                    statusNext: 'OfferOk',
                    role: Roles.Buyer,
                },
                {
                    status: 'OfferOk',
                    statusNext: 'LcReq',
                    role: Roles.Buyer,
                },
                {
                    status: 'LcFail',
                    statusNext: 'LcReq',
                    role: Roles.Buyer,
                },
                {
                    status: 'LcReq',
                    statusNext: 'LcFail',
                    role: Roles.Bank,
                },
                {
                    status: 'LcReq',
                    statusNext: 'LcOk',
                    role: Roles.Bank,
                },
                {
                    status: 'LcOk',
                    statusNext: 'CargoSent',
                    role: Roles.Seller,
                },
                {
                    status: 'CargoSent',
                    statusNext: 'CargoGot',
                    role: Roles.Buyer,
                },
                {
                    status: 'CargoGot',
                    statusNext: 'Payment',
                    role: Roles.Bank,
                },
                {
                    status: 'Payment',
                    statusNext: 'Closed',
                    role: Roles.Seller,
                },
            ],
        },
    },
];
