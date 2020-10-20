import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orfanato from "../models/Orfanato";
import orfanatoView from '../views/orfanatos_view';
import * as Yup from 'yup';

export default {

    async index(request: Request, response: Response) {
        const orfanatoRepository = getRepository(Orfanato);

        const orfanatos = await orfanatoRepository.find({
            relations: ['images']
        });

        return response.json(orfanatoView.renderMany(orfanatos));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orfanatosRepository = getRepository(Orfanato);

        const orfanato = await orfanatosRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orfanatoView.render(orfanato));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body

        const orfanatoRepository = getRepository(Orfanato);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends == 'true',
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required('Campo nome obrigatorio'),
            latitude: Yup.number().required('Campo latitude obrigatorio'),
            longitude: Yup.number().required('Campo lontitude obrigatorio'),
            about: Yup.string().required().max(400),
            instructions: Yup.string().required('Campo instructions obrigatorio'),
            opening_hours: Yup.string().required('Campo opening_hours obrigatorio'),
            open_on_weekends: Yup.boolean().required('Campo open_on_weekends obrigatorio'),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required('Campo images obrigatorio')
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        const orfanato = orfanatoRepository.create(data);

        await orfanatoRepository.save(orfanato);

        return response.status(201).json(orfanato);
    }
};