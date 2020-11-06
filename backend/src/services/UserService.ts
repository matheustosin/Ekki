import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import User from '../models/User';
import AccountService from '../services/AccountService';
import TransferHistoryService from './TransferHistoryService';

interface UserRequest {
    name: string,
    cpf: string,
    phone: string,
    accountNumber: number
}

export default {
    async create(userRequest: UserRequest) {
        const schemaRequest = Yup.object().shape({
            name: Yup.string().required(),
            cpf: Yup.string().required(),
            phone: Yup.string().required(),
            accountNumber: Yup.number().required()
        });

        await schemaRequest.validate(userRequest, {
            abortEarly: false
        });

        const { 
            name,
            cpf,
            phone,
            accountNumber
        } = userRequest;

        const accountRequest = {
            accountNumber: accountNumber,
            balance: 1000
        }
        const account = await AccountService.create(accountRequest);

        const data = { 
            name,
            cpf,
            phone,
            account
        };

        const userRepository = getRepository(User);

        const user = userRepository.create(data);

        await userRepository.save(user);

        return user;
    },

    async show(id: number) {
        const userRepository = getRepository(User);
    
        const user = await userRepository.findOneOrFail(id, {
            relations: ['account']
        });
    
        return user;
    },

    async index() {
        const userRepository = getRepository(User);
    
        const users = await userRepository.find({
            relations: ['accounts', 'contacts']
        });

        return users;
    },

    async update(user: User) {
        const { id } = user;

        const userRepository = getRepository(User);

        userRepository.update(id, user);
    },

    async getExtract() {
        const idUser = 1;

        const extract = await TransferHistoryService.getExtractByIdUser(idUser);
        
        return extract;
    },
    
}