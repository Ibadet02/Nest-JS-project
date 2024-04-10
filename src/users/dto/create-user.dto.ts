import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email:string;

    @IsString()
    password: string;

    
    @IsEnum(["USER", "ADMIN"])
    @IsOptional() 
    role?: string = 'USER';
   
}
