import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import User from '../models/User';
import AccountController from '../controllers/AccountController';

export default {
    async create(request: Request, response: Response) {
        const { 
            name,
            cpf,
            phone
        } = request.body;

        const schemaRequest = Yup.object().shape({
            name: Yup.string().required(),
            cpf: Yup.string().required(),
            phone: Yup.string().required()
        });

        await schemaRequest.validate(request.body, {
            abortEarly: false
        });

        const userRepository = getRepository(User);

        // const account = AccountController.create()

        const data = { 
            name,
            cpf,
            phone
        };
        const user = userRepository.create(data);

        await userRepository.save(user);

        return response.status(201).json(user);
    }

   
}