import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';

import User from './User';
import Contact from './Contact';

@Entity("transfer_history")
export default class TransferHistory {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    dt_transfer: Date;

    @Column()
    value: number;
   
    @OneToOne(type => User )
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToOne(type => Contact )
    @JoinColumn({ name: 'contact_id' })
    contact: Contact;

}