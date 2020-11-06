import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import User from '../models/User';
import Contact from '../models/Contact';
import TransferHistory from '../models/TransferHistory';
import UserService from './UserService';
import ContactService from './ContactService';

interface TransferHistoryRequest {
    value: number,
    user: User,
    contact: Contact
}

export default {
    async create(transferHistoryRequest: TransferHistoryRequest) {
        const schemaRequest = Yup.object().shape({
            value: Yup.number().required(),
            user: Yup.object().required(),
            contact: Yup.object().required()
        });

        await schemaRequest.validate(transferHistoryRequest, {
            abortEarly: false
        });

        const {
            value,
            user,
            contact
        } = transferHistoryRequest;

        const dt_transfer = new Date();

        const data = {
            dt_transfer,
            value,
            user,
            contact
        };

        const transferHistoryRepository = getRepository(TransferHistory);

        const transferHistory = transferHistoryRepository.create(data);

        await transferHistoryRepository.save(transferHistory);
    
        return transferHistory;
    },

    async getExtractByIdUser(idUser: number) {
        const schemaRequest =  Yup.number().required();

        await schemaRequest.validate(idUser, {
            abortEarly: false
        });

        const transferHistoryRepository = getRepository(TransferHistory);
        
        const query = `select * from transfer_history th join contacts c on th.contact_id = c.id join accounts a on c.account_id = a.id where th.user_id = ${idUser}`;
        
        const extract = await transferHistoryRepository.query(query);
        
        return extract;
    }

}