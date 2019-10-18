import React from 'react';
import Dva from 'dva';
import App from './App.js';
import escModel from './models/escModel.js';

const app = Dva();

app.model(escModel);

app.router(()=>{
    return <App />;
});

app.start('#app');
