import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const {name, email, role}= createUserDto;
    let passwordInput= createUserDto.password
    if(!name || !email || !passwordInput){
      throw new HttpException('All Fields are required', 404);
      
    }
    const userExists= await this.usersRepository.findOne({where:{email}})
    if(userExists){
      throw new HttpException("Email already exists", 401);
    }

    const hashedpassword= await bcrypt.hash(passwordInput, 10);

    const {password, ...user}= await this.usersRepository.save({name, email, password: hashedpassword, role});
    if(!user) return null;
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
