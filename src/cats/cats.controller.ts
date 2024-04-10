import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import {Request} from "express"
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}


  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: Request, @Body() createCatDto: CreateCatDto){

    const user = req.user as { role: string };
   
    if(user.role !== "ADMIN"){
      throw new HttpException("Not authorized", 404);
    }


    
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(){
    return this.catsService.findAll();
  }

  @Post('favorite/:id')
  @UseGuards(JwtAuthGuard)
  favorite(@Req() req: Request, @Param('id', new ParseIntPipe()) id: number){

   
    const userId= req.user as {id: number};
    return this.catsService.favorite(userId.id, id);
  }


  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
      return this.catsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Req() req: Request, @Param('id', new ParseIntPipe()) id: number, @Body() updateCatDto: UpdateCatDto){

    const user = req.user as { role: string };
  
    if(user.role !== "ADMIN"){
      throw new HttpException("Not authorized", 404);
    }
    return this.catsService.update(id, updateCatDto);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req: Request, @Param('id', new ParseIntPipe()) id: number){

    const user = req.user as { role: string };
 
    if(user.role !== "ADMIN"){
      throw new HttpException("Not authorized", 404);
    }
    return this.catsService.remove(id);
  }
}
