import React, { useEffect } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Redirect, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import FeatherIcons from 'feather-icons-react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

// actions
import { resetAuth, loginUser } from '../../redux/actions';

// store
import { RootState, AppDispatch } from '../../redux/store';

// components
import { VerticalForm, FormInput } from '../../components/';

import AuthLayout from './AuthLayout';
import * as apiService from '../../services';

// images
import logoDark from '../../assets/images/logo-dark.png';
import logoLight from '../../assets/images/logo-light.png';

interface LocationState {
    from?: Location;
}

interface UserData {
    email: string;
    password: string;
}

/* bottom links */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col xs={12} className="text-center">
                {/* <p className="text-muted">
                    {t("Don't have an account?")}{' '}
                    <Link to={'/auth/register'} className="text-primary fw-bold ms-1">
                        {t('Sign Up')}
                    </Link>
                </p> */}
            </Col>
        </Row>
    );
};

const Login = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const clientId = `${process.env.REACT_APP_CLIENT_ID}`;

    const { user, userLoggedIn, loading, error } = useSelector((state: RootState) => ({
        user: state.Auth.user,
        loading: state.Auth.loading,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));
    console.log(userLoggedIn);

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    useEffect(() => {
        // const initClient = () => {
        //     gapi.client.init({
        //         clientId: clientId,
        //         scope: ''
        //     });
        // };
        // gapi.load('client:auth2', initClient);
    });

    const onSuccess = async (res: any) => {
        console.log('success:', res);
        const profileObj = res.profileObj;
        const tokenId = res.tokenId
        const formData = {
            id: profileObj.googleId,
            email: profileObj.email,
            username: profileObj.name,
            firstName: profileObj.givenName,
            lastName: profileObj.familyName,
            imageUrl: profileObj.imageUrl,
            role: 'Admin',
            token: tokenId,
        };

        const postData = {
            userid: profileObj.googleId,
            user: profileObj.email,
            user_name: profileObj.name,
            loginfrom: 'google'
        }
        const data = await apiService.caiuserlogin({ postData });
        if (data) {
            localStorage.setItem('usersession', data.usersession);
        }
        dispatch(loginUser(formData));
    };
    const onFailure = (err: any) => {
        console.log('failed:', err);
    };

    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('Please enter Email')),
            password: yup.string().required(t('Please enter Password')),
            checkbox: yup.bool().oneOf([true]),
        })
    );

    /*
    handle form submission
    */
    const onSubmit = async (e: any) => {
        const formData = {
            id: 9123,
            email: 'user@cretorial.ai',
            username: 'test',
            firstName: 'Test',
            lastName: 'User',
            imageUrl: 'https://lh3.googleusercontent.com/a/AEdFTp6FmZrOBMBweLu3-MIOaUm_dAPY8lZl-MDKq2tw=s96-c',
            role: 'Admin',
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI',
        };

        const postData = {
            userid: 1,
            user: 'user@cretorial.ai',
            user_name: 'Test',
            loginfrom: 'google'
        }
        const data = await apiService.caiuserlogin({ postData });
        if (data) {
            localStorage.setItem('usersession', data.usersession);
        }

        dispatch(loginUser(formData));
        // dispatch(loginUser(formData['email'], formData['password']));
    };

    const location = useLocation<LocationState>();
    const redirectUrl = location.state && location.state.from ? location.state.from.pathname : '/';

    return (
        <>
            {userLoggedIn || user ? <Redirect to={redirectUrl}></Redirect> : null}

            <AuthLayout bottomLinks={<BottomLink />}>
                <div className="auth-logo mx-auto">
                    <Link to="/auth/login" className="logo logo-dark text-center">
                        <span className="logo-lg">
                            <img src={logoDark} alt="" height="100" />
                        </span>
                    </Link>

                    <Link to="/auth/login" className="logo logo-light text-center">
                        <span className="logo-lg">
                            <img src={logoLight} alt="" height="100" />
                        </span>
                    </Link>
                </div>

                {/* <h6 className="h5 mb-3 mt-3 text-center">{t('Welcome back!')}</h6> */}
                {/* <p className="text-muted mt-1 mb-4">
                    {t('Enter your email address and password to access this panel.')}
                </p> */}

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}
                {process.env.REACT_APP_ENV == 'local' &&
                    <VerticalForm
                        onSubmit={onSubmit}
                        resolver={schemaResolver}
                        defaultValues={{ email: 'user@cretorial.ai', password: 'test' }}
                        formClass="authentication-form">
                        <FormInput
                            type="email"
                            name="email"
                            label={t('Email Address')}
                            startIcon={<FeatherIcons icon={'mail'} className="icon-dual" />}
                            placeholder={t('hello@coderthemes.com')}
                            containerClass={'mb-3'}
                        />
                        <FormInput
                            type="password"
                            name="password"
                            label={t('Password')}
                            startIcon={<FeatherIcons icon={'lock'} className="icon-dual" />}
                            action={
                                <Link to="/auth/forget-password" className="float-end text-muted text-unline-dashed ms-1">
                                    {t('Forgot your password?')}
                                </Link>
                            }
                            placeholder={t('Enter your Password')}
                            containerClass={'mb-3'}></FormInput>

                        <FormInput
                            type="checkbox"
                            name="checkbox"
                            label={t('Remember me')}
                            containerClass={'mb-3'}
                            defaultChecked
                        />

                        <div className="mb-3 text-center d-grid">
                            <Button type="submit" disabled={loading}>
                                {t('Log In')}
                            </Button>
                        </div>
                    </VerticalForm>
                }
                {/* <div className="py-3 text-center">
                    <span className="fs-16 fw-bold">{t('OR')}</span>
                </div> */}
                <Row>
                    <Col xs={12} className="text-center mb-3 mt-3 ">
                        {/* <Link to="#" className="btn btn-white mb-2 mb-sm-0 me-1">
                            <i className="uil uil-google icon-google me-2"></i>
                            {t('With Google -Test')}
                        </Link> */}
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Sign in with Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={false}
                        />
                        {/* <Link to="#" className="btn btn-white mb-2 mb-sm-0">
                            <i className="uil uil-facebook me-2 icon-fb"></i>
                            {t('With Facebook')}
                        </Link> */}
                    </Col>
                </Row>
            </AuthLayout>
        </>
    );
};

export default Login;
