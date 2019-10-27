import React from 'react';
import Dva from 'dva';

import bigtableModal from './models/bigtableModal.js';
import detailModel from './models/detailModel.js';
import salecarModal from './models/salecarModal.js';
import szssModal from './models/szssModal';
import route from './route.js';

const app = Dva();

//模型列表
app.model(bigtableModal);
app.model(detailModel);
app.model(salecarModal);
app.model(szssModal);

app.router(route);

app.start('#app');
