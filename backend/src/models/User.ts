import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';

import Account from './Account';
import Contact from './Contact';

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

    @OneToMany(() => Contact, contact => contact.user, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'user_id' })
    contacts: Contact[];
}