import React, { useState, useEffect } from 'react';
import { fetchCurrentDeal, findClientByKey, getNetworkType } from '../../utils';
import { ClientFull, Deal } from '../../types';
import { fetchClients } from '../../api';
import { ClientNode } from './ClientNode';
import { Graph } from '../../components/Graph';

export const MainPage: React.FC = () => {
    const [deal, setDeal] = useState<Deal>();
    const [clients, setClients] = useState<ClientFull[]>([]);
    useEffect(() => {
        (async () => {
            const { data: newDeal } = await fetchCurrentDeal();
            setDeal(newDeal);
            const networkType = getNetworkType();
            const newClients = await fetchClients(networkType);
            setClients(newClients);
        })();
    }, []);
    const url = clients[0]?.url;
    return (
        <div className="container-fluid">
            {deal ? (
                <div className="row">
                    {deal.parties.map(party => (
                        <div key={party.key} className="col-lg col-xl border-right">
                            <ClientNode client={findClientByKey(clients || [], party.key)} />
                        </div>
                    ))}
                    <div className="col-lg col-xl ">
                        <Graph url={url} />
                    </div>
                </div>
            ) : null}
        </div>
    );
};
