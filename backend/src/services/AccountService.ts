import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Account from '../models/Account';

import UserService from '../services/UserService';
import ContactService from './ContactService';
import TransferHistoryService from './TransferHistoryService';

interface AccountRequest {
    accountNumber: number,
    balance: number
}

interface TransferRequest {
    accountNumber: number,
    value: number
}

export default {
    async create(accountRequest: AccountRequest) {
        const schemaRequest = Yup.object().shape({
            accountNumber: Yup.number().required(),
            balance: Yup.number().required()
        });

        await schemaRequest.validate(accountRequest, {
            abortEarly: false
        });

        const {
            accountNumber,
            balance
        } = accountRequest;


        const data = {
            nr_account: accountNumber,
            balance,
            limit_value: 500
        };

        const accountRepository = getRepository(Account);

        const account = accountRepository.create(data);

        await accountRepository.save(account);

        return account;
    },

    async index() {
        const accountRepository = getRepository(Account);
    
        const accounts = await accountRepository.find();

        return accounts;
    },

    async update(account: Account) {
        const { id } = account;

        const accountRepository = getRepository(Account);

        accountRepository.update(id, account);
    },

    async transfer(transferRequest: TransferRequest) {
        const schemaRequest = Yup.object().shape({
            accountNumber: Yup.number().required(),
            value: Yup.number().required()
        });

        await schemaRequest.validate(transferRequest, {
            abortEarly: false
        });

        const {
            accountNumber,
            value
        } = transferRequest;

        let usedLimit = false;

        // LOGGED USER
        const user = await UserService.show(1);
        const contact = await ContactService.findByAccountNumber(accountNumber);

        const verifyBalance = user.account.balance - value;    

        if (verifyBalance < 0) {
            const limitValue = user.account.limit_value - (value - user.account.balance);
            if (limitValue < 0) {
                // TODO: GERA EXCEPTION
                return;
            } else {
                user.account.balance = 0;
                user.account.limit_value = limitValue;
                usedLimit = true;
            }
        } else {
            user.account.balance -= value;
        }

        contact.account.balance += value;

        this.update(user.account);

        this.update(contact.account);

        const history = {
            value,
            user,
            contact
        }

        await TransferHistoryService.create(history);

        return usedLimit;
    }
}