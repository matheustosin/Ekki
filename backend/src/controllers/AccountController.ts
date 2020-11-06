import { Request, Response } from 'express';

import AccountService from '../services/AccountService';

export default {
    async create(request: Request, response: Response) {
        const {
            accountNumber,
            balance,
        } = request.body;

        const data = {
            accountNumber,
            balance
        }

        const account = AccountService.create(data);

        return response.status(201).json(account);
    },
    
    async index(request: Request, response: Response) {
        
        const accounts = await AccountService.index();

        return response.json(accounts);
    },

    async transfer(request: Request, response: Response) {
        const {
            accountNumber,
            value
        } = request.body;

        const data = {
            accountNumber,
            value
        }

        const usedLimit = await AccountService.transfer(data);

        return response.json({ usedLimit: usedLimit });
    },

}