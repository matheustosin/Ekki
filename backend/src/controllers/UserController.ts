import { Request, Response } from 'express';

import UserService from '../services/UserService';

export default {
    async create(request: Request, response: Response) {
        const { 
            name,
            cpf,
            phone,
            accountNumber
        } = request.body;

        const data = {
            name,
            cpf,
            phone,
            accountNumber
        }

        const user = await UserService.create(data);
        
        return response.status(201).json(user);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const user = await UserService.show(Number(id));

        return response.json(user);
    },

    async index(request: Request, response: Response) {
        
        const users = await UserService.index();

        return response.json(users);
    },

    async getExtract(request: Request, response: Response) {
        const extract = await UserService.getExtract();
        
        return response.json(extract);
    }

}