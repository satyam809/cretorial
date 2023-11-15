import React from 'react';
import ReactDOM from 'react-dom';

import './i18n';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = `${process.env.REACT_APP_CLIENT_ID}`;
// console.log(clientId);

ReactDOM.render(
    <Provider store={configureStore({})}>
        <GoogleOAuthProvider clientId={clientId}>
            <App />
        </GoogleOAuthProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
