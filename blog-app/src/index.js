import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// we can set some default configuration to use on the axios
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-type'] = 'application/json';

// Set data globally to all the axios request calls to the server
// we can add additional data to it
// IMPORTANT NOTE: This is useful specially to send an authorization token to the server
axios.interceptors.request.use(request => {
    console.log('[Request] success', request);
    return request;
}, error => { // This error works for example when we lost connection with the server
    console.log('[Request] error', error);
    return Promise.reject(error);
});

// We can deal with the responses globally also
axios.interceptors.response.use(response => {
    console.log('[Response] success', response);
    return response;
}, error => {
    console.log('[Response] error', error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
