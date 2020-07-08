import React, { useMemo, useCallback } from 'react';

export interface IArrowDownProps {}

export const ArrowDown: React.FC<IArrowDownProps> = (props: IArrowDownProps) => {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-chevron-down"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
        </svg>
    );
};
