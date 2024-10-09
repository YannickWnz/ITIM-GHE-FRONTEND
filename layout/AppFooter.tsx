/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img 
            // src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} 
            src={`/layout/images/oni_logo.png`}
            alt="Logo" 
            height="40" 
            className="mr-2" 
            />
            Powered by
            {/* <span className="font-medium ml-2">ONI</span> */}
            <span className="font-bold ml-1">ONI</span>
        </div>
    );
};

export default AppFooter;
