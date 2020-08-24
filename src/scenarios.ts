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
                changeFields: true,
                // fileKindName: 'fileKind.dat',
                needUploadFile: true,
            },
            OfferOk: {
                changeFields: true,
                title: 'Change the status to OfferOk',
                description: 'Switch the transaction status to OfferOk (acceptance of the commercial offer)',
            },
            LcReq: {
                title: 'Change the status to LcReq',
                changeFields: true,
                description:
                    'Switch the transaction status in LcReq with the file attachment (application for a letter of credit to the Bank)',
                needUploadFile: true,
                // fileKindName: 'fileKind.dat',
            },
            LcFail: {
                title: 'Change the status to LcFail',
                changeFields: true,
                description:
                    'Switch the transaction status in LcFail with the file attachment (the letter of credit application needs to be corrected)',
                needUploadFile: true,
                // fileKindName: 'fileKind.dat',
            },
            LcOk: {
                title: 'Change the status to LcOk',
                changeFields: true,
                description:
                    'Switch the transaction status in LcOk with the file attachment (the Bank issues a letter of credit)',
                needUploadFile: true,
                // fileKindName: 'fileKind.dat',
            },
            CargoSent: {
                title: 'Change the status to CargoSent',
                changeFields: true,
                description:
                    'Switch the transaction status in CargoSent  with the file attachment (the supplier sent the shipment)',
                needUploadFile: true,
                // fileKindName: 'fileKind.dat',
            },
            CargoGot: {
                title: 'Change the status to CargoGot',
                changeFields: true,
                description: 'Switch the transaction status in CargoGot (the recipient accepted the cargo)',
                needUploadFile: true,
                // fileKindName: 'fileKind.dat',
            },
            Payment: {
                title: 'Change the status to Payment',
                changeFields: true,
                description:
                    'Switch the transaction status in Payment  with the file attachment (the supplier sent the shipment)',
                needUploadFile: true,
                // fileKindName: 'fileKind.dat',
            },
            Closed: {
                title: 'Change the status to Closed',
                changeFields: true,
                description:
                    'Switch the transaction status in Payment  with the file attachment (the payment has been received, the transaction is closed)',
            },
        },
        deal: {
            kind: 'FirstDeal',
            // parent: null,
            // appRef: null,
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
                    roles: [Roles.Seller],
                },
                {
                    status: 'OfferReq',
                    statusNext: 'OfferOk',
                    roles: [Roles.Buyer],
                },
                {
                    status: 'OfferOk',
                    statusNext: 'LcReq',
                    roles: [Roles.Buyer],
                },
                {
                    status: 'LcFail',
                    statusNext: 'LcReq',
                    roles: [Roles.Buyer],
                },
                {
                    status: 'LcReq',
                    statusNext: 'LcFail',
                    roles: [Roles.Bank],
                },
                {
                    status: 'LcReq',
                    statusNext: 'LcOk',
                    roles: [Roles.Bank],
                },
                {
                    status: 'LcOk',
                    statusNext: 'CargoSent',
                    roles: [Roles.Seller],
                },
                {
                    status: 'CargoSent',
                    statusNext: 'CargoGot',
                    roles: [Roles.Buyer],
                },
                {
                    status: 'CargoGot',
                    statusNext: 'Payment',
                    roles: [Roles.Bank],
                },
                {
                    status: 'Payment',
                    statusNext: 'Closed',
                    roles: [Roles.Seller],
                },
            ],
        },
    },
];
