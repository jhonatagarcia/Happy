import {Router} from 'express'
import multer from 'multer';

import uploadConfig from './config/upload'
import OrfanatosController from './controllers/OrfanatosController';


const routes = Router();
const upload = multer(uploadConfig);

routes.post('/orfanatos', upload.array('images'),OrfanatosController.create);
routes.get('/orfanatos', OrfanatosController.index)
routes.get('/orfanatos/:id', OrfanatosController.show);

export default routes;