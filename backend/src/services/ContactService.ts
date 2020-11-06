import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import AccountService from '../services/AccountService';
import UserService from '../services/UserService';
import Contact from '../models/Contact';

interface ContactRequest {
    name: string,
    accountNumber: number,
}

export default {
    async create(contactRequest: ContactRequest) {
        const schemaRequest = Yup.object().shape({
            name: Yup.string().required(),
            accountNumber: Yup.number().required(),
        });

        await schemaRequest.validate(contactRequest, {
            abortEarly: false
        });

        const {
            name,
            accountNumber,
        } = contactRequest;
        
        const accountRequest = {
            accountNumber: accountNumber,
            balance: 500
        }
        const account = await AccountService.create(accountRequest);

        const user = await UserService.show(1);

        const data = { 
            name,
            account,
            user
        };

        const contactRepository = getRepository(Contact);

        const contact = contactRepository.create(data);

        await contactRepository.save(contact);

        return contact;
    },

    async index() {
        const contactRepository = getRepository(Contact);
    
        const contacts = await contactRepository.find({
            relations: ['user', 'account']
        });

        return contacts;
    },

    async update(contact: Contact) {
        const { id } = contact;

        const contactRepository = getRepository(Contact);

        contactRepository.update(id, contact);
    },

    async delete(id: number) {
        const contactRepository = getRepository(Contact);

        contactRepository.delete(id);
    },
    
    async findByAccountNumber(accountNumber: number) {
        const contactRepository = getRepository(Contact);
    
        const account = await AccountService.findAccountByAccountNumber(accountNumber);
        const contact = await contactRepository.findOneOrFail({
            where: {
                account: account
            },
            relations: ['account']
        });
    
        return contact;
    },

    async findById(id: number) {
        const contactRepository = getRepository(Contact);
    
        const contact = await contactRepository.findOneOrFail({
            where: {
                id: id
            },
            relations: ['account']
        });
    
        return contact;
    },
    
}