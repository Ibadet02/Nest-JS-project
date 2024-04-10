import { HttpException, Injectable, NotFoundException, Response } from '@nestjs/common';
import { AuthPayLoadDto } from './dto/auth.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
   
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private jwtService: JwtService,
        private readonly usersService: UsersService)
        
        {}

    async validateUser({email, password}: AuthPayLoadDto){
        const findUser= await this.usersRepository.findOne({
            where: {email }
        })

        if(!findUser){
            throw new NotFoundException("Invalid Credentials")
        }

        const isMatch= await bcrypt.compare(password, findUser.password);
        if(isMatch){
            const {password, ...user}= findUser;
            return this.jwtService.sign(user);
        }
        else{
            throw new HttpException("Invalid Credentials", 404);
        }

    }

    async registerUser(createuserDto: CreateUserDto){
        const user=await this.usersService.create(createuserDto);
        return user;
    }
}
