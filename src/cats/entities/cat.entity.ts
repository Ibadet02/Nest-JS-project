import { Exclude } from "class-transformer";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'cats'})
export class Cat{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    age: number

    @Column()
    breed:string;

    @Exclude()
    @ManyToMany(()=> User, (user)=> user.favoritecats)
    users: User[];
}