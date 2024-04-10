import { Body, Controller, NotFoundException, Post, UseGuards, Get, Req, Response } from '@nestjs/common';
import { AuthPayLoadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guards';
import { JwtAuthGuard } from './guards/jwt.guards';
import {Request} from "express"
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {Response as Res} from "express";

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    
    @Post('login')
    @UseGuards(LocalGuard)
    login(@Response({passthrough: true}) res:Res ,@Req() req: Request){
        res.set({ 'Authorization': `Bearer ${req.user}` })
        return req.user;
    }

    @Post('register')
    register(@Body() createuserDto: CreateUserDto){
        return this.authService.registerUser(createuserDto);
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request){
        return req.user;
    }
}
