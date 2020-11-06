import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import User from '../models/User';
import Contact from '../models/Contact';
import TransferHistory from '../models/TransferHistory';

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

    

}