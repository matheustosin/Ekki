import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity("accounts")
export default class Account {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nr_account: number;

    @Column()
    balance: number;

    @Column()
    limit_value: number;
}