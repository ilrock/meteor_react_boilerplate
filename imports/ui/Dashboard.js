import React from 'react';
import PrivateHeader from './PrivateHeader';
export default () => {
    return (
        <div>
            <PrivateHeader title="Header"/>
            <div className="container">
                <h1> Dashboard </h1>
            </div>
        </div>
    );
}
