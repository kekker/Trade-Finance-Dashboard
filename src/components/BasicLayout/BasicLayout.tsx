import React, { useCallback } from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes';

export interface BasicLayoutProps {
    children: React.ReactNode;
}
export const BasicLayout: React.FC<BasicLayoutProps> = (props: BasicLayoutProps) => {
    const { children } = props;
    const history = useHistory();
    const handleClickExit = useCallback(() => {
        localStorage.clear();
        history.push(ROUTES.TOKEN);
    }, [history]);
    return (
        <div className="basic-layout h-100">
            <div className=" basic-layout-nav">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                            <img
                                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNjMuMiAyNi4xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNjMuMiAyNi4xOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cgkuc3Qxe2ZpbGw6I0ZGREUwMDt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00My45LDYuN2gtMTF2My4ySDQzVjE2SDMyLjl2My41SDQ0VjI2SDI1LjNWMC4yaDE4LjZDNDMuOSwwLjIsNDMuOSw2LjcsNDMuOSw2Ljd6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00Ny4xLDI1LjlWMC4yaDcuOHYxMWw2LjYtMTFoOC43bC03LjUsMTIuNEw3MC44LDI2aC05bC03LTEydjEyTDQ3LjEsMjUuOUw0Ny4xLDI1Ljl6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03MS45LDI1LjlWMC4yaDcuOHYxMWw2LjYtMTFoOC44bC03LjUsMTIuNEw5NS43LDI2aC05bC03LTEydjEyTDcxLjksMjUuOUw3MS45LDI1Ljl6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMTUuMyw2LjdoLTExdjMuMmgxMC4xVjE2aC0xMC4xdjMuNWgxMS4xVjI2SDk2LjdWMC4yaDE4LjZWNi43eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTMxLjksMjUuOWwtNC44LTguNmgtMC44djguNmgtNy44VjAuMkgxMjljMy4yLDAsNS43LDAuNyw3LjYsMi4xYzEuOSwxLjQsMi45LDMuNSwyLjksNi4zCgljMCwzLjYtMS42LDYuMS00LjgsNy40bDUuNyw5LjlDMTQwLjQsMjUuOSwxMzEuOSwyNS45LDEzMS45LDI1Ljl6IE0xMjYuMywxMS4zaDIuNGMyLjEsMCwzLjEtMSwzLjEtMi40YzAtMS42LTEtMi40LTMuMS0yLjRoLTIuNQoJdjQuOEgxMjYuM3oiLz4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTE1NC43LDI2aC04LjhsNy41LTEyLjRsLTguMS0xMy40aDlsNy45LDEzLjJMMTU0LjcsMjZ6Ii8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03LjksMTEuMmw2LjYtMTFoOC44bC03LjUsMTIuNEwyMy45LDI2aC05TDcsMTIuOEw3LjksMTEuMnoiLz4KPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI4LjMsMTEuMSA4LjIsMTEuMSA4LjIsMC4yIDAuNSwwLjIgMC41LDI1LjkgOC4yLDI1LjkgOC4yLDEzLjkgOC4zLDE0ICIvPgo8L3N2Zz4K"
                                alt="Kekker logo"
                                className="logo"
                            />
                            <h3 className="ml-3 text-white font-weight-bold">DEMO</h3>
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm align-self-center"
                            onClick={handleClickExit}
                            style={{ marginTop: '-7px' }}>
                            Exit and try again
                        </button>
                    </div>
                </div>
            </div>
            <div className="basic-layout-content">{children}</div>
        </div>
    );
};
