import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { setAuthData } from '../../utils';

export const TokenPage: React.FC = () => {
    const history = useHistory();
    const [wasSubmit, setWasSubmit] = useState(false);

    // TODO REMOVE
    const [token, setToken] = useState('Basic S2Vra2VyVXNlcjp6RGZqbTMz');

    // TODO APPEND BASIC
    const [channel, setChannel] = useState('isychev199@gmail.com');
    const [isValidToken, setIsValidToken] = useState(true);
    const [isValidChannel, setIsValidChannel] = useState(true);
    const handleChangeToken = useCallback(e => {
        setToken(e.target.value);
    }, []);
    const handleChangeChannel = useCallback(e => {
        setChannel(e.target.value);
    }, []);

    const handleSubmit = useCallback(() => {
        setWasSubmit(true);
        if (!token) {
            setIsValidToken(false);
        }
        if (!channel) {
            setIsValidChannel(false);
        }
        if (token && channel) {
            setAuthData(token, channel);
            history.push(ROUTES.SCENARIO);
        }
    }, [channel, history, token]);
    return (
        <div className="row d-flex h-100 justify-content-center align-items-center">
            <div className="card col-lg-4 col-md-8 col-sm-10">
                <div className="card-body">
                    <h5 className="card-title   ">
                        <h3>
                            <b>Step 1.</b>
                            Token
                        </h3>
                    </h5>
                    <form>
                        <div className="form-group row">
                            <div className="col-2 col-form-label">Token</div>
                            <div className="col-sm-10">
                                <input
                                    value={token}
                                    type="text"
                                    className={cn([
                                        'form-control',
                                        wasSubmit && !isValidToken && 'is-invalid',
                                    ])}
                                    onChange={handleChangeToken}
                                />
                                {wasSubmit && !isValidToken ? (
                                    <div className="invalid-feedback">Required field</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-2 col-form-label text-nowrap">Channel</div>
                            <div className="col-sm-10">
                                <input
                                    value={channel}
                                    type="text"
                                    className={cn([
                                        'form-control',
                                        wasSubmit && !isValidChannel && 'is-invalid',
                                    ])}
                                    id="channel"
                                    onChange={handleChangeChannel}
                                />
                                {wasSubmit && !isValidChannel ? (
                                    <div className="invalid-feedback">Required field</div>
                                ) : null}
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                            Next step
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
