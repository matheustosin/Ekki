import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Account from '../models/Account';

export default {
    async create(request: Request, response: Response) {
        const { 
            name,
            balance,
        } = request.body;

        const schemaRequest = Yup.object().shape({
            name: Yup.string().required(),
            balance: Yup.number().required(),
            limit: Yup.number().required()
        });

        await schemaRequest.validate(request.body, {
            abortEarly: false
        });

        const accountRepository = getRepository(Account);

        const data = { 
            name,
            balance,
            limit: 500
        };
        const account = accountRepository.create(data);

        await accountRepository.save(account);

        return response.status(201).json(account);
    }
}