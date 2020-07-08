import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { fetchCurrentDeal, findClientByKey, getNetworkType } from '../../utils';
import { Client, Deal } from '../../types';
import { fetchClients } from '../../api';
import { ClientNode } from './ClientNode';
import { Graph } from '../../components/Graph';

export const MainPage: React.FC = () => {
    const [deal, setDeal] = useState<Deal>();
    const [clients, setClients] = useState<Client[]>();
    useEffect(() => {
        (async () => {
            const newDeal = await fetchCurrentDeal();
            setDeal(newDeal);
            const networkType = getNetworkType();
            const newClients = await fetchClients(networkType);
            setClients(newClients);
        })();
    }, []);

    return (
        <div className="container-fluid">
            {deal ? (
                <div className="row">
                    {deal.parties.map((party, index) => (
                        <div className="col-lg col-xl border-right">
                            <ClientNode client={findClientByKey(clients || [], party.key)} />
                        </div>
                    ))}
                    <div className="col-lg col-xl ">
                        <Graph deal={deal} />
                    </div>
                </div>
            ) : null}
        </div>
    );
};
