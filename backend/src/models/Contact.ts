import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import Account from './Account';
import User from './User';

@Entity("contacts")
export default class Contact {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @OneToOne(() => Account )
    @JoinColumn({ name: 'account_id' })
    account: Account;

    @OneToOne(() => User )
    @JoinColumn({ name: 'user_id' })
    user: User;
}