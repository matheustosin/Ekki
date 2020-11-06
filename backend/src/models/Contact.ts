import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';

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

    @ManyToOne(() => User, user => user.contacts)
    @JoinColumn({ name: 'user_id' })
    user: User;
}