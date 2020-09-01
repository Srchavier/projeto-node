import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import uploadConfig from '@config/upload';
import routes from '@shared/infra/http/routes/index';
import errors from '@shared/infra/http/middlewares/errors';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);
app.use(errors);

export default app;
