import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column({length: 50})
  name: string;

  @Column()
  email: string;

  @ManyToMany(() => User, connections => connections.connections)
  @JoinTable()
  connections: User[]
}