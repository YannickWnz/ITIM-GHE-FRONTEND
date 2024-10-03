/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState, useRef, MutableRefObject } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';


// import Toast message component
import { Toast } from 'primereact/toast';


const LoginPage = () => {
    const toast = useRef<Toast>(null);
    const router = useRouter();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);

    const [loginInfos, setLoginInfos] = useState({
        email: "",
        password: ""
    })

    const showError = (errorMsg: string) => {
        // toast.current && toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
        toast.current && toast.current.show({severity:'error', summary: 'Error', detail:`${errorMsg}`, life: 3000});
    }

    const handleFormInputChange = ( e: React.ChangeEvent<HTMLInputElement>) => {

        setLoginInfos({
            ...loginInfos,
            [e.target.name]: e.target.value 
        })

        // console.log(loginInfos);
        

    }

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <div className={containerClassName}>
            <Toast ref={toast} />
                            {/* <Button label="Error" severity="danger" onClick={showError} /> */}

            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        {/* <div className="text-center mb-5">
                            <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div> */}

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText 
                            id="email1" 
                            type="text" 
                            placeholder="Email address" 
                            className="w-full md:w-30rem mb-5" 
                            style={{ padding: '1rem' }} 
                            name="email"
                            onChange={(e) => {
                                handleFormInputChange(e)
                                setEmail(e.target.value)
                            }}
                            />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Mot de passe
                            </label>
                            <Password 
                            feedback={false} 
                            inputId="password1" 
                            value={password} 
                            name="password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                                handleFormInputChange(e)
                                setPassword(e.target.value)
                            }} 
                            placeholder="Password" 
                            toggleMask 
                            className="w-full mb-5" 
                            inputClassName="w-full p-3 md:w-30rem"
                            ></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Se souvenir de moi</label>
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    {/* Forgot password? */}
                                    Mot de passe oublié?
                                </a>
                            </div>
                            <Button 
                                label="Connexion" 
                                className="w-full p-3 text-xl" 
                                onClick={
                                    () => {
                                        // router.push('/')
                                        if(!loginInfos.email.trim()) {
                                            showError('Veuillez saisir votre email!')
                                        } else if(!loginInfos.password.trim()) {
                                            showError('Veuillez saisir votre mot de passe!')
                                        }
                                    }
                                }
                            ></Button>

                        </div>
                        {/* <div 
                        className="w-full text-center mt-3 text-red">
                            <p className='text-red-600 font-bold '>Email ou mot de passe incorrect</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
