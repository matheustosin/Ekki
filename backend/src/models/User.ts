import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import Account from './Account';

@Entity("users")
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    cpf: string;

    
    @Column()
    phone: string;

    @OneToOne(type => Account )
    @JoinColumn({ name: 'account_id' })
    account: Account;
}