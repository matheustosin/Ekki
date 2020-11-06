import { Request, Response } from 'express';

import ContactService from '../services/ContactService';

export default {
    async create(request: Request, response: Response) {
        const { 
            name,
            accountNumber,
        } = request.body;

        const data = {
            name,
            accountNumber,
        };

        const contact = await ContactService.create(data);
        return response.status(201).json(contact);
    },

    async index(request: Request, response: Response) {
        
        const contacts = await ContactService.index();

        return response.json(contacts);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const contacts = await ContactService.delete(Number(id));

        return response.json(contacts);
    },

    async findByAccountNumber(request: Request, response: Response) {
        const { 
            accountNumber
        } = request.body;

        const contact = await ContactService.findByAccountNumber(accountNumber);

        return response.json(contact);
    }
}