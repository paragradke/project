import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity('users')
export class User {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({length: 50})
   name: string;

   @Column()
   email: string;

   @ManyToMany(() => User)
   @JoinTable()
   connections: User[]
}