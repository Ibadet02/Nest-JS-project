import { Exclude } from "class-transformer";
import { Cat } from "src/cats/entities/cat.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users' })
export class User{
    @PrimaryGeneratedColumn()
    id: number;;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    @Exclude()
    password:string;

    @Column({default: 'USER'})
    role: string

    @Exclude()
    @ManyToMany(()=> Cat, (cat) => cat.users)
    @JoinTable()
    favoritecats: Cat[]

}