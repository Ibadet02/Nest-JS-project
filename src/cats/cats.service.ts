import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { User } from 'src/users/entities/user.entity';



@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ){}
 

  async create(createCatDto: CreateCatDto) {
    const {name, breed, age}= createCatDto;
    if(!name || !breed || !age){
      throw new HttpException("All Fields are required", 401);
    }
    const cat= await this.catsRepository.save(createCatDto);
    if(!cat){
      throw new HttpException("Internal Server Error", 500);
    }
    return cat;
  }

  async findAll(){
    const cats= await this.catsRepository.find();
    return cats;
  }

  async findOne(id: number){
    if(!id){
      throw new HttpException("Invalid Parameters!", 404);
    }

    const cat= await this.catsRepository.findOne({
      where: {id}
    })

    if(!cat){
      throw new NotFoundException("No Cat found with the given ID");
    }

    return cat;
  }

  async update(id:number, updateCatDto:UpdateCatDto){
    const cat= await this.findOne(id);
    if(!cat){
      throw new NotFoundException();
    }

    Object.assign(cat, updateCatDto);

    return await this.catsRepository.save(cat);
  }
 

  async remove(id: number){
    const cat= await this.findOne(id);
    if(!cat){
      throw new NotFoundException();
    }

    await this.catsRepository.remove(cat);
    return "Deleted Successfully"
  }

  async favorite(userId:number, catId:number){
 
    const user= await this.usersRepository.findOne({where:{id:userId}});
 
    if(!user){
      throw new NotFoundException();
    }

    const cat= await this.findOne(catId);
   
    if(!cat){
      throw new NotFoundException();
    }
    if(!user.favoritecats){
      user.favoritecats=[];
    }

    await user.favoritecats.push(cat);

   
    return await this.usersRepository.save(user);
  }
}
