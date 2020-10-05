import React, { useMemo, useEffect, useState } from 'react';
// @ts-ignore
import GraphVis from 'react-graph-vis';
import { DealHistory } from '../../types';
import { NEW_STATUS, START_STATUS } from '../../scenarios';
import { useDeal } from '../../hooks/useDeal';

export interface IGraphProps {
    url: string;
}

const options = {
    nodes: { borderWidth: 1 },
    edges: {
        smooth: {
            type: 'cubicBezier',
            forceDirection: 'vertical',
            roundness: 0.4,
        },
    },
    interaction: {},
    manipulation: {},
    physics: {
        enabled: false,
    },
    layout: {
        hierarchical: {
            enabled: true,
            levelSeparation: 100,
        },
    },
    height: '900px',
};

const COMPLETE_STYLE = { background: '#ffde00', border: '#000', color: '#fff' };
const UNCOMPLETE_STYLE = { background: '#eee', border: '#000', color: '#fff' };
const isCompleteStatus = (history: DealHistory[], status: string) => {
    return status === START_STATUS || status === NEW_STATUS || history.some(el => el.status === status);
};
export const Graph: React.FC<IGraphProps> = (props: IGraphProps) => {
    const { url } = props;

    // const [deal, setDeal] = useState<Deal>();
    const [showGraph, setShowGraph] = useState(false);
    const { deal } = useDeal(url);
    useEffect(() => {
        // const intervalID = setInterval(async () => {
        //     const { data: newDeal } = await fetchCurrentDeal();
        //     if (newDeal.status !== deal?.status) {
        //         setDeal({ ...newDeal });
        //     }
        // }, 5000);
        // return () => clearInterval(intervalID);
    }, [deal]);
    const { transitions = [], history = [] } = deal || {};
    const graphConfig2 = useMemo(() => {
        if (transitions.length) {
            // return { nodes: [], edges: [] };
            const uniqStatuses = Array.from(
                new Set([...transitions.map(el => el.status), ...transitions.map(el => el.statusNext)]),
            );
            const nodes = uniqStatuses.map(status => {
                return {
                    id: status,
                    label: status,
                    color: isCompleteStatus(history, status) ? COMPLETE_STYLE : UNCOMPLETE_STYLE,
                };
            }, []);
            const edges = transitions.map(el => {
                return { from: el.status, to: el.statusNext };
            }, []);
            setShowGraph(false);
            setTimeout(() => {
                setShowGraph(true);
            }, 100);
            return { nodes, edges };
        }

        return { nodes: [], edges: [] };
    }, [history, transitions]);

    return (
        <div className="h-100">{showGraph ? <GraphVis graph={graphConfig2} options={options} /> : null}</div>
    );
};
