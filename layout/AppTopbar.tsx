/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import User from '@/Components/LoggedInUserProfilePreview/User';
// import '../styles/components/User.scss'
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
        


const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    const [showProfileSetting, setShowProfileSetting] = useState<boolean>(false)

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    // const router = useRouter();


    return (
        <div className="layout-topbar">
            <Link 
            href="/" 
            className="layout-topbar-logo flex align-center"
            >
                {/* <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" /> */}
                <img 
                    src={`/layout/images/logo_itim.png`}
                    // width="47.22px" 
                    width="80px" 
                    // height={'35px'} 
                    height={'50px'} 
                    alt="logo" 
                />
                {/* <span>SAKAI</span> */}
                <span
                style={{fontWeight: "bold", color: "#0003B4", marginBottom: "5px"}}
                >SIREF {/* Systeme de Gestion des Honoraires et Ecolages */ }</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div 
            ref={topbarmenuRef} 
            className={classNames('layout-topbar-menu flex items-center justify-between', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                
                {/* <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button> */}
                <User  
                    showProfileSetting={showProfileSetting}
                    setShowProfileSetting={setShowProfileSetting}
                />
                {showProfileSetting && <div className="profile-setting">
                    <div className="setting-container">
                        <ul>
                            <li>
                                <span>
                                    <i className="pi pi-user"></i>
                                </span>
                                
                                <a href="#">Profile</a>
                            </li>
                            <li>
                                <span>
                                    <i className="pi pi-cog"></i>
                                </span>
                                <a href="#">Reglage</a>
                            </li>
                        </ul>
                        
                        <div className="logout-btn">
                            <Link 
                            href={"/auth/login"}
                            onClick={() => {
                                // console.log('Deconnexion')
                            }}
                            >
                                <Button
                                label="Deconnexion"
                                severity="danger"
                                />
                            </Link>
                        </div>

                    </div>
                </div>}
                
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
