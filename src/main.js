import React from 'react';
import Dva from 'dva';

import App from './App.js';
import bigtableModal from './models/bigtableModal.js';

const app = Dva();

//模型列表
app.model(bigtableModal);

app.router(()=>{
    return <App />;
});

app.start('#app');
